import { TFunction } from "i18next";
import * as v from "valibot";

export const passwordRepeatSchema = (t: TFunction) =>
  v.pipe(v.string(), v.nonEmpty(t("schemas.passwordRepeat.required")));
