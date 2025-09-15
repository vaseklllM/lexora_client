"use client";

import {
  DropdownItem,
  DropdownMenu as DropdownMenuComponent,
} from "@/entities/DropdownMenu";
import { ReactElement, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { ModalCreateDesc } from "./ModalCreateDesc";
import { ModalCreateFolder } from "./ModalCreateFolder";

const enum Button {
  CREATE_FOLDER,
  CREATE_DECK,
}

const classesSlots = tv({
  slots: {
    base: "",
  },
});

interface Props {
  className?: string;
}

export const DropdownMenu = (props: Props): ReactElement => {
  const classes = classesSlots();
  const [isOpenModalCreateFolder, setIsOpenModalCreateFolder] = useState(false);
  const [isOpenModalCreateDesc, setIsOpenModalCreateDesc] = useState(false);

  const buttons = useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.CREATE_FOLDER,
        type: "button",
        label: "Folder",
        icon: "folder",
        onClick: ({ closePopover }) => {
          setIsOpenModalCreateFolder(true);
          closePopover();
        },
      },
      {
        id: Button.CREATE_DECK,
        type: "button",
        label: "Deck",
        icon: "deck",
        onClick: ({ closePopover }) => {
          setIsOpenModalCreateDesc(true);
          closePopover();
        },
      },
    ];
  }, [setIsOpenModalCreateFolder, setIsOpenModalCreateDesc]);

  return (
    <div className={classes.base({ className: props.className })}>
      <DropdownMenuComponent
        items={buttons}
        buttonType="plus"
        listPosition="end-top"
        listClassName="mb-2"
      />
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
