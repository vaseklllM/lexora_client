"use server";

import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

import { getAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import enCommon from "./locales/en/common.json";
import ukCommon from "./locales/uk/common.json";

const resources = {
  en: {
    common: enCommon,
  },
  uk: {
    common: ukCommon,
  },
};

async function initI18next(lng: string) {
  const i18nInstance = createInstance();
  await i18nInstance.use(initReactI18next).init({
    ...getOptions(lng),
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
  return i18nInstance;
}

export async function getTranslation() {
  const language = await getAppLanguageCookie();
  const i18nextInstance = await initI18next(language);

  return {
    t: i18nextInstance.getFixedT(language),
    i18n: i18nextInstance,
  };
}
