"use server";

import { dashboardService } from "@/shared/api/endpoints/dashboard";

export const revalidate = async () => {
  dashboardService.dashboard.revalidate();
};
