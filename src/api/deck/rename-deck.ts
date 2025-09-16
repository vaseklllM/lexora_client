"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  name: string;
  deckId: string;
}
export const renameDeck = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("deck/rename", {
    method: "PATCH",
    body: args,
  });

  const data = await result.json();

  return v.parse(resultSchema, data);
};
