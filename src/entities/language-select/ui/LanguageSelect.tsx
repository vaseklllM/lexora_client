"use client";

import { Language } from "@/api/schemas/language.schema";
import { LIST_OF_LANGUAGES } from "@/shared/config/config";
import { Select, SelectOption } from "@/shared/ui/Select";
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "min-w-50",
  },
});

export type LanguageSelectType = "select" | "icon_button";

interface LanguageSelectProps {
  className?: string;
  languagesList: Language[];
  activeLanguageCode: string;
  onChangeLanguage?: (language: string) => void;
  name?: string;
  type: LanguageSelectType;
}

export const LanguageSelect = (props: LanguageSelectProps): ReactElement => {
  const classes = classesSlots();

  const options = useMemo<SelectOption[]>(() => {
    return props.languagesList
      .filter((language) =>
        LIST_OF_LANGUAGES.map((lng) => lng.code).includes(language.code),
      )
      .map((language) => ({
        label: `${language.iconSymbol} ${language.nativeName} (${language.code})`,
        value: language.code,
      }));
  }, [props.languagesList]);

  return (
    <Select
      className={classes.base({ className: props.className })}
      options={options}
      value={props.activeLanguageCode}
      onChangeValue={props.onChangeLanguage}
      name={props.name}
    />
  );
};
