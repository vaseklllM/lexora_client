import { getDashboard } from "@/api/dashboard/get-dashboard";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { getMyLanguages } from "@/api/languages/get-my-languages";
import { getTranslation } from "@/shared/config/i18n";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await getDashboard();
  const languages = await getAllLanguages();
  const myLanguages = await getMyLanguages();
  const { t } = await getTranslation();

  return (
    <Section
      folders={dashboardData.childFolders}
      decks={dashboardData.childDecks}
      allLanguages={languages.data}
      languagesWhatIKnow={myLanguages.languagesWhatIKnow}
      languagesWhatILearn={myLanguages.languagesWhatILearn}
      title={t("dashboard_section.title")}
    />
  );
}
