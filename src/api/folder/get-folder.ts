"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { deckSchema } from "../schemas/deck.schema";
import { folderBreadcrumbSchema } from "../schemas/folder-breadcrumb.schema";
import { folderSchema } from "../schemas/folder.schema";

const resultSchema = v.object({
  id: idSchema(),
  name: v.string(),
  createdAt: dateSchema(),
  updatedAt: dateSchema(),
  numberOfCards: v.number(),
  breadcrumbs: v.array(folderBreadcrumbSchema),
  childFolders: v.array(folderSchema),
  childDecks: v.array(deckSchema),
});

const tag = `folder__${stackQueryKeys.next()}`;

export async function getFolder(folderId: string) {
  const data = await fetchCustom(`folder/${folderId}`, {
    next: {
      tags: [tag],
    },
  });

  return v.parse(resultSchema, data);
}

export async function revalidateGetFolder() {
  revalidateTag(tag);
}
