import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useCallback } from "react";
import { deleteFolder } from "./deleteFolder";

export function useDeleteFolder(folderId: string) {
  return useCallback<ModalAgreeOnAgree>(
    async ({ closeModal }) => {
      await deleteFolder(folderId);
      await closeModal();
      await revalidateGetDashboard();
    },
    [folderId],
  );
}
