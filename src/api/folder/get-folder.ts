"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { deckSchema } from "../schemas/deck.schema";
import { folderBreadcrumbSchema } from "../schemas/folder-breadcrumb.schema";
import { folderSchema } from "../schemas/folder.schema";

const resultSchema = v.object({
  ...folderSchema.entries,
  parentFolder: v.optional(folderSchema),
  breadcrumbs: v.array(folderBreadcrumbSchema),
  childFolders: v.array(folderSchema),
  childDecks: v.array(deckSchema),
});

const tag = "folder";

export async function getFolder(folderId: string) {
  const result = await fetchCustom(`folder/${folderId}`, {
    next: {
      tags: [tag],
    },
  });

  return v.parse(resultSchema, result.data);
}

export async function revalidateGetFolder() {
  revalidateTag(tag);
}
