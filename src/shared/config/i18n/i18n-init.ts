"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getOptions } from "./settings";
import { LIST_OF_LANGUAGES } from "../config";
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

let isInitialized = false;

export function initI18n() {
  if (isInitialized) {
    return i18next;
  }

  const runsOnServerSide = typeof window === "undefined";

  i18next.use(initReactI18next).init({
    ...getOptions(),
    resources,
    lng: undefined,
    interpolation: {
      escapeValue: false,
    },
    preload: runsOnServerSide ? LIST_OF_LANGUAGES.map((lng) => lng.i18n) : [],
  });

  isInitialized = true;
  return i18next;
}

initI18n();

export default i18next;
