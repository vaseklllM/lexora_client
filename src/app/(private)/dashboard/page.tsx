import { dashboardService } from "@/api/dashboard";
import { languagesService } from "@/api/languages";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await dashboardService.dashboard.fetch();
  const languages = await languagesService.all.fetch();

  return (
    <div className="p-4 pb-20">
      <Section
        folders={dashboardData.childFolders}
        decks={dashboardData.childDecks}
        allLanguages={languages.data}
      />
    </div>
  );
}
