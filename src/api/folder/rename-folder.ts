"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

interface Args {
  name: string;
  id: string;
}

export async function renameFolder(args: Args) {
  const data = await fetchCustom("folder/rename", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, data);
}
