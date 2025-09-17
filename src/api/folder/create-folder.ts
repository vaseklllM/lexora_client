"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/errors/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    name: v.string(),
    id: idSchema(),
  }),
  [conflictErrorSchema, badRequestErrorSchema(["name"])],
);

interface Args {
  name: string;
  parentFolderId?: string;
}

export async function createFolder(args: Args) {
  const result = await fetchCustom("folder/create", {
    method: "POST",
    body: args,
  });

  return v.parse(resultSchema, result);
}
