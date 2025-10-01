import { getDashboard } from "@/api/dashboard/get-dashboard";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { getMyLanguages } from "@/api/languages/get-my-languages";
// import { routes } from "@/shared/routes";
// import { Link } from "@/shared/ui/Link";
import { Section } from "@/widgets/section";

export default async function Home() {
  const dashboardData = await getDashboard();
  const languages = await getAllLanguages();
  const myLanguages = await getMyLanguages();

  //   return (
  //     <div>
  //       <h1>Home</h1>
  //       <div>
  //         {dashboardData.childFolders.map((folder) => (
  //           <Link href={routes.dashboard.folder.url(folder.id)} key={folder.id}>
  //             {folder.name}
  //           </Link>
  //         ))}
  //       </div>
  //       <div>
  //         <div className="ball-holder">
  //           <div className="ball"></div>
  //         </div>
  //         <style>
  //           {`
  //             .ball {
  //   width: 80px;
  //   height: 80px;
  //   border-radius: 50%;
  //   background: linear-gradient(teal, #000);
  // }

  // .ball {
  //   display: block;
  //   transition: all 2s;
  // }

  // .ball-holder:hover .ball {
  //   transform: translateX(calc(100vw - 80px)) rotate(360deg);
  // }
  //           `}
  //         </style>
  //       </div>
  //     </div>
  //   );

  return (
    <Section
      folders={dashboardData.childFolders}
      decks={dashboardData.childDecks}
      allLanguages={languages.data}
      languagesWhatIKnow={myLanguages.languagesWhatIKnow}
      languagesWhatILearn={myLanguages.languagesWhatILearn}
      title="Home"
    />
  );
}
