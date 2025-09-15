"use server";

import { folderService } from "@/shared/api/endpoints/folder";

export const deleteFolder = async (folderId: string) => {
  await folderService.delete.fetch(folderId);
};
