"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/errors/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    message: v.string(),
  }),
  [conflictErrorSchema, badRequestErrorSchema(["name"])],
);

type Response = v.InferInput<typeof resultSchema>;
type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  name: string;
  deckId: string;
}
export const renameDeck = async (args: Args): Promise<Result> => {
  const result = await fetchCustom<Response>("deck/rename", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result);
};
