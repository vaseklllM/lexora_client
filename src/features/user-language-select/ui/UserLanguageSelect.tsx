"use client";

import { Language } from "@/api/schemas/language.schema";
import { Select, SelectOption } from "@/shared/ui/Select";
import { ReactElement, useCallback, useMemo } from "react";

interface Props {
  className?: string;
  allLanguages: Language[];
  userLanguage: Language;
}

export const UserLanguageSelect = (props: Props): ReactElement => {
  const options = useMemo<SelectOption[]>(() => {
    return props.allLanguages.map((language) => ({
      label: `${language.iconSymbol} ${language.nativeName}`,
      value: language.code,
    }));
  }, [props.allLanguages]);

  const changedLanguage = useCallback(() => {
    // console.log(value);
  }, []);

  return (
    <Select
      className="select-sm hidden sm:block"
      options={options}
      value={props.userLanguage.code}
      onChangeValue={changedLanguage}
    />
  );
};
