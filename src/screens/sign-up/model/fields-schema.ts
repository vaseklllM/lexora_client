import { emailSchema } from "@/shared/schemas/email.schema";
import { fullNameSchema } from "@/shared/schemas/fullName.schema";
import { passwordSchema } from "@/shared/schemas/password.schema";
import { passwordRepeatSchema } from "@/shared/schemas/passwordRepeat.schema";
import * as v from "valibot";

export const fieldsSchema = v.pipe(
  v.object({
    fullName: fullNameSchema(),
    email: emailSchema(),
    password: passwordSchema(),
    passwordRepeat: passwordRepeatSchema(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordRepeat"]],
      (input) => input.password === input.passwordRepeat,
      "The two passwords do not match.",
    ),
    ["passwordRepeat"],
  ),
);

export type Fields = v.InferOutput<typeof fieldsSchema>;
