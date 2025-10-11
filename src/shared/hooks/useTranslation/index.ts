import { useLanguage } from "@/shared/config/i18n";
import { useTranslation as useTranslationOrg } from "react-i18next";

export function useTranslation(ns?: string) {
  const { lng } = useLanguage();

  return useTranslationOrg(ns, { lng });
}
