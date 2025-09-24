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
  return {
    languageWhatIKnowCode: languagesWhatIKnow[0]?.code || allLanguages[0].code,
    languageWhatILearnCode:
      languagesWhatILearn[0]?.code || allLanguages[1].code,
  };
}
