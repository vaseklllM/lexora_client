"use server";

import { fetchCustom } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Result = v.InferOutput<typeof resultSchema>;

export const createDeck = async (deckId: string): Promise<Result> => {
  const result = await fetchCustom("deck/delete", {
    method: "DELETE",
    body: { deckId },
  });
  const data = await result.json();

  return v.parse(resultSchema, data);
};
