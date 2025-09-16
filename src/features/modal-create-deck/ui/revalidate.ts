"use server";

import { dashboardService } from "@/api/dashboard";

export const revalidate = async () => {
  dashboardService.dashboard.revalidate();
};
