"use client";

import { LanguageEnum } from "@/shared/enums/Language";
import { createContext, ReactNode, useContext, useEffect } from "react";
import i18next from "./i18n-init";

const LanguageContext = createContext<LanguageEnum>(LanguageEnum.EN);

export function LanguageProvider({
  children,
  lng,
}: {
  children: ReactNode;
  lng: LanguageEnum;
}) {
  useEffect(() => {
    if (i18next.language !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <LanguageContext.Provider value={lng}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
