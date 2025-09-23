"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { jwtSchema } from "../schemas/jwt.schema";

export async function refresh(refreshToken: string) {
  const result = await fetchCustom("auth/refresh", {
    method: "POST",
    useSession: false,
    body: {
      refreshToken,
    },
  });

  if (!result.ok) {
    throw new Error("Refresh token failed");
  }

  return v.parse(jwtSchema, result.data);
}
