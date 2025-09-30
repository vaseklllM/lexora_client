"use client";

import { revalidateGetDeck } from "@/api/deck/get-deck";
import { moveDeck } from "@/api/deck/move-deck";
import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { IFolder } from "@/api/schemas/folder.schema";
import { Language } from "@/api/schemas/language.schema";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { DecksProvider, DraggableDeck } from "@/features/deck";
import { Folder, FoldersProvider } from "@/features/folder";
import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { ButtonBack } from "@/shared/ui/ButtonBack";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { DeckDraggableOverlay } from "./DeckDraggableOverlay";
import { DropdownMenu } from "./DropdownMenu";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    header: "flex items-center gap-6",
    buttonBack: "",
    breadcrumbs: "",
    emptyText: "text-base-content/50 text-md mt-16 mb-20 text-center",
    dropdownMenu: "absolute right-3 bottom-3 z-10",
    foldersTitle: "text-base-content/70 text-xl font-bold",
    folders:
      "mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
    decksTitle: "text-base-content/70 mt-6 text-xl font-bold",
    decks:
      "mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
  },
  variants: {
    isFolder: {
      true: {
        foldersTitle: "mt-6",
      },
    },
  },
});

interface Props {
  className?: string;
  folders?: IFolder[];
  decks?: IDeck[];
  allLanguages: Language[];
  folder?: IFolder;
  breadcrumbs?: IFolderBreadcrumb[];
  languagesWhatIKnow: Language[];
  languagesWhatILearn: Language[];
}

export const Section = (props: Props): ReactElement => {
  const [draggingDeckId, setDraggingDeckId] = useState<string | undefined>();
  const [movedDeckIds, setMovedDeckIds] = useState<string[]>([]);
  const isFolders = props.folders && props.folders.length > 0;

  const isFolder = !!props.folder?.id;

  const classes = classesSlots({
    isFolder,
  });

  const lastBreadcrumb = useMemo((): Breadcrumb | undefined => {
    if (props.folder) {
      return {
        icon: "folder",
        title: props.folder.name,
        url: routes.dashboard.folder.url(props.folder.id),
      };
    }
  }, [props.folder]);

  const backUrl = useMemo<string>((): string => {
    if (props.folder?.parentFolderId) {
      return routes.dashboard.folder.url(props.folder.parentFolderId);
    }
    return routes.dashboard.url();
  }, [props.folder]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      distance: 1,
      tolerance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  const dragEndHandler = useCallback(
    async (args: DragEndEvent) => {
      if (
        typeof args.over?.id === "string" &&
        typeof args.active.id === "string"
      ) {
        const deckId = args.active.id as string;
        const toFolderId = args.over.id as string;

        await moveDeck({
          deckId,
          toFolderId,
        });
        await revalidateGetDeck(deckId);
        setMovedDeckIds((prev): string[] => [...prev, deckId]);
      }
      setDraggingDeckId(undefined);
    },
    [setDraggingDeckId],
  );

  const dragStartHandler = useCallback(
    (event: DragStartEvent) => {
      if (typeof event.active.id === "string") {
        setDraggingDeckId(event.active.id);
      }
    },
    [setDraggingDeckId],
  );

  const dragCancelHandler = useCallback(() => {
    setDraggingDeckId(undefined);
  }, [setDraggingDeckId]);

  const decks = useMemo((): IDeck[] | undefined => {
    return props.decks?.filter((deck) => !movedDeckIds.includes(deck.id));
  }, [props.decks, movedDeckIds]);

  const isDecks = decks && decks.length > 0;
  const isEmpty = !isFolders && !isDecks;

  return (
    <FoldersProvider>
      <DecksProvider>
        <DndContext
          sensors={sensors}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
          onDragCancel={dragCancelHandler}
        >
          <div className={classes.base({ className: props.className })}>
            {isFolder && (
              <div className={classes.header()}>
                <ButtonBack href={backUrl} className={classes.buttonBack()} />
                <FolderBreadcrumbs
                  className={classes.breadcrumbs()}
                  breadcrumbs={props.breadcrumbs}
                  lastItem={lastBreadcrumb}
                />
              </div>
            )}
            <DropdownMenu
              className={classes.dropdownMenu()}
              allLanguages={props.allLanguages}
              folderId={props.folder?.id}
              languagesWhatIKnow={props.languagesWhatIKnow}
              languagesWhatILearn={props.languagesWhatILearn}
            />
            {isEmpty && (
              <p className={classes.emptyText()}>
                You don&apos;t have any folders or decks. <br />
                You can create a new folder or deck by clicking the plus button.
              </p>
            )}
            {isFolders && (
              <>
                <h3 className={classes.foldersTitle()}>Folders</h3>
                {props.folders && (
                  <div className={classes.folders()}>
                    {props.folders.map((folder) => (
                      <Folder
                        key={folder.id}
                        folder={folder}
                        isDragging={!!draggingDeckId}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            {isDecks && (
              <>
                <h3 className={classes.decksTitle()}>Decks</h3>
                <div className={classes.decks()}>
                  {decks.map((deck) =>
                    draggingDeckId !== deck.id ? (
                      <DraggableDeck key={deck.id} deck={deck} />
                    ) : (
                      <div key={deck.id} className="h-27" />
                    ),
                  )}
                </div>
              </>
            )}
          </div>

          <DeckDraggableOverlay
            deck={props.decks?.find((deck) => deck.id === draggingDeckId)}
          />
        </DndContext>
      </DecksProvider>
    </FoldersProvider>
  );
};
