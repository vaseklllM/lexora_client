import { routes } from "@/shared/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Hello World</h1>
      <br />
      <Link href={routes.signIn.url()}>Sign In</Link>
    </div>
  );
}
