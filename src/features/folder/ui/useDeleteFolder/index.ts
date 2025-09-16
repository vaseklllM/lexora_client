import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { deleteFolder } from "@/api/folder/delete-folder";
import { ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useCallback } from "react";

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
