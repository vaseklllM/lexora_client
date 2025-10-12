import { TFunction } from "i18next";
import * as v from "valibot";

const passwordRegexes = {
  minLength: 4,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
};
export const passwordSchema = (t: TFunction) =>
  v.pipe(
    v.string(),
    v.nonEmpty(t("schemas.password.required")),
    v.minLength(
      passwordRegexes.minLength,
      t("schemas.password.minLength", { minLength: passwordRegexes.minLength }),
    ),
    v.regex(passwordRegexes.uppercase, t("schemas.password.uppercase")),
    v.regex(passwordRegexes.lowercase, t("schemas.password.lowercase")),
    v.regex(passwordRegexes.number, t("schemas.password.number")),
  );
