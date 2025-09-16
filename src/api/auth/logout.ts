"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { dateSchema } from "@/shared/schemas/date.schema";
import * as v from "valibot";

const responseSchema = v.object({
  message: v.string(),
  loggedOutAt: dateSchema(),
});

export async function logout() {
  const data = await fetchCustom("auth/logout", {
    method: "POST",
  });

  return v.parse(responseSchema, data);
}
