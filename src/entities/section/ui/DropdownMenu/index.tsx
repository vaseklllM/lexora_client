import { Plus } from "@/shared/icons/Plus";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "",
    button: "btn btn-primary h-10 w-10 rounded-full p-0 shadow-md",
    list: "dropdown dropdown-end dropdown-top menu rounded-box bg-base-100 mb-2 w-30 shadow-sm",
  },
});

interface Props {
  className?: string;
}

export const DropdownMenu = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <button
        className={classes.button()}
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        <Plus className="stroke-base-100" />
      </button>

      <ul
        className={classes.list()}
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        <li>
          <a>Folder</a>
        </li>
        <li>
          <a>Deck</a>
        </li>
      </ul>
    </div>
  );
};
