import { TFunction } from "i18next";
import * as v from "valibot";

export const emailSchema = (t: TFunction) =>
  v.pipe(
    v.string(),
    v.nonEmpty(t("schemas.email.required")),
    v.email(t("schemas.email.invalid")),
    v.pipe(v.string(), v.toLowerCase()),
  );
