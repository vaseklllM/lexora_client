import { ICard } from "@/api/schemas/card.schema";
import { IDeck } from "@/api/schemas/deck.schema";
import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { EditableText } from "@/entities/editable-text";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { routes } from "@/shared/routes";
import { Breadcrumb } from "@/shared/ui/Breadcrumbs";
import { ButtonBack } from "@/shared/ui/ButtonBack";
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    header: "flex items-center gap-6",
    headerButtons: "",
    buttonBack: "",
    breadcrumbs: "",
    name: "mt-4",
  },
});

interface Props {
  className?: string;
  foldersBreadcrumbs: IFolderBreadcrumb[];
  deck: IDeck;
  cards: ICard[];
}

export const DeckSection = (props: Props): ReactElement => {
  const classes = classesSlots();

  const parentFolder = useMemo<IFolderBreadcrumb | undefined>(() => {
    return props.foldersBreadcrumbs[props.foldersBreadcrumbs.length - 1];
  }, [props.foldersBreadcrumbs]);

  const backUrl = useMemo<string>((): string => {
    if (parentFolder?.id) {
      return routes.dashboard.folder.url(parentFolder.id);
    }
    return routes.dashboard.url();
  }, [parentFolder?.id]);

  const lastBreadcrumb = useMemo<Breadcrumb>(() => {
    return {
      icon: "document",
      title: props.deck.name,
      url: routes.dashboard.deck.url(props.deck.id),
    };
  }, [parentFolder?.id, props.deck.id, props.deck.name]);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <div className={classes.headerButtons()}>
          <ButtonBack href={backUrl} className={classes.buttonBack()} />
        </div>
        <FolderBreadcrumbs
          className={classes.breadcrumbs()}
          breadcrumbs={props.foldersBreadcrumbs}
          lastItem={lastBreadcrumb}
        />
      </div>
      <EditableText
        text={props.deck.name}
        className={classes.name()}
        placeholder="Enter deck name"
      />
    </div>
  );
};
