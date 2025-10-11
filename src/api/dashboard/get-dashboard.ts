"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { deckSchema } from "../schemas/deck.schema";
import { folderSchema } from "../schemas/folder.schema";

const resultSchema = v.object({
  childFolders: v.array(folderSchema),
  childDecks: v.array(deckSchema),
});

type Result = v.InferOutput<typeof resultSchema>;

const tag = "dashboard";

export async function getDashboard(): Promise<Result> {
  const result = await fetchCustom("dashboard", {
    next: {
      tags: [tag],
    },
  });

  return v.parse(resultSchema, result.data);
}

export async function revalidateGetDashboard() {
  revalidateTag(tag);
}
