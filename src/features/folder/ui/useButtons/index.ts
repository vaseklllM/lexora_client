import { DropdownItem } from "@/entities/dropdown-menu";
import { useMemo } from "react";
import { useFolderStore } from "../../model/store";
import { FolderProps } from "../Folder";
import { useTranslation } from "@/shared/hooks/useTranslation";

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
  const { t } = useTranslation();

  return useMemo((): DropdownItem[] => {
    return [
      {
        id: Button.RENAME,
        type: "button",
        label: t("folder.buttons.rename"),
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
        label: t("folder.buttons.delete"),
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
