import { dashboardQuery } from "./get-dashboard/query";

class DashboardService {
  public readonly dashboard = dashboardQuery;
}

export const dashboardService = new DashboardService();
