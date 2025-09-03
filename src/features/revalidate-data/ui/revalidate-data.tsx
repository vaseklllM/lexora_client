"use client";

import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
// import { posts as postsStore } from "../../../app/atm/page";

export const RevalidateData = () => {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={async () => {
          await fetch("/api/revalidate-cats", {});

          // const catsRes = await fetch(
          //   "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME",
          //   {
          //     cache: "force-cache",
          //     next: {
          //       tags: ["cats"],
          //     },
          //   },
          // );

          // const cats = await catsRes.json();

          // console.log(`${cats[0].id} - ${cats[1].id}`);

          router.refresh();

          // router.prefetch("/");
        }}
      >
        revalidate data
      </Button>
    </>
  );
};
