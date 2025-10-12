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

const esFieldsMap: Record<Field, [string, string]> = {
  card: ["tarjeta", "tarjetas"],
  deck: ["mazo", "mazos"],
  folder: ["carpeta", "carpetas"],
  user: ["usuario", "usuarios"],
};

const frFieldsMap: Record<Field, [string, string]> = {
  card: ["carte", "cartes"],
  deck: ["paquet", "paquets"],
  folder: ["dossier", "dossiers"],
  user: ["utilisateur", "utilisateurs"],
};

const itFieldsMap: Record<Field, [string, string]> = {
  card: ["carta", "carte"],
  deck: ["mazzo", "mazzi"],
  folder: ["cartella", "cartelle"],
  user: ["utente", "utenti"],
};

const deFieldsMap: Record<Field, [string, string]> = {
  card: ["Karte", "Karten"],
  deck: ["Stapel", "Stapel"],
  folder: ["Ordner", "Ordner"],
  user: ["Benutzer", "Benutzer"],
};

const nlFieldsMap: Record<Field, [string, string]> = {
  card: ["kaart", "kaarten"],
  deck: ["stapel", "stapels"],
  folder: ["map", "mappen"],
  user: ["gebruiker", "gebruikers"],
};

const plFieldsMap: Record<Field, [string, string, string]> = {
  card: ["karta", "karty", "kart"],
  deck: ["talia", "talie", "talii"],
  folder: ["folder", "foldery", "folderów"],
  user: ["użytkownik", "użytkownicy", "użytkowników"],
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

function getPolishPluralForm(value: number): 0 | 1 | 2 {
  const lastDigit = value % 10;
  const lastTwoDigits = value % 100;

  if (value === 1) {
    return 0; // 1 karta
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return 1; // 2 karty, 3 karty, 4 karty
  }

  return 2; // 5 kart, 11 kart, 12 kart
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

    case LanguageEnum.ES:
      return `${value} ${value === 1 ? esFieldsMap[field][0] : esFieldsMap[field][1]}`;

    case LanguageEnum.FR:
      return `${value} ${value === 0 || value === 1 ? frFieldsMap[field][0] : frFieldsMap[field][1]}`;

    case LanguageEnum.IT:
      return `${value} ${value === 1 ? itFieldsMap[field][0] : itFieldsMap[field][1]}`;

    case LanguageEnum.DE:
      return `${value} ${value === 1 ? deFieldsMap[field][0] : deFieldsMap[field][1]}`;

    case LanguageEnum.NL:
      return `${value} ${value === 1 ? nlFieldsMap[field][0] : nlFieldsMap[field][1]}`;

    case LanguageEnum.PL: {
      const formIndex = getPolishPluralForm(value);
      return `${value} ${plFieldsMap[field][formIndex]}`;
    }

    default: {
      const _check: never = language;
      throw new Error(`Unhandled language type: ${_check}`);
    }
  }
}
