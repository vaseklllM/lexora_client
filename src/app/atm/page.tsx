import { ATM } from "@/entities/atm";
import { RevalidateData } from "@/features/revalidate-data";
import Link from "next/link";

// export const posts = new DataLoader();

export default async function AtmPage() {
  return (
    <div className="p-4">
      <Link href="/">go home</Link>
      <br />
      <br />
      <RevalidateData />
      <h2 className="mt-5">ATM</h2>
      <ATM />
      <br />
      <br />
    </div>
  );
}
