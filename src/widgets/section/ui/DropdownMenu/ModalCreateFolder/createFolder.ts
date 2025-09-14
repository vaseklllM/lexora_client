"use server";

import { dashboardService } from "@/shared/api/endpoints/dashboard";
import { folderService } from "@/shared/api/endpoints/folder";

export const createFolder = async (args: { name: string }) => {
  await folderService.create.fetch({
    name: args.name,
  });
  dashboardService.dashboard.revalidate();
};
