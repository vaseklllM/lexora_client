"use client";

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
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";
import { withDndKitProvider } from "../hoc/withDndKitProvider";
import { useSectionStore } from "../model/store";
import { DeckDraggableOverlay } from "./DeckDraggableOverlay";
import { DropdownMenu } from "./DropdownMenu";
import { ParentFolder } from "./ParentFolder";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative p-5 pr-5 pb-18 pl-5 shadow-md sm:rounded-xl",
    header: "flex items-center gap-6",
    buttonBack: "",
    breadcrumbs: "",
    title: "text-base-content/70 text-xl font-bold",
    emptyText: "text-base-content/50 text-md mt-16 mb-20 text-center",
    dropdownMenu: "absolute right-3 bottom-3 z-10",
    folders:
      "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
    decks:
      "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
  },
});

export interface SectionProps {
  className?: string;
  folders?: IFolder[];
  parentFolder?: IFolder;
  decks?: IDeck[];
  allLanguages: Language[];
  folder?: IFolder;
  breadcrumbs?: IFolderBreadcrumb[];
  languagesWhatIKnow: Language[];
  languagesWhatILearn: Language[];
  title?: string;
}

export const Section = withDndKitProvider(
  (props: SectionProps): ReactElement => {
    const draggingDeckId = useSectionStore((store) => store.draggingDeckId);
    const movedDeckIds = useSectionStore((store) => store.movedDeckIds);
    const isFolders = props.folders && props.folders.length > 0;

    const isFolder = !!props.folder?.id;

    const classes = classesSlots();

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
      if (props.parentFolder?.id) {
        return routes.dashboard.folder.url(props.parentFolder.id);
      }
      return routes.dashboard.url();
    }, [props.parentFolder?.id]);

    const decks = useMemo((): IDeck[] | undefined => {
      return props.decks?.filter((deck) => !movedDeckIds.includes(deck.id));
    }, [props.decks, movedDeckIds]);

    const isDecks = decks && decks.length > 0;
    const isEmpty = !isFolders && !isDecks;

    return (
      <FoldersProvider>
        <DecksProvider>
          <div
            key={props.folder?.id}
            className={classes.base({ className: props.className })}
          >
            {props.title && <h3 className={classes.title()}>{props.title}</h3>}
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
            {(isFolders || isFolder) && (
              <>
                {props.folders && (
                  <div className={classes.folders()}>
                    {isFolder && (
                      <ParentFolder parentFolder={props.parentFolder} />
                    )}
                    {props.folders.map((folder) => (
                      <Folder key={folder.id} folder={folder} />
                    ))}
                  </div>
                )}
              </>
            )}
            {isDecks && (
              <>
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
            {isEmpty && (
              <p className={classes.emptyText()}>
                You don&apos;t have any folders or decks. <br />
                You can create a new folder or deck by clicking the plus button.
              </p>
            )}
          </div>
          <DeckDraggableOverlay
            key={draggingDeckId}
            deck={props.decks?.find((deck) => deck.id === draggingDeckId)}
          />
        </DecksProvider>
      </FoldersProvider>
    );
  },
);
