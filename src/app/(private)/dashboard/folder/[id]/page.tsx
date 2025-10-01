import { getFolder } from "@/api/folder/get-folder";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { getMyLanguages } from "@/api/languages/get-my-languages";
// import { routes } from "@/shared/routes";
// import Link from "next/link";
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
  const { childFolders, childDecks, breadcrumbs, parentFolder, ...folder } =
    await getFolder(params.id);

  // return (
  //   <div>
  //     <h1>Home</h1>
  //     <Link href={routes.dashboard.url()}>back</Link>
  //     <div>
  //       {childDecks.map((folder) => (
  //         <Link href={routes.dashboard.folder.url(folder.id)} key={folder.id}>
  //           {folder.name}
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <Section
      allLanguages={allLanguages.data}
      folders={childFolders}
      decks={childDecks}
      folder={folder}
      breadcrumbs={breadcrumbs}
      languagesWhatIKnow={myLanguages.languagesWhatIKnow}
      languagesWhatILearn={myLanguages.languagesWhatILearn}
      parentFolder={parentFolder}
    />
  );
}
