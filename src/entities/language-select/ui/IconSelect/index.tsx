import { ReactElement } from "react";
import { LanguageSelectProps } from "../LanguageSelect";

interface Props
  extends Pick<
    LanguageSelectProps,
    "languagesList" | "onChangeLanguage" | "activeLanguageCode"
  > {
  className?: string;
}

export const IconSelect = (props: Props): ReactElement => {
  return <div className={props.className}>IconSelect</div>;
};
