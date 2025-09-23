"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";
import { jwtSchema } from "../schemas/jwt.schema";
import { userSchema } from "../schemas/user.schema";

const responseSchema = v.object({
  ...jwtSchema.entries,
  user: userSchema(),
});

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
  });

  if (!result.ok) {
    throw new Error(JSON.stringify(result.data));
  }

  return v.parse(responseSchema, result.data);
}
