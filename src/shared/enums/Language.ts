/**
 * App language enum
 *
 * We have two types of languages: App and User. App need to use for i18n and User need to use for language API
 */
export enum LanguageEnum {
  EN = "en",
  UK = "uk",
  ES = "es",
  FR = "fr",
  IT = "it",
  DE = "de",
  NL = "nl",
  PL = "pl",
}

export function languageEnumToCode(language: LanguageEnum): string {
  switch (language) {
    case LanguageEnum.EN:
      return "en-US";

    case LanguageEnum.UK:
      return "uk-UA";

    case LanguageEnum.ES:
      return "es-ES";

    case LanguageEnum.FR:
      return "fr-FR";

    case LanguageEnum.IT:
      return "it-IT";

    case LanguageEnum.DE:
      return "de-DE";

    case LanguageEnum.NL:
      return "nl-NL";

    case LanguageEnum.PL:
      return "pl-PL";

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

    case "es-ES":
      return LanguageEnum.ES;

    case "fr-FR":
      return LanguageEnum.FR;

    case "it-IT":
      return LanguageEnum.IT;

    case "de-DE":
      return LanguageEnum.DE;

    case "nl-NL":
      return LanguageEnum.NL;

    case "pl-PL":
      return LanguageEnum.PL;

    default:
      return;
  }
}
