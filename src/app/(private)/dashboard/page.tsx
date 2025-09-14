import { authService } from "@/shared/api/endpoints/auth";
import { dashboardService } from "@/shared/api/endpoints/dashboard";
import { Test } from "./Test";

export default async function Home() {
  const meData = await authService.me.fetch();
  const dashboardData = await dashboardService.dashboard.fetch();

  return (
    <div className="p-4">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(meData, null, 2)}</pre>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
      <br />
      <Test />
    </div>
  );
}
