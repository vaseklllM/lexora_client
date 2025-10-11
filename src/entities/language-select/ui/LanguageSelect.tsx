"use client";

import { Language } from "@/api/schemas/language.schema";
import { LIST_OF_LANGUAGES } from "@/shared/config/config";
import { Select, SelectOption } from "@/shared/ui/Select";
import { ReactElement, useMemo } from "react";
import { tv } from "tailwind-variants";
import { DropdownPosition, IconSelect } from "./IconSelect";

const classesSlots = tv({
  slots: {
    select: "min-w-50",
    iconSelect: "",
  },
});

export type LanguageSelectType = "select" | "icon_button";

export interface LanguageSelectProps {
  className?: string;
  languagesList: Language[];
  activeLanguageCode: string;
  onChangeLanguage?: (language: string) => void;
  name?: string;
  type: LanguageSelectType;
  dropdownPosition?: DropdownPosition;
}

export const LanguageSelect = (props: LanguageSelectProps): ReactElement => {
  const classes = classesSlots();

  const activeLanguage = useMemo<Language>(() => {
    return props.languagesList.find(
      (language) => language.code === props.activeLanguageCode,
    )!;
  }, [props.languagesList, props.activeLanguageCode]);

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

  switch (props.type) {
    case "select":
      return (
        <Select
          className={classes.select({ className: props.className })}
          options={options}
          value={props.activeLanguageCode}
          onChangeValue={props.onChangeLanguage}
          name={props.name}
        />
      );

    case "icon_button":
      return (
        <IconSelect
          options={options}
          activeLanguage={activeLanguage}
          onChangeLanguage={props.onChangeLanguage}
          className={classes.iconSelect({ className: props.className })}
          dropdownPosition={props.dropdownPosition}
        />
      );
  }
};
