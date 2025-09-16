"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import * as v from "valibot";
import { languageSchema } from "../schemas/language.schema";
// import { revalidateTag } from "next/cache";

const resultSchema = v.object({
  data: v.array(languageSchema),
});

const tag = `languages-all__${stackQueryKeys.next()}`;

export async function getAllLanguages() {
  const data = await fetchCustom("languages/all", {
    next: {
      tags: [tag],
    },
  });

  return v.parse(resultSchema, data);
}

// export async function revalidateGetAllLanguages() {
//   revalidateTag(tag);
// }
