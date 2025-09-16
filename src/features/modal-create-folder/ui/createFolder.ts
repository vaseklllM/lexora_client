"use server";

import { folderService } from "@/api/folder";

export const createFolder = async (args: { name: string }) => {
  await folderService.create.fetch({
    name: args.name,
  });
};
