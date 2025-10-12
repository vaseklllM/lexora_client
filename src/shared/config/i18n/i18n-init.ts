"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { LIST_OF_LANGUAGES } from "../config";
import { getLocales } from "./getLocales";
import { getOptions } from "./settings";

const resources = getLocales();

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
