"use client";

import { Language } from "@/api/schemas/language.schema";
import { LanguageSelect, LanguageSelectType } from "@/entities/language-select";
import { codeToLanguageEnum } from "@/shared/enums/Language";
import { setAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import { useRouter } from "next/navigation";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  allLanguages: Language[];
  type: LanguageSelectType;
  activeLanguageCode: string;
}

export const AppLanguageSelect = (props: Props): ReactElement => {
  const router = useRouter();

  const changedLanguage = useCallback(
    async (languageCode: string) => {
      const language = codeToLanguageEnum(languageCode);
      if (!language) return;
      await setAppLanguageCookie(language);
      router.refresh();
    },
    [router],
  );

  return (
    <LanguageSelect
      className={props.className}
      languagesList={props.allLanguages}
      activeLanguageCode={props.activeLanguageCode}
      onChangeLanguage={changedLanguage}
      name="userLanguage"
      type={props.type}
    />
  );
};
