"use server";

import { fetchCustom } from "@/shared/api/core/fetchCustom";
import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { deckSchema } from "../schemas/deck.schema";
import { folderSchema } from "../schemas/folder.schema";

const resultSchema = v.object({
  childFolders: v.array(folderSchema),
  childDecks: v.array(deckSchema),
});

type Result = v.InferOutput<typeof resultSchema>;

const tag = `dashboard__${stackQueryKeys.next()}`;

export async function getDashboard(): Promise<Result> {
  const result = await fetchCustom("dashboard", {
    next: {
      tags: [tag],
      revalidate: Infinity,
    },
  });
  const data = await result.json();

  return v.parse(resultSchema, data);
}

export async function revalidateGetDashboard() {
  // revalidateTag(tag);
  revalidateTag("random_tag");
}
