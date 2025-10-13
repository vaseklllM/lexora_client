import { checkIsAuth } from "@/shared/api-core/checkIsAuth";
import { routes } from "@/shared/routes";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await checkIsAuth();

  if (isAuth) {
    redirect(routes.dashboard.url());
  }

  return children;
}
