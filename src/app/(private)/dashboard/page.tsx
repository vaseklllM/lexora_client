import { Section } from "@/entities/section";
import { dashboardService } from "@/shared/api/endpoints/dashboard";

export default async function Home() {
  const dashboardData = await dashboardService.dashboard.fetch();

  return (
    <div className="p-4">
      <Section title="Folders" folders={dashboardData.childFolders}></Section>
    </div>
  );
}
