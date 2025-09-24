import { getFolder } from "@/api/folder/get-folder";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { getMyLanguages } from "@/api/languages/get-my-languages";
import { Section } from "@/widgets/section";
import { ReactElement } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function FolderPage(props: Props): Promise<ReactElement> {
  const params = await props.params;
  const allLanguages = await getAllLanguages();
  const myLanguages = await getMyLanguages();
  const { childFolders, childDecks, breadcrumbs, ...folder } = await getFolder(
    params.id,
  );

  return (
    <Section
      allLanguages={allLanguages.data}
      folders={childFolders}
      decks={childDecks}
      folder={folder}
      breadcrumbs={breadcrumbs}
      languagesWhatIKnow={myLanguages.languagesWhatIKnow}
      languagesWhatILearn={myLanguages.languagesWhatILearn}
    />
  );
}
