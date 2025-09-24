"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(cardSchema, [
  conflictErrorSchema,
  badRequestErrorSchema([
    "textInKnownLanguage",
    "textInLearningLanguage",
    "descriptionInKnownLanguage",
    "descriptionInLearningLanguage",
  ]),
]);

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  cardId: string;
  textInKnownLanguage: string;
  textInLearningLanguage: string;
  descriptionInKnownLanguage?: string;
  descriptionInLearningLanguage?: string;
}

export const updateCard = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("card/update", {
    method: "PUT",
    body: args,
  });

  return v.parse(resultSchema, result);
};
