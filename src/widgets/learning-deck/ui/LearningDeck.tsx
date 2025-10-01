import { ICard } from "@/api/schemas/card.schema";
import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { ButtonBack } from "@/features/button-back";
import { tv } from "tailwind-variants";
import { useLastBreadcrumbs } from "./useLastBreadcrumbs";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    header: "flex items-center gap-6",
    headerButtons: "",
    buttonBack: "",
    breadcrumbs: "",
  },
});

export interface LearningDeckProps {
  cards: ICard[];
  foldersBreadcrumbs: IFolderBreadcrumb[];
  deck: IDeck;
}

export function LearningDeck(props: LearningDeckProps) {
  const classes = classesSlots();
  const lastBreadcrumb = useLastBreadcrumbs(props);

  return (
    <div className={classes.base()}>
      <div className={classes.header()}>
        <ButtonBack
          foldersBreadcrumbs={props.foldersBreadcrumbs}
          className={classes.buttonBack()}
        />
        <FolderBreadcrumbs
          className={classes.breadcrumbs()}
          breadcrumbs={props.foldersBreadcrumbs}
          lastItem={lastBreadcrumb}
        />
      </div>
    </div>
  );
}
