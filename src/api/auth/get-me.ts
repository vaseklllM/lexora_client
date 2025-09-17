"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { stackQueryKeys } from "@/shared/api-core/stackQueryKeys";
import { dateSchema } from "@/shared/schemas/date.schema";
import { emailSchema } from "@/shared/schemas/email.schema";
import { fullNameSchema } from "@/shared/schemas/fullName.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import { revalidateTag } from "next/cache";
import * as v from "valibot";

const tag = `auth-me__${stackQueryKeys.next()}`;

const responseSchema = v.object({
  id: idSchema(),
  name: fullNameSchema(),
  email: emailSchema(),
  avatar: v.optional(v.string()),
  createdAt: dateSchema(),
  updatedAt: dateSchema(),
});

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
