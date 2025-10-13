"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { loginSchema } from "../schemas/login.schema";

type Args = {
  email: string;
  password: string;
};

export async function login(args: Args) {
  const result = await fetchCustom("auth/login", {
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
