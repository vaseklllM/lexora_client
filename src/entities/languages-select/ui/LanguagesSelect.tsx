import { Language } from "@/shared/api/endpoints/schemas/language.schema";
import { Select } from "@/shared/ui/Select";
import { ReactElement, useMemo, useState } from "react";

interface Props {
  className?: string;
  languages: Language[];
}

export const LanguagesSelect = (props: Props): ReactElement => {
  const [value, setValue] = useState(props.languages[0].code);

  const languages = useMemo(() => {
    return props.languages.map((language) => ({
      label: `${language.iconSymbol} ${language.name} (${language.code})`,
      value: language.code,
    }));
  }, [props.languages]);

  return <Select options={languages} value={value} onChange={setValue} />;
};
