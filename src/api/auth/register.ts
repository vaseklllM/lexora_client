"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { loginSchema } from "../schemas/login.schema";

type Args = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export async function register(args: Args) {
  const result = await fetchCustom("auth/register", {
    method: "POST",
    useSession: false,
    body: args,
    skipUnauthorizedRedirect: true,
  });

  if (!result.ok) {
    throw new Error(JSON.stringify(result.data));
  }

  return v.parse(loginSchema, result.data);
}
