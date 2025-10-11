"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { userSchema } from "../schemas/user.schema";

const tag = "auth-me";

const responseSchema = userSchema();

export async function getMe() {
  const result = await fetchCustom("auth/me", {
    next: {
      tags: [tag],
    },
  });

  return v.parse(responseSchema, result.data);
}

export async function revalidateGetMe() {
  revalidateTag(tag);
}
