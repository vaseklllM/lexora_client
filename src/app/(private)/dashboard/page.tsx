import { dashboardService } from "@/shared/api/endpoints/dashboard";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await dashboardService.dashboard.fetch();

  return (
    <div className="p-4 pb-20">
      <Section
        folders={dashboardData.childFolders}
        decks={dashboardData.childDecks}
      />
    </div>
  );
}
