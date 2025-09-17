"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    name: v.string(),
    id: idSchema(),
  }),
  [conflictErrorSchema, badRequestErrorSchema(["name"])],
);

type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  name: string;
  languageWhatIKnowCode: string;
  languageWhatILearnCode: string;
  folderId?: string;
}

export const createDeck = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("deck/create", {
    method: "POST",
    body: args,
  });

  return v.parse(resultSchema, result);
};
