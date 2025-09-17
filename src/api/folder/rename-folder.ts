"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";
import { resultErrorSchema } from "../schemas/result-error.schema";

const resultSchema = resultErrorSchema(
  v.object({
    message: v.string(),
  }),
  [conflictErrorSchema, badRequestErrorSchema(["name"])],
);

interface Args {
  name: string;
  id: string;
}

export async function renameFolder(args: Args) {
  const result = await fetchCustom("folder/rename", {
    method: "PATCH",
    body: args,
  });

  return v.parse(resultSchema, result);
}
