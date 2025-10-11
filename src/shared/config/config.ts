import { LanguageEnum, languageEnumToCode } from "../enums/Language";

/**
 * The maximum length of a folder name
 */
export const MAX_FOLDER_NAME_LENGTH = 50;

/**
 * The maximum length of a deck name
 */
export const MAX_DECK_NAME_LENGTH = 50;

/**
 * The maximum length of a word in a card
 */
export const MAX_CARD_WORD_LENGTH = 100;

/**
 * The maximum length of a description in a card
 */
export const MAX_CARD_DESCRIPTION_LENGTH = 100;

/**
 * The list of supported languages
 */
export const LIST_OF_LANGUAGES: { i18n: LanguageEnum; code: string }[] = [
  LanguageEnum.EN,
  LanguageEnum.UK,
].map((language) => ({
  i18n: language,
  code: languageEnumToCode(language),
}));
