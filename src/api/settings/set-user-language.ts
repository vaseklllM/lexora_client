"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Response = v.InferInput<typeof resultSchema>;
type Result = v.InferOutput<typeof resultSchema>;

interface Args {
  languageCode: string;
}
export const setUserLanguage = async (args: Args): Promise<Result> => {
  const result = await fetchCustom<Response>("settings/set-language", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result.data);
};
