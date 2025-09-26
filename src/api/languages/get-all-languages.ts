"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import * as v from "valibot";
import { languageSchema } from "../schemas/language.schema";

const resultSchema = v.object({
  data: v.array(languageSchema),
});

const tag = `languages-all__${stackQueryKeys.next()}`;

export async function getAllLanguages() {
  const result = await fetchCustom("languages/all", {
    next: {
      tags: [tag],
    },
  });

  return v.parse(resultSchema, result.data);
}
