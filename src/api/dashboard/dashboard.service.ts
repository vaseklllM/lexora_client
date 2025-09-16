import { dashboardQuery } from "./get-dashboard";

class DashboardService {
  public readonly dashboard = dashboardQuery;
}

export const dashboardService = new DashboardService();
