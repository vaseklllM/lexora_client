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
            options: actualLanguages.map((language) =>
              convertLanguageToOption(language, { disabledLanguages }),
            ),
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
              .map((language) =>
                convertLanguageToOption(language, { disabledLanguages }),
              ),
          },
        ],
      };
    }

    return {
      options: languages.map((language) =>
        convertLanguageToOption(language, { disabledLanguages }),
      ),
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

function convertLanguageToOption(
  language: Language,
  props: {
    disabledLanguages?: string[];
  },
): SelectOption {
  // const isSupportVoice =
  //   language.isSupportGoogleTtsVoiceFemaleGender ||
  //   language.isSupportGoogleTtsVoiceMaleGender;

  // const supportVoice = isSupportVoice ? "" : " 🔇";

  return {
    label: `${language.iconSymbol} ${language.nativeName} (${language.code})`,
    value: language.code,
    disabled: props.disabledLanguages?.includes(language.code),
  };
}
