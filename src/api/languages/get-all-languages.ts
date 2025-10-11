"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { languageSchema } from "../schemas/language.schema";

const resultSchema = v.object({
  data: v.array(languageSchema),
});

const tag = "languages-all";

export async function getAllLanguages() {
  const result = await fetchCustom("languages/all", {
    next: {
      tags: [tag],
    },
    cache: "force-cache",
  });

  return v.parse(resultSchema, result.data);
}
