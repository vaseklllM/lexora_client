import { getMe } from "@/api/auth/get-me";
import { getAllLanguages } from "@/api/languages/get-all-languages";
import { checkIsAuth } from "@/shared/api-core/checkIsAuth";
import { routes } from "@/shared/routes";
import { Header } from "@/widgets/header";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await checkIsAuth();
  const allLanguages = await getAllLanguages();

  if (!isAuth) {
    redirect(routes.signIn.url());
  }

  const me = await getMe();

  return (
    <div className="bg-base-300 min-h-screen">
      <Header
        allLanguages={allLanguages.data}
        userName={me.name}
        avatarUrl={me.avatar}
        userLanguage={me.language}
      />
      <div className="pb-30 sm:p-4">{children}</div>
    </div>
  );
}
