"use server";

import { fetchCustom } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

export async function deleteFolder(folderId: string) {
  const result = await fetchCustom("folder/delete", {
    method: "DELETE",
    body: { id: folderId },
  });
  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message);
  }

  return v.parse(resultSchema, data);
}
