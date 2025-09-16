import { Language } from "@/api/schemas/language.schema";
import { Select, SelectProps } from "@/shared/ui/Select";
import { ReactElement, useMemo } from "react";

interface Props extends Omit<SelectProps, "options"> {
  className?: string;
  languages: Language[];
  disabledLanguages?: string[];
}

export const LanguagesSelect = (props: Props): ReactElement => {
  const { languages, disabledLanguages, ...selectProps } = props;

  const languagesOptions = useMemo(() => {
    return languages.map((language) => ({
      label: `${language.iconSymbol} ${language.name} (${language.code})`,
      value: language.code,
      disabled: disabledLanguages?.includes(language.code),
    }));
  }, [languages, disabledLanguages]);

  return (
    <Select
      {...selectProps}
      options={languagesOptions}
      className={props.className}
    />
  );
};
