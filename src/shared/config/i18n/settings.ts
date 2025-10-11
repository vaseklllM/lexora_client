import { InitOptions } from "i18next";
import { LIST_OF_LANGUAGES } from "../config";

const fallbackLng = "en";
const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    supportedLngs: LIST_OF_LANGUAGES.map((lng) => lng.i18n),
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
