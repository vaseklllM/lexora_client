"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Response = v.InferInput<typeof resultSchema>;
type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  name: string;
  deckId: string;
}
export const renameDeck = async (args: Args): Promise<Result> => {
  const data = await fetchCustom<Response>("deck/rename", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, data);
};
