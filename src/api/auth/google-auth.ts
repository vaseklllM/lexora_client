"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { loginSchema } from "../schemas/login.schema";

type Args = {
  email: string;
  name: string;
  accountId: string;
  idToken: string;
};

export async function googleAuth(args: Args) {
  const result = await fetchCustom("auth/google", {
    method: "POST",
    useSession: false,
    body: args,
  });

  if (!result.ok) {
    throw new Error("Failed to authenticate with Google");
  }

  return v.parse(loginSchema, result.data);
}
