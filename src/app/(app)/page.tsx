import { checkIsAuth } from "@/shared/api-core/checkIsAuth";
import { routes } from "@/shared/routes";
import { redirect } from "next/navigation";

export default async function Page() {
  const isAuth = await checkIsAuth();

  if (!isAuth) {
    redirect(routes.signIn.url());
  }

  redirect(routes.dashboard.url());
}
