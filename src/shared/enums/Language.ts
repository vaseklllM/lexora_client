/**
 * App language enum
 *
 * We have two types of languages: App and User. App need to use for i18n and User need to use for language API
 */
export enum LanguageEnum {
  EN = "en",
  UK = "uk",
}

export function languageEnumToCode(language: LanguageEnum): string {
  switch (language) {
    case LanguageEnum.EN:
      return "en-US";

    case LanguageEnum.UK:
      return "uk-UA";

    default: {
      const _check: never = language;
      throw new Error(`Unhandled language type: ${_check}`);
    }
  }
}

export function codeToLanguageEnum(code: string): LanguageEnum | undefined {
  switch (code) {
    case "en-US":
      return LanguageEnum.EN;

    case "uk-UA":
      return LanguageEnum.UK;

    default:
      return;
  }
}
