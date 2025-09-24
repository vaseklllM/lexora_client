import { Language } from "@/api/schemas/language.schema";
import { getDifferentLanguages } from ".";

const en: Language = {
  code: "en",
  name: "English",
  nativeName: "English",
  iconSymbol: "🇺🇸",
};
const fr: Language = {
  code: "fr",
  name: "French",
  nativeName: "Français",
  iconSymbol: "🇫🇷",
};
const de: Language = {
  code: "de",
  name: "German",
  nativeName: "Deutsch",
  iconSymbol: "🇩🇪",
};
const es: Language = {
  code: "es",
  name: "Spanish",
  nativeName: "Español",
  iconSymbol: "🇪🇸",
};
const uk: Language = {
  code: "uk",
  name: "Ukrainian",
  nativeName: "Українська",
  iconSymbol: "🇺🇦",
};
const la: Language = {
  code: "la",
  name: "Latin",
  nativeName: "Latin",
  iconSymbol: "🇱🇻",
};

describe("getDifferentLanguages", () => {
  it.each<{
    languagesWhatIKnow: Language[];
    languagesWhatILearn: Language[];
    allLanguages: Language[];
    expected: { languageWhatIKnowCode: string; languageWhatILearnCode: string };
  }>([
    {
      languagesWhatIKnow: [],
      languagesWhatILearn: [],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: en.code,
        languageWhatILearnCode: fr.code,
      },
    },
  ])("should return the correct languages", (args) => {
    expect(
      getDifferentLanguages({
        allLanguages: args.allLanguages,
        languagesWhatIKnow: args.languagesWhatIKnow,
        languagesWhatILearn: args.languagesWhatILearn,
      }),
    ).toEqual(args.expected);
  });
});
