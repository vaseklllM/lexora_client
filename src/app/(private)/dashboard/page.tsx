import { getDashboard } from "@/api/dashboard/get-dashboard";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { getMyLanguages } from "@/api/languages/get-my-languages";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await getDashboard();
  const languages = await getAllLanguages();
  const myLanguages = await getMyLanguages();

  return (
    <Section
      folders={dashboardData.childFolders}
      decks={dashboardData.childDecks}
      allLanguages={languages.data}
      languagesWhatIKnow={myLanguages.languagesWhatIKnow}
      languagesWhatILearn={myLanguages.languagesWhatILearn}
    />
  );
}
