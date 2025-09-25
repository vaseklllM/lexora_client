import { Language } from "@/api/schemas/language.schema";

export function getDifferentLanguages(args: {
  languagesWhatIKnow: Language[];
  languagesWhatILearn: Language[];
  allLanguages: Language[];
}): {
  languageWhatIKnowCode: string;
  languageWhatILearnCode: string;
} {
  const { languagesWhatIKnow, languagesWhatILearn, allLanguages } = args;

  const languageWhatIKnowCode =
    languagesWhatIKnow[0]?.code || allLanguages[0].code;

  return {
    languageWhatIKnowCode,
    languageWhatILearnCode: ((): string => {
      const firstUniqueLearnLanguage = languagesWhatILearn.find(
        ({ code }) => code !== languageWhatIKnowCode,
      );

      if (firstUniqueLearnLanguage) return firstUniqueLearnLanguage.code;

      const firstUniqueAllLanguage = allLanguages.find(
        ({ code }) => code !== languageWhatIKnowCode,
      )!;

      return firstUniqueAllLanguage.code;
    })(),
  };
}
