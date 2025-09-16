import { DropdownItem } from "@/entities/dropdown-menu";
import { useMemo } from "react";
import { useFolderStore } from "../../model/store";
import { FolderProps } from "../Folder";

const enum Button {
  RENAME,
  DELETE,
}

export function useButtons(props: FolderProps): DropdownItem[] {
  const openModalDeleteFolder = useFolderStore(
    (state) => state.openModalDeleteFolder,
  );
  const openModalRenameFolder = useFolderStore(
    (state) => state.openModalRenameFolder,
  );

  return useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.RENAME,
        type: "button",
        label: "Rename",
        icon: "edit",
        onClick: ({ closePopover }) => {
          closePopover();
          openModalRenameFolder({
            id: props.folder.id,
            name: props.folder.name,
          });
        },
      },
      {
        id: Button.DELETE,
        type: "button",
        label: "Delete",
        icon: "delete",
        onClick: ({ closePopover }) => {
          closePopover();
          openModalDeleteFolder({
            id: props.folder.id,
            name: props.folder.name,
          });
        },
      },
    ];
  }, [
    props.folder.id,
    props.folder.name,
    openModalDeleteFolder,
    openModalRenameFolder,
  ]);
}
