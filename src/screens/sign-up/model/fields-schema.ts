import { emailSchema } from "@/shared/schemas/email.schema";
import { fullNameSchema } from "@/shared/schemas/fullName.schema";
import { passwordSchema } from "@/shared/schemas/password.schema";
import { passwordRepeatSchema } from "@/shared/schemas/passwordRepeat.schema";
import { TFunction } from "i18next";
import * as v from "valibot";

export const fieldsSchema = (t: TFunction) =>
  v.pipe(
    v.object({
      fullName: fullNameSchema(t),
      email: emailSchema(t),
      password: passwordSchema(t),
      passwordRepeat: passwordRepeatSchema(t),
    }),
    v.forward(
      v.partialCheck(
        [["password"], ["passwordRepeat"]],
        (input) => input.password === input.passwordRepeat,
        t("schemas.passwordRepeat.notMatch"),
      ),
      ["passwordRepeat"],
    ),
  );

export type Fields = v.InferOutput<ReturnType<typeof fieldsSchema>>;
