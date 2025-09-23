"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";
import { deckSchema } from "../schemas/deck.schema";
import { folderBreadcrumbSchema } from "../schemas/folder-breadcrumb.schema";

const resultSchema = v.object({
  ...deckSchema.entries,
  cards: v.array(cardSchema),
  foldersBreadcrumbs: v.array(folderBreadcrumbSchema),
});

const tag = `deck__${stackQueryKeys.next()}`;

const getTag = (deckId: string) => `${tag}__${deckId}`;

type Result = v.InferOutput<typeof resultSchema>;

export const getDeck = async (deckId: string): Promise<Result> => {
  const result = await fetchCustom(`deck/${deckId}`, {
    next: {
      tags: [getTag(deckId)],
    },
  });

  return v.parse(resultSchema, result.data);
};

export async function revalidateGetDeck(deckId: string) {
  revalidateTag(getTag(deckId));
}
