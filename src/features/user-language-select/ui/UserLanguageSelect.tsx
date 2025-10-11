"use client";

import { revalidateGetMe } from "@/api/auth/get-me";
import { Language } from "@/api/schemas/language.schema";
import { setUserLanguage } from "@/api/settings/set-user-language";
import {
  DropdownPosition,
  LanguageSelect,
  LanguageSelectType,
} from "@/entities/language-select";
import { codeToLanguageEnum } from "@/shared/enums/Language";
import { setAppLanguageCookie } from "@/shared/utils/setAppLanguageCookie";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  allLanguages: Language[];
  userLanguage: Language;
  type: LanguageSelectType;
  dropdownPosition?: DropdownPosition;
}

export const UserLanguageSelect = (props: Props): ReactElement => {
  const changedLanguage = useCallback(async (languageCode: string) => {
    await setUserLanguage({
      languageCode,
    });
    const languageEnum = codeToLanguageEnum(languageCode);
    if (languageEnum) {
      await setAppLanguageCookie(languageEnum);
    }
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
      dropdownPosition={props.dropdownPosition}
    />
  );
};
