"use client";

import { Plus } from "@/shared/icons/Plus";
import { ReactElement, useId, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { ModalCreateDesc } from "./ModalCreateDesc";
import { ModalCreateFolder } from "./ModalCreateFolder";

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
  const id = useId();
  const popoverId = `popover-${id}`;
  const popoverListRef = useRef<HTMLUListElement>(null);

  const classes = classesSlots();
  const [isOpenModalCreateFolder, setIsOpenModalCreateFolder] = useState(false);
  const [isOpenModalCreateDesc, setIsOpenModalCreateDesc] = useState(false);

  return (
    <div className={classes.base({ className: props.className })}>
      <button
        className={classes.button()}
        popoverTarget={popoverId}
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      >
        <Plus className="stroke-base-100" />
      </button>

      <ul
        ref={popoverListRef}
        className={classes.list()}
        popover="auto"
        id={popoverId}
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
      >
        <li>
          <a
            onClick={() => {
              setIsOpenModalCreateFolder(true);
              popoverListRef.current?.hidePopover();
            }}
          >
            Folder
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              setIsOpenModalCreateDesc(true);
              popoverListRef.current?.hidePopover();
            }}
          >
            Deck
          </a>
        </li>
      </ul>
      <ModalCreateFolder
        isOpen={isOpenModalCreateFolder}
        setIsOpen={setIsOpenModalCreateFolder}
      />
      <ModalCreateDesc
        isOpen={isOpenModalCreateDesc}
        setIsOpen={setIsOpenModalCreateDesc}
      />
    </div>
  );
};
