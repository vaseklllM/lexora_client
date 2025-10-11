"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import i18next from "./i18n-init";

type LanguageContextType = {
  lng: string;
};

const LanguageContext = createContext<LanguageContextType>({ lng: "en" });

export function LanguageProvider({
  children,
  lng,
}: {
  children: ReactNode;
  lng: string;
}) {
  useEffect(() => {
    if (i18next.language !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <LanguageContext.Provider value={{ lng }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
