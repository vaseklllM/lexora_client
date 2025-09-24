"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { cardSchema } from "../schemas/card.schema";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(cardSchema, [
  conflictErrorSchema,
  badRequestErrorSchema(["name"]),
]);

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  deckId: string;
  textInKnownLanguage: string;
  textInLearningLanguage: string;
  descriptionInKnownLanguage?: string;
  descriptionInLearningLanguage?: string;
}

export const createCard = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("card/create", {
    method: "POST",
    body: args,
  });

  return v.parse(resultSchema, result);
};
