"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Result = v.InferOutput<typeof resultSchema>;

export type FinishReviewCardTypeOfStrategy =
  | "pair_it"
  | "guess_it"
  | "recall_it"
  | "type_it";

interface Args {
  cardId: string;
  isCorrectAnswer: boolean;
  typeOfStrategy: FinishReviewCardTypeOfStrategy;
}

export const finishReviewCard = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("deck/finish-review-card", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result.data);
};
