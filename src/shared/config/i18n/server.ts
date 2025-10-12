"use server";

import { getAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getLocales } from "./getLocales";
import { getOptions } from "./settings";

const resources = getLocales();

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
