import * as v from "valibot";

export const languageSchema = v.object({
  code: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  nativeName: v.pipe(v.string(), v.nonEmpty()),
  iconSymbol: v.pipe(v.string(), v.nonEmpty()),
  isSupportGoogleTtsVoiceFemaleGender: v.boolean(),
  isSupportGoogleTtsVoiceMaleGender: v.boolean(),
});

export type Language = v.InferOutput<typeof languageSchema>;
