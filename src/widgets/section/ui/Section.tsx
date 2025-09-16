import { IDeck } from "@/api/schemas/deck.schema";
import { IFolder } from "@/api/schemas/folder.schema";
import { Language } from "@/api/schemas/language.schema";
import { Deck, DecksProvider } from "@/features/deck";
import { Folder, FoldersProvider } from "@/features/folder";
import { Breadcrumb, Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { ButtonBack } from "@/shared/ui/ButtonBack";
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";
import { DropdownMenu } from "./DropdownMenu";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    header: "flex items-center gap-6",
    headerButtons: "",
    buttonBack: "",
    breadcrumbs: "",
    emptyText: "text-base-content/50 text-md mt-15 mb-20 text-center",
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
        base: "",
      },
    },
  },
});

interface Props {
  className?: string;
  folders?: IFolder[];
  decks?: IDeck[];
  allLanguages: Language[];
  folderId?: string;
}

export const Section = (props: Props): ReactElement => {
  const isFolders = props.folders && props.folders.length > 0;
  const isDecks = props.decks && props.decks.length > 0;

  const isFolder = !!props.folderId;

  const isEmpty = !isFolders && !isDecks;

  const classes = classesSlots({
    isFolder,
  });

  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    return [
      {
        icon: "folder",
        title: "Home",
        url: "/",
      },
      {
        icon: "folder",
        title: "Documents",
        url: "/documents",
      },
      {
        icon: "folder",
        title: "Add Document",
        url: "/add-document",
      },
    ];
  }, []);

  return (
    <FoldersProvider>
      <DecksProvider>
        <div className={classes.base({ className: props.className })}>
          {isFolder && (
            <div className={classes.header()}>
              <div className={classes.headerButtons()}>
                <ButtonBack className={classes.buttonBack()} />
              </div>
              <Breadcrumbs
                className={classes.breadcrumbs()}
                breadcrumbs={breadcrumbs}
              />
            </div>
          )}
          <DropdownMenu
            className={classes.dropdownMenu()}
            allLanguages={props.allLanguages}
            folderId={props.folderId}
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
                    <Folder key={folder.id} folder={folder} />
                  ))}
                </div>
              )}
            </>
          )}
          {isDecks && (
            <>
              <h3 className={classes.decksTitle()}>Decks</h3>
              {props.decks && (
                <div className={classes.decks()}>
                  {props.decks.map((deck) => (
                    <Deck key={deck.id} deck={deck} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </DecksProvider>
    </FoldersProvider>
  );
};
