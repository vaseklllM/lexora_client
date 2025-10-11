"use client";

import { Language } from "@/api/schemas/language.schema";
import { LanguageSelect, LanguageSelectType } from "@/entities/language-select";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  allLanguages: Language[];
  type: LanguageSelectType;
}

export const AppLanguageSelect = (props: Props): ReactElement => {
  const changedLanguage = useCallback(() => {
    // console.log(languageCode);
  }, []);

  return (
    <LanguageSelect
      className={props.className}
      languagesList={props.allLanguages}
      activeLanguageCode={props.allLanguages[0].code}
      onChangeLanguage={changedLanguage}
      name="userLanguage"
      type={props.type}
    />
  );
};
