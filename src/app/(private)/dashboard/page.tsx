import { getDashboard } from "@/api/dashboard/get-dashboard";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await getDashboard();
  const languages = await getAllLanguages();

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
