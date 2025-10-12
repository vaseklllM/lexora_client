"use client";

import { ModalAgree } from "@/entities/modal-agree";
import { ReactElement } from "react";
import { useFolderStore } from "../../../model/store";
import { useDeleteFolder } from "./useDeleteFolder";
import { useTranslation } from "@/shared/hooks/useTranslation";

export const ModalDeleteFolder = (): ReactElement => {
  const isOpen = useFolderStore((state) => state.modalDeleteFolder.isOpen);
  const closeHandler = useFolderStore((state) => state.closeModalDeleteFolder);
  const folderName = useFolderStore(
    (state) => state.modalDeleteFolder.folder?.name,
  );
  const { t } = useTranslation();

  const onDelete = useDeleteFolder();

  return (
    <ModalAgree
      isOpen={isOpen}
      onCloseModal={closeHandler}
      title={t("modal.delete_folder.title", { folderName })}
      description={t("modal.delete_folder.description")}
      cancelButtonText={t("modal.delete_folder.buttons.cancel")}
      agreeButtonText={t("modal.delete_folder.buttons.delete")}
      onAgree={onDelete}
    />
  );
};
