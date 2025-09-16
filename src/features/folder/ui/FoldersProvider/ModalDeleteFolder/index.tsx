"use client";

import { ModalAgree } from "@/entities/modal-agree";
import { ReactElement } from "react";
import { useFolderStore } from "../../../model/store";
import { useDeleteFolder } from "./useDeleteFolder";

export const ModalDeleteFolder = (): ReactElement => {
  const isOpen = useFolderStore((state) => state.modalDeleteFolder.isOpen);
  const closeHandler = useFolderStore((state) => state.closeModalDeleteFolder);
  const folderName = useFolderStore(
    (state) => state.modalDeleteFolder.folder?.name,
  );

  const onDelete = useDeleteFolder();

  return (
    <ModalAgree
      isOpen={isOpen}
      onCloseModal={closeHandler}
      title={`Delete Folder "${folderName}"`}
      description="Are you sure you want to delete this folder?"
      cancelButtonText="Cancel"
      agreeButtonText="Delete"
      onAgree={onDelete}
    />
  );
};
