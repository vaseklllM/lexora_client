"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    textInKnownLanguage: v.string(),
    textInLearningLanguage: v.string(),
    descriptionInKnownLanguage: v.string(),
    descriptionInLearningLanguage: v.string(),
  }),
  [badRequestErrorSchema(["textInKnownLanguage", "textInLearningLanguage"])],
);

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  deckId: string;
  textInKnownLanguage?: string;
  textInLearningLanguage?: string;
}

export const fillCardData = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("ai/fill-card-data", {
    params: args,
  });

  return v.parse(resultSchema, result);
};
