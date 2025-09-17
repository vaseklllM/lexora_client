"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { badRequestErrorSchema } from "../schemas/errors/bad-request-error.schema";
import { conflictErrorSchema } from "../schemas/errors/conflict-error.schema";

const resultSchema = v.variant("ok", [
  v.object({
    ok: v.literal(true),
    data: v.object({
      message: v.string(),
    }),
  }),
  v.object({
    ok: v.literal(false),
    data: v.variant("statusCode", [
      conflictErrorSchema,
      badRequestErrorSchema(["name"]),
    ]),
  }),
]);

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
