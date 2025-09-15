"use server";

import { dashboardService } from "@/shared/api/endpoints/dashboard";
import { folderService } from "@/shared/api/endpoints/folder";

export const deleteFolder = async (folderId: string) => {
  await folderService.delete.fetch(folderId);
  dashboardService.dashboard.revalidate();
};
