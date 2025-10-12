import { LanguageEnum } from "@/shared/enums/Language";

type Field = "card" | "deck" | "folder" | "user";

const enFieldsMap: Record<Field, [string, string]> = {
  card: ["card", "cards"],
  deck: ["deck", "decks"],
  folder: ["folder", "folders"],
  user: ["user", "users"],
};

const ukFieldsMap: Record<Field, [string, string, string]> = {
  card: ["картка", "картки", "карток"],
  deck: ["колода", "колоди", "колод"],
  folder: ["папка", "папки", "папок"],
  user: ["користувач", "користувачі", "користувачів"],
};

function getUkrainianPluralForm(value: number): 0 | 1 | 2 {
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 0; // 1 картка, 21 картка, 31 картка
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return 1; // 2 картки, 3 картки, 4 картки, 22 картки
  }

  return 2; // 5 карток, 6 карток, 11 карток, 12 карток
}

export function countOf(
  value: number,
  field: Field,
  language: LanguageEnum,
): string {
  switch (language) {
    case LanguageEnum.EN:
      return `${value} ${value === 1 ? enFieldsMap[field][0] : enFieldsMap[field][1]}`;

    case LanguageEnum.UK: {
      const formIndex = getUkrainianPluralForm(value);
      return `${value} ${ukFieldsMap[field][formIndex]}`;
    }

    default: {
      const _check: never = language;
      throw new Error(`Unhandled language type: ${_check}`);
    }
  }
}
