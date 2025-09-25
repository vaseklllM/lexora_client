import { ICard } from "@/api/schemas/card.schema";
import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { ButtonBack } from "@/features/button-back";
import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    header: "flex items-center gap-6",
    headerButtons: "",
    buttonBack: "",
    breadcrumbs: "",
  },
});

interface Props {
  cards: ICard[];
  foldersBreadcrumbs: IFolderBreadcrumb[];
  deck: IDeck;
}

export function LearningDeck(props: Props) {
  const classes = classesSlots();

  const lastBreadcrumb = useMemo<Breadcrumb[]>(() => {
    return [
      {
        icon: "deck",
        title: `${props.deck.name} ${props.deck.languageWhatILearn.iconSymbol}`,
        url: routes.dashboard.deck.url(props.deck.id),
      },
      {
        title: "Learning deck",
        url: routes.dashboard.learningDeck.url(props.deck.id),
      },
    ];
  }, [props.deck.id, props.deck.name]);

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
