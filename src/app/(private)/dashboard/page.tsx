import { Section } from "@/widgets/section";
import { dashboardService } from "@/shared/api/endpoints/dashboard";

export default async function Home() {
  const dashboardData = await dashboardService.dashboard.fetch();

  return (
    <div className="p-4">
      <Section
        folders={dashboardData.childFolders}
        decks={dashboardData.childDecks}
      />
    </div>
  );
}
