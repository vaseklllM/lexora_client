import { DropdownItem } from "@/entities/DropdownMenu";
import { useMemo } from "react";

const enum Button {
  RENAME,
  DELETE,
}

export function useButtons(): DropdownItem[] {
  return useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.RENAME,
        type: "button",
        label: "Rename",
        icon: "edit",
        onClick: ({ closePopover }) => {
          // console.log("Rename");
          closePopover();
        },
      },
      {
        id: Button.DELETE,
        type: "button",
        label: "Delete",
        icon: "delete",
        onClick: () => {
          // console.log("Delete");
        },
      },
    ];
  }, []);
}
