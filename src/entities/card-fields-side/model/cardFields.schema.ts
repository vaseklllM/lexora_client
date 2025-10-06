import { CefrEnum } from "@/api/schemas/card.schema";
import {
  MAX_CARD_DESCRIPTION_LENGTH,
  MAX_CARD_WORD_LENGTH,
} from "@/shared/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import * as v from "valibot";

export const cardFieldsSchema = v.object({
  word: v.pipe(
    v.string(),
    noOnlySpacesStringSchema("Word is required"),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length >= 1,
      "Word is too short",
    ),
    v.maxLength(
      MAX_CARD_WORD_LENGTH,
      `Word cannot be longer than ${MAX_CARD_WORD_LENGTH} characters`,
    ),
  ),
  translation: v.pipe(
    v.string(),
    noOnlySpacesStringSchema("Translation is required"),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length >= 1,
      "Translation is too short",
    ),
    v.maxLength(
      MAX_CARD_WORD_LENGTH,
      `Translation cannot be longer than ${MAX_CARD_WORD_LENGTH} characters`,
    ),
  ),
  example: v.pipe(
    v.string(),
    v.maxLength(
      MAX_CARD_DESCRIPTION_LENGTH,
      `Example cannot be longer than ${MAX_CARD_DESCRIPTION_LENGTH} characters`,
    ),
  ),
  exampleTranslation: v.pipe(
    v.string(),
    v.maxLength(
      MAX_CARD_DESCRIPTION_LENGTH,
      `Example translation cannot be longer than ${MAX_CARD_DESCRIPTION_LENGTH} characters`,
    ),
  ),
  cefr: v.enum(CefrEnum),
});

export type CardFields = v.InferOutput<typeof cardFieldsSchema>;
