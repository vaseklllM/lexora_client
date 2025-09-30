"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    message: v.string(),
  }),
  [conflictErrorSchema],
);

type Args = {
  deckId: string;
  toFolderId?: string;
};

export async function moveDeck(args: Args) {
  const result = await fetchCustom(`deck/move`, {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result);
}
