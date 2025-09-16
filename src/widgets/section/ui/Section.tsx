import { IDeck } from "@/api/schemas/deck.schema";
import { IFolder } from "@/api/schemas/folder.schema";
import { Language } from "@/api/schemas/language.schema";
import { Deck, DecksProvider } from "@/features/deck";
import { Folder, FoldersProvider } from "@/features/folder";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { DropdownMenu } from "./DropdownMenu";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    dropdownMenu: "absolute right-3 bottom-3 z-10",
    foldersTitle: "text-base-content/70 text-xl font-bold",
    folders:
      "mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
    decksTitle: "text-base-content/70 mt-6 text-xl font-bold",
    decks:
      "mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
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
  const classes = classesSlots();

  return (
    <FoldersProvider>
      <DecksProvider>
        <div className={classes.base({ className: props.className })}>
          <DropdownMenu
            className={classes.dropdownMenu()}
            allLanguages={props.allLanguages}
            folderId={props.folderId}
          />
          <h3 className={classes.foldersTitle()}>Folders</h3>
          {props.folders && (
            <div className={classes.folders()}>
              {props.folders.map((folder) => (
                <Folder key={folder.id} folder={folder} />
              ))}
            </div>
          )}
          <h3 className={classes.decksTitle()}>Decks</h3>
          {props.decks && (
            <div className={classes.decks()}>
              {props.decks.map((deck) => (
                <Deck key={deck.id} deck={deck} />
              ))}
            </div>
          )}
        </div>
      </DecksProvider>
    </FoldersProvider>
  );
};
