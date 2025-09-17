"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

const resultSchema = v.object({
  name: v.string(),
  id: idSchema(),
});

interface Args {
  name: string;
  parentFolderId?: string;
}

export async function createFolder(args: Args) {
  const result = await fetchCustom("folder/create", {
    method: "POST",
    body: args,
  });

  return v.parse(resultSchema, result.data);
}
