import { Language } from "@/api/schemas/language.schema";
import { getDifferentLanguages } from ".";

const en: Language = {
  code: "en",
  name: "English",
  nativeName: "English",
  iconSymbol: "🇺🇸",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
};

const fr: Language = {
  code: "fr",
  name: "French",
  nativeName: "Français",
  iconSymbol: "🇫🇷",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
};

const de: Language = {
  code: "de",
  name: "German",
  nativeName: "Deutsch",
  iconSymbol: "🇩🇪",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
};
const es: Language = {
  code: "es",
  name: "Spanish",
  nativeName: "Español",
  iconSymbol: "🇪🇸",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
};

const uk: Language = {
  code: "uk",
  name: "Ukrainian",
  nativeName: "Українська",
  iconSymbol: "🇺🇦",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
};

const la: Language = {
  code: "la",
  name: "Latin",
  nativeName: "Latin",
  iconSymbol: "🇱🇻",
  isSupportGoogleTtsVoiceFemaleGender: true,
  isSupportGoogleTtsVoiceMaleGender: false,
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
    {
      languagesWhatIKnow: [en],
      languagesWhatILearn: [de],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: en.code,
        languageWhatILearnCode: de.code,
      },
    },
    {
      languagesWhatIKnow: [en],
      languagesWhatILearn: [en, de],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: en.code,
        languageWhatILearnCode: de.code,
      },
    },
    {
      languagesWhatIKnow: [fr, de],
      languagesWhatILearn: [en],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: fr.code,
        languageWhatILearnCode: en.code,
      },
    },
    {
      languagesWhatIKnow: [fr, en],
      languagesWhatILearn: [es],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: fr.code,
        languageWhatILearnCode: es.code,
      },
    },
    {
      languagesWhatIKnow: [fr, en],
      languagesWhatILearn: [fr, es],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: fr.code,
        languageWhatILearnCode: es.code,
      },
    },
    {
      languagesWhatIKnow: [fr, en],
      languagesWhatILearn: [fr],
      allLanguages: [en, fr, de, es, uk, la],
      expected: {
        languageWhatIKnowCode: fr.code,
        languageWhatILearnCode: en.code,
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
