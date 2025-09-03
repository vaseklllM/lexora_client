import { ATM } from "@/entities/atm";
import { RevalidateData } from "@/features/revalidate-data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { getPosts } from "./fetcher";

// export const posts = new DataLoader();

export default async function AtmPage() {
  // await posts.fetch();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
