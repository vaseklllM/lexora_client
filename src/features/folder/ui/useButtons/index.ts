import { DropdownItem } from "@/entities/DottedDropdownButton";
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
        onClick: () => {
          // console.log("Rename");
        },
      },
      {
        id: Button.DELETE,
        type: "button",
        label: "Delete",
        onClick: () => {
          // console.log("Delete");
        },
      },
    ];
  }, []);
}
