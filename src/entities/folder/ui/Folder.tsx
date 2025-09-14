import { FolderIcon } from "@/shared/icons/Folder";
import { countOf } from "@/shared/utils/count-of";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 hover:bg-base-content/15 flex cursor-pointer flex-col gap-2 rounded-lg p-3 pr-4 pl-4",
    header: "flex items-center gap-2",
    headerName: "text-base-content/100 text-sm font-medium",
    content: "flex items-center gap-2",
    numberOfCards: "text-sm font-medium",
  },
  variants: {
    isNumberOfCards: {
      true: {
        numberOfCards: "text-base-content/60",
      },
      false: {
        numberOfCards: "text-base-content/30",
      },
    },
  },
});

export interface IFolder {
  id: string;
  name: string;
  numberOfCards: number;
}

interface Props {
  className?: string;
  folder: IFolder;
}

export const Folder = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <FolderIcon />
        <p className={classes.headerName()}>{props.folder.name}</p>
      </div>
      <div className={classes.content()}>
        <p
          className={classes.numberOfCards({
            isNumberOfCards: props.folder.numberOfCards > 0,
          })}
        >
          {countOf(props.folder.numberOfCards, "card")}
        </p>
      </div>
    </div>
  );
};
