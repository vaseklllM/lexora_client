"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";

const resultSchema = v.object({
  cards: v.array(cardSchema),
});

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  deckId: string;
  count?: number;
}

export const startLearningDeckSession = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("deck/start-learning-session", {
    method: "GET",
    params: args,
  });

  return v.parse(resultSchema, result);
};
