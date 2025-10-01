"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { languageSchema } from "../schemas/language.schema";

const resultSchema = v.object({
  languagesWhatIKnow: v.array(languageSchema),
  languagesWhatILearn: v.array(languageSchema),
});

const tag = `languages-my__${stackQueryKeys.next()}`;

export async function getMyLanguages() {
  const result = await fetchCustom("languages/my", {
    next: {
      tags: [tag],
    },
    cache: "reload",
  });

  return v.parse(resultSchema, result.data);
}

export async function revalidateGetMyLanguages() {
  revalidateTag(tag);
}
