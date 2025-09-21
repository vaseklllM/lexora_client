"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";
import { deckSchema } from "../schemas/deck.schema";

const resultSchema = v.object({
  ...deckSchema.entries,
  cards: v.array(cardSchema),
});

type Result = v.InferOutput<typeof resultSchema>;

export const getDeck = async (deckId: string): Promise<Result> => {
  const result = await fetchCustom(`deck/${deckId}`);

  return v.parse(resultSchema, result.data);
};
