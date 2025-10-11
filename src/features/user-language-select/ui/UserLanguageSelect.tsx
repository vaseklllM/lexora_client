"use client";

import { revalidateGetMe } from "@/api/auth/get-me";
import { Language } from "@/api/schemas/language.schema";
import { setUserLanguage } from "@/api/settings/set-user-language";
import { LIST_OF_LANGUAGES } from "@/shared/config/config";
import { Select, SelectOption } from "@/shared/ui/Select";
import { ReactElement, useCallback, useMemo } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "min-w-50",
  },
});

interface Props {
  className?: string;
  allLanguages: Language[];
  userLanguage: Language;
}

export const UserLanguageSelect = (props: Props): ReactElement => {
  const classes = classesSlots();

  const options = useMemo<SelectOption[]>(() => {
    return props.allLanguages
      .filter((language) =>
        LIST_OF_LANGUAGES.map((lng) => lng.code).includes(language.code),
      )
      .map((language) => ({
        label: `${language.iconSymbol} ${language.nativeName} (${language.code})`,
        value: language.code,
      }));
  }, [props.allLanguages]);

  const changedLanguage = useCallback(async (languageCode: string) => {
    await setUserLanguage({
      languageCode,
    });
    await revalidateGetMe();
  }, []);

  return (
    <Select
      className={classes.base({ className: props.className })}
      options={options}
      value={props.userLanguage.code}
      onChangeValue={changedLanguage}
      name="userLanguage"
    />
  );
};
