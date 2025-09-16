"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

interface Args {
  newName: string;
  id: string;
}

export async function renameFolder(args: Args) {
  const result = await fetchCustom("folder/rename", {
    method: "PATCH",
    body: args,
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message);
  }

  return v.parse(resultSchema, data);
}
