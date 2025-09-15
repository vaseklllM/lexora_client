import { DropdownButton, DropdownItem } from "@/entities/DropdownButton";
import { IFolder } from "@/shared/api/endpoints/schemas/folder.schema";
import { FolderIcon } from "@/shared/icons/Folder";
import { countOf } from "@/shared/utils/count-of";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 hover:bg-base-content/15 relative flex cursor-pointer flex-col gap-2 rounded-lg p-3 pr-4 pl-4",
    header: "flex items-center gap-2",
    dottedButton: "absolute top-2 right-2",
    headerName: "text-base-content/100 text-sm font-medium",
    content: "flex items-center justify-between gap-2",
    numberOfCards: "text-sm font-medium",
    progress: "progress progress-primary opacity-80",
    numberOfCardsProgress: "text-sm font-medium",
  },
  variants: {
    isNumberOfCards: {
      true: {
        numberOfCards: "text-base-content/60",
        numberOfCardsProgress: "text-base-content/60",
      },
      false: {
        numberOfCards: "text-base-content/30",
        numberOfCardsProgress: "text-base-content/30",
      },
    },
  },
});

interface Props {
  className?: string;
  folder: IFolder;
  dottedDropdownButtons: DropdownItem[];
}

export const Folder = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <DropdownButton
        items={props.dottedDropdownButtons}
        className={classes.dottedButton()}
        buttonType="dotted"
      />
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
        {/* <p className={classes.numberOfCardsProgress()}>45%</p> */}
      </div>
      {/* <progress className={classes.progress()} value="45" max="100"></progress> */}
    </div>
  );
};
