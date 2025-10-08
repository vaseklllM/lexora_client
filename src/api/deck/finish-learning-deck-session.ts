"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  cardIds: string[];
}

export const finishLearningDeckSession = async (
  args: Args,
): Promise<Result> => {
  const result = await fetchCustom("deck/finish-learning-session", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result.data);
};
