"use server";

import { folderService } from "@/shared/api/endpoints/folder";

export const createFolder = async (args: { name: string }) => {
  await folderService.create.fetch({
    name: args.name,
  });
};
