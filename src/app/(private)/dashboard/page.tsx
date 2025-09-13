import { authService } from "@/shared/api/endpoints/auth";
import { routes } from "@/shared/routes";
import { Link } from "@/shared/ui/Link";
import { Test } from "./Test";

export default async function Home() {
  const meData = await authService.me.fetch();

  return (
    <div className="p-4">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(meData, null, 2)}</pre>
      <br />
      <Link href={routes.signIn.url()}>Sign In</Link>
      <Test />
    </div>
  );
}
