import { getAllLanguages } from "@/api/languages/get-all-languages";
import { Section } from "@/widgets/section";

interface Props {
  params: {
    id: string;
  };
}

export default async function FolderPage(props: Props) {
  const params = await props.params;
  const allLanguages = await getAllLanguages();

  return (
    <Section
      allLanguages={allLanguages.data}
      folders={[]}
      decks={[]}
      folderId={params.id}
    />
  );
}
