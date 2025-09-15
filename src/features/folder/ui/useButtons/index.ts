import { DropdownItem } from "@/entities/dropdown-menu";
import { useMemo } from "react";

const enum Button {
  RENAME,
  DELETE,
}

interface Props {
  setIsOpenModalDeleteAgree: (isOpen: boolean) => void;
  setIsOpenModalRenameFolder: (isOpen: boolean) => void;
}

export function useButtons(props: Props): DropdownItem[] {
  return useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.RENAME,
        type: "button",
        label: "Rename",
        icon: "edit",
        onClick: ({ closePopover }) => {
          closePopover();
          props.setIsOpenModalRenameFolder(true);
        },
      },
      {
        id: Button.DELETE,
        type: "button",
        label: "Delete",
        icon: "delete",
        onClick: ({ closePopover }) => {
          closePopover();
          props.setIsOpenModalDeleteAgree(true);
        },
      },
    ];
  }, [props.setIsOpenModalDeleteAgree, props.setIsOpenModalRenameFolder]);
}
