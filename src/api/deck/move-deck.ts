"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Args = {
  deckId: string;
  toFolderId?: string;
};

export async function moveDeck(args: Args) {
  const result = await fetchCustom(`deck/move`, {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result.data);
}
