import { LanguageEnum } from "@/shared/enums/Language";
import * as locales from "./locales";
import { CommonType } from "./locales/en/common";

type Result = Record<LanguageEnum, { common: CommonType }>;

export function getLocales(): Result {
  return {
    en: {
      common: locales.en,
    },
    uk: {
      common: locales.uk,
    },
  };
}
