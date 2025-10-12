"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";
import { notFoundErrorSchema } from "../schemas/errors/not-found-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    cards: v.array(cardSchema),
  }),
  [notFoundErrorSchema],
);

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  deckId: string;
}

export const startReviewAllCardsDeckSession = async (
  args: Args,
): Promise<Result> => {
  const result = await fetchCustom("deck/start-review-all-cards-session", {
    method: "GET",
    params: args,
  });

  return v.parse(resultSchema, result);
};
