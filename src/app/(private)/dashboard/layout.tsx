import { checkIsAuth } from "@/shared/api/core/checkIsAuth";
import { authService } from "@/shared/api/endpoints/auth";
import { routes } from "@/shared/routes";
import { Header } from "@/widgets/header";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await checkIsAuth();

  if (!isAuth) {
    redirect(routes.signIn.url());
  }

  const me = await authService.me.fetch();

  return (
    <div className="bg-base-300 min-h-screen">
      <Header userName={me.name} />
      {children}
    </div>
  );
}
