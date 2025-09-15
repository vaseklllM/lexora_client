import { ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useCallback } from "react";
import { deleteFolder } from "./deleteFolder";
import { revalidate } from "./revalidate";

export function useDeleteFolder(folderId: string) {
  return useCallback<ModalAgreeOnAgree>(
    async ({ closeModal }) => {
      await deleteFolder(folderId);
      await closeModal();
      revalidate();
    },
    [folderId],
  );
}
