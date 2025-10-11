"use client";

import { revalidateGetMe } from "@/api/auth/get-me";
import { Language } from "@/api/schemas/language.schema";
import { setUserLanguage } from "@/api/settings/set-user-language";
import { LanguageSelect, LanguageSelectType } from "@/entities/language-select";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  allLanguages: Language[];
  userLanguage: Language;
  type: LanguageSelectType;
}

export const UserLanguageSelect = (props: Props): ReactElement => {
  const changedLanguage = useCallback(async (languageCode: string) => {
    await setUserLanguage({
      languageCode,
    });
    // const languageEnum = codeToLanguageEnum(languageCode);
    // if (languageEnum) {
    //   await setAppLanguageCookie(languageEnum);
    // }
    await revalidateGetMe();
  }, []);

  return (
    <LanguageSelect
      className={props.className}
      languagesList={props.allLanguages}
      activeLanguageCode={props.userLanguage.code}
      onChangeLanguage={changedLanguage}
      name="userLanguage"
      type={props.type}
    />
  );
};
