"use client";

import { DeleteIcon } from "@/shared/icons/Delete";
import { EditIcon } from "@/shared/icons/Edit";
import { FolderIcon } from "@/shared/icons/Folder";
import { LogoIcon } from "@/shared/icons/Logo";
import { PlusIcon } from "@/shared/icons/Plus";
import { DottedIconButton as DottedButtonComponent } from "@/shared/ui/DottedIconButton";
import { ReactElement, useId, useMemo, useRef } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    list: "dropdown menu rounded-box bg-base-100 shadow-sm",
    icon: "flex h-5 w-5 items-center justify-center",
  },
  variants: {
    listPosition: {
      end: { list: "dropdown-end" },
      "end-top": { list: "dropdown-end dropdown-top" },
    },
  },
});

type DropdownButtonType = "dotted" | "plus";

type IconType = "edit" | "delete" | "folder" | "deck";

export type DropdownItem = {
  type: "button";
  id: number | string;
  label: string;
  onClick: (args: { closePopover: () => void }) => void;
  icon?: IconType;
};

interface Props {
  className?: string;
  items: DropdownItem[];
  buttonType: DropdownButtonType;
  listPosition?: "end" | "end-top";
  listClassName?: string;
}

export const DropdownMenu = (props: Props): ReactElement => {
  const id = useId();
  const popoverId = `popover-${id}`;
  const anchorName = `--anchor-${id}`;
  const popoverListRef = useRef<HTMLUListElement>(null);

  const classes = classesSlots(props);

  const button = useMemo(() => {
    switch (props.buttonType) {
      case "dotted": {
        return (
          <DottedButtonComponent
            className="btn"
            popoverTarget={popoverId}
            anchorName={anchorName}
          />
        );
      }

      case "plus": {
        return (
          <button
            className="btn btn-primary h-10 w-10 rounded-full p-0 shadow-md"
            popoverTarget={popoverId}
            style={{ anchorName: anchorName } as React.CSSProperties}
          >
            <PlusIcon className="text-neutral-content" />
          </button>
        );
      }
    }
  }, [props.buttonType, anchorName, popoverId]);

  return (
    <div className={props.className}>
      {button}
      <ul
        ref={popoverListRef}
        className={classes.list({ className: props.listClassName })}
        popover="auto"
        id={popoverId}
        style={{ positionAnchor: anchorName } as React.CSSProperties}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.items.map((item) => (
          <li key={item.id}>
            <button
              className="group"
              onClick={(e) => {
                e.stopPropagation();
                item.onClick({
                  closePopover: () => popoverListRef.current?.hidePopover(),
                });
              }}
            >
              {item.icon && (
                <div className={classes.icon()}>
                  <Icon icon={item.icon} />
                </div>
              )}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const iconClasses = tv({
  base: "duration-200",
});

function Icon(props: { icon: IconType }) {
  switch (props.icon) {
    case "edit":
      return <EditIcon className={iconClasses()} />;

    case "delete":
      return <DeleteIcon className={iconClasses()} />;

    case "folder":
      return (
        <FolderIcon className={iconClasses()} height="18px" width="18px" />
      );

    case "deck":
      return <LogoIcon className={iconClasses()} height="16px" width="16px" />;

    default: {
      const _check: never = props.icon;
      throw new Error(`Unhandled icon type: ${_check}`);
    }
  }
}
