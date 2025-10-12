"use client";

import { IFolder } from "@/api/schemas/folder.schema";
import { DropdownItem, DropdownMenu } from "@/entities/dropdown-menu";
import { useLanguage } from "@/shared/config/i18n";
import { ArrowBack } from "@/shared/icons/ArrowBack";
import { FolderIcon } from "@/shared/icons/Folder";
import { countOf } from "@/shared/utils/count-of";
import { ReactElement, Ref } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "border-base-300 bg-base-300 hover:bg-base-content/15 hover:border-base-content/0 transition-border relative flex min-h-20 cursor-pointer flex-col gap-2 rounded-lg border-2 p-3 pr-4 pl-4 duration-150",
    header: "flex items-center gap-2",
    folderIcon: "min-h-6 min-w-6",
    arrowBackIcon:
      "text-base-content/60 flex min-h-6 min-w-6 items-center justify-center",
    dottedButton: "absolute top-2 right-2",
    name: "text-base-content/100 w-[calc(100%-55px)] truncate text-sm font-medium",
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
    isOver: {
      true: {
        base: "border-primary",
      },
      false: {
        base: "",
      },
    },
  },
});

interface Props {
  className?: string;
  folder: Partial<IFolder>;
  dottedDropdownButtons?: DropdownItem[];
  onClick?: (event: React.MouseEvent) => void;
  ref?: Ref<HTMLDivElement>;
  icon?: "folder" | "arrowBack";
  isOver?: boolean;
}

export const Folder = (props: Props): ReactElement => {
  const classes = classesSlots();
  const language = useLanguage();

  return (
    <div
      className={classes.base({
        className: props.className,
        isOver: props.isOver,
      })}
      onClick={props.onClick}
      ref={props.ref}
    >
      {props.dottedDropdownButtons && (
        <DropdownMenu
          items={props.dottedDropdownButtons}
          className={classes.dottedButton()}
          buttonType="dotted"
          listPosition="end"
          listClassName="mt-1"
        />
      )}
      <div className={classes.header()}>
        {props.icon === "folder" && (
          <FolderIcon className={classes.folderIcon()} />
        )}
        {props.icon === "arrowBack" && (
          <div className={classes.arrowBackIcon()}>
            <ArrowBack height="20px" width="20px" />
          </div>
        )}
        <p className={classes.name()}>{props.folder.name}</p>
      </div>
      {typeof props.folder.numberOfCards === "number" && (
        <div className={classes.content()}>
          <p
            className={classes.numberOfCards({
              isNumberOfCards: props.folder.numberOfCards > 0,
            })}
          >
            {countOf(props.folder.numberOfCards, "card", language)}
          </p>
          {/* <p className={classes.numberOfCardsProgress()}>45%</p> */}
        </div>
      )}
      {/* <progress className={classes.progress()} value="45" max="100"></progress> */}
    </div>
  );
};
