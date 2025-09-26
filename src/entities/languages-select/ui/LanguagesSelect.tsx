import { Language } from "@/api/schemas/language.schema";
import {
  Select,
  SelectOptgroup,
  SelectOption,
  SelectProps,
} from "@/shared/ui/Select";
import { ReactElement, useMemo } from "react";

interface Props extends Omit<SelectProps, "options"> {
  className?: string;
  languages: Language[];
  disabledLanguages?: string[];
  actualLanguages?: Language[];
}

export const LanguagesSelect = (props: Props): ReactElement => {
  const { languages, disabledLanguages, actualLanguages, ...selectProps } =
    props;

  const { options, optgroups } = useMemo((): {
    options?: SelectOption[];
    optgroups?: SelectOptgroup[];
  } => {
    if (actualLanguages && actualLanguages.length > 0) {
      return {
        optgroups: [
          {
            id: "actual-languages",
            label: "Most used languages",
            options: actualLanguages.map((language) => ({
              label: `${language.iconSymbol} ${language.name} (${language.code})`,
              value: language.code,
              disabled: disabledLanguages?.includes(language.code),
            })),
          },
          {
            id: "other-languages",
            label: "Other languages",
            options: languages
              .filter(
                (language) =>
                  !actualLanguages.some(
                    (actualLanguage) => actualLanguage.code === language.code,
                  ),
              )
              .map((language) => ({
                label: `${language.iconSymbol} ${language.name} (${language.code})`,
                value: language.code,
                disabled: disabledLanguages?.includes(language.code),
              })),
          },
        ],
      };
    }

    return {
      options: languages.map((language) => ({
        label: `${language.iconSymbol} ${language.name} (${language.code})`,
        value: language.code,
        disabled: disabledLanguages?.includes(language.code),
      })),
    };
  }, [languages, disabledLanguages, actualLanguages]);

  return (
    <Select
      {...selectProps}
      options={options}
      optgroups={optgroups}
      className={props.className}
    />
  );
};
