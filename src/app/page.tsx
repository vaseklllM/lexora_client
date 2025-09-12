import { routes } from "@/shared/routes";
import { Link } from "@/shared/ui/Link";
import { Test } from "./Test";
import { loadData } from "./loadData";

export default async function Home() {
  const session = await loadData();

  return (
    <div className="p-4">
      <h1>Hello World</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <br />
      <Link href={routes.signIn.url()}>Sign In</Link>
      <Test />
    </div>
  );
}
