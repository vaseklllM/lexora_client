import { IFolderBreadcrumb } from "@/api/schemas/folder-breadcrumb.schema";
import { FolderBreadcrumbs } from "@/entities/folder-breadcrumbs";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-200 relative rounded-xl p-5 pr-5 pb-15 pl-5 shadow-md",
    breadcrumbs: "",
  },
});

interface Props {
  className?: string;
  foldersBreadcrumbs: IFolderBreadcrumb[];
}

export const DeckSection = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <FolderBreadcrumbs
        className={classes.breadcrumbs()}
        breadcrumbs={props.foldersBreadcrumbs}
      />
    </div>
  );
};
