import { TFunction } from "i18next";
import * as v from "valibot";

export const fullNameSchema = (t: TFunction) =>
  v.pipe(
    v.string(),
    v.nonEmpty(t("schemas.fullName.required")),
    v.minLength(3, t("schemas.fullName.minLength")),
    v.check(
      (input) => input === input.trim(),
      t("schemas.fullName.noOnlySpaces"),
    ),
    v.check(
      (input) => !/[!@#$%^&*()_+=[\]{};':"\\|,.<>?~]/.test(input),
      t("schemas.fullName.specialCharacters"),
    ),
    v.check(
      (input) => !/-{2,}/.test(input),
      t("schemas.fullName.multipleConsecutiveHyphens"),
    ),
    v.check((input) => !/[0-9]/.test(input), t("schemas.fullName.numbers")),
  );
