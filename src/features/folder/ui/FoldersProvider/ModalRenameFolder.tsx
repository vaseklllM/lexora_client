"use client";

import { ModalRenameFolder as ModalRenameFolderComponent } from "@/features/modal-rename-folder";
import { ReactElement } from "react";
import { useFolderStore } from "../../model/store";

export const ModalRenameFolder = (): ReactElement => {
  const isOpen = useFolderStore((state) => state.modalRenameFolder.isOpen);
  const closeHandler = useFolderStore((state) => state.closeModalRenameFolder);
  const folder = useFolderStore((state) => state.modalRenameFolder.folder);

  return (
    <ModalRenameFolderComponent
      isOpen={isOpen}
      onClose={closeHandler}
      folderId={folder?.id}
      folderName={folder?.name}
    />
  );
};
