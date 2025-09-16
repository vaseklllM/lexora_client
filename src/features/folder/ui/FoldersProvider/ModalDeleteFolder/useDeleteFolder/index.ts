import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { deleteFolder } from "@/api/folder/delete-folder";
import { ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useFolderStore } from "@/features/folder/model/store";
import { useCallback } from "react";

export function useDeleteFolder() {
  return useCallback<ModalAgreeOnAgree>(async ({ closeModal }) => {
    const store = useFolderStore.getState();
    const folderId = store.modalDeleteFolder.folder?.id;
    if (typeof folderId === "string") {
      await deleteFolder(folderId);
      await closeModal();
      await revalidateGetDashboard();
    }
  }, []);
}
