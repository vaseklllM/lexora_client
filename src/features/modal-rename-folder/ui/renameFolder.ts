"use server";

import { folderService } from "@/shared/api/endpoints/folder";

export const renameFolder = async (args: {
  name: string;
  folderId: string;
}) => {
  await folderService.rename.fetch({
    newName: args.name,
    id: args.folderId,
  });
};
