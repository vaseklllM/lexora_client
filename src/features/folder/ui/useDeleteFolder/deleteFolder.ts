"use server";

import { folderService } from "@/api/folder";

export const deleteFolder = async (folderId: string) => {
  await folderService.delete.fetch(folderId);
};
