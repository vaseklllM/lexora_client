"use client";

import { Language } from "@/api/schemas/language.schema";
import {
  DropdownItem,
  DropdownMenu as DropdownMenuComponent,
} from "@/entities/dropdown-menu";
import { ModalCreateDeck } from "@/features/modal-create-deck";
import { ModalCreateFolder } from "@/features/modal-create-folder";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ReactElement, useMemo, useState } from "react";
import { tv } from "tailwind-variants";

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
  allLanguages: Language[];
  folderId?: string;
  languagesWhatIKnow: Language[];
  languagesWhatILearn: Language[];
}

export const DropdownMenu = (props: Props): ReactElement => {
  const classes = classesSlots();
  const [isOpenModalCreateFolder, setIsOpenModalCreateFolder] = useState(false);
  const [isOpenModalCreateDesc, setIsOpenModalCreateDesc] = useState(false);
  const { t } = useTranslation();

  const buttons = useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.CREATE_FOLDER,
        type: "button",
        label: t("section.plus_dropdown_menu.create_folder"),
        icon: "folder",
        onClick: ({ closePopover }) => {
          setIsOpenModalCreateFolder(true);
          closePopover();
        },
      },
      {
        id: Button.CREATE_DECK,
        type: "button",
        label: t("section.plus_dropdown_menu.create_deck"),
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
        folderId={props.folderId}
      />
      <ModalCreateDeck
        isOpen={isOpenModalCreateDesc}
        setIsOpen={setIsOpenModalCreateDesc}
        allLanguages={props.allLanguages}
        folderId={props.folderId}
        languagesWhatIKnow={props.languagesWhatIKnow}
        languagesWhatILearn={props.languagesWhatILearn}
      />
    </div>
  );
};
