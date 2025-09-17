"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

interface Args {
  name: string;
  languageWhatIKnowCode: string;
  languageWhatILearnCode: string;
  folderId?: string;
}

const resultSchema = v.object({
  name: v.string(),
  id: idSchema(),
});

type Result = v.InferOutput<typeof resultSchema>;

export const createDeck = async (args: Args): Promise<Result> => {
  const result = await fetchCustom("deck/create", {
    method: "POST",
    body: args,
  });

  return v.parse(resultSchema, result.data);
};
