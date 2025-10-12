import { CefrEnum } from "@/api/schemas/card.schema";
import {
  MAX_CARD_DESCRIPTION_LENGTH,
  MAX_CARD_WORD_LENGTH,
} from "@/shared/config/config";
import { noOnlySpacesStringSchema } from "@/shared/schemas/noOnlySpacesString.schema";
import { TFunction } from "i18next";
import * as v from "valibot";

export const cardFieldsSchema = (t: TFunction) =>
  v.object({
    word: v.pipe(
      v.string(),
      noOnlySpacesStringSchema(
        t("deck_section.card_fields_side.word.errors.required"),
      ),
      v.custom(
        (value): value is string =>
          typeof value === "string" && value.trim().length >= 1,
        t("deck_section.card_fields_side.word.errors.tooShort"),
      ),
      v.maxLength(
        MAX_CARD_WORD_LENGTH,
        t("deck_section.card_fields_side.word.errors.maxLength", {
          maxLength: MAX_CARD_WORD_LENGTH,
        }),
      ),
    ),
    translation: v.pipe(
      v.string(),
      noOnlySpacesStringSchema(
        t("deck_section.card_fields_side.translation.errors.required"),
      ),
      v.custom(
        (value): value is string =>
          typeof value === "string" && value.trim().length >= 1,
        t("deck_section.card_fields_side.translation.errors.tooShort"),
      ),
      v.maxLength(
        MAX_CARD_WORD_LENGTH,
        t("deck_section.card_fields_side.translation.errors.maxLength", {
          maxLength: MAX_CARD_WORD_LENGTH,
        }),
      ),
    ),
    example: v.pipe(
      v.string(),
      v.maxLength(
        MAX_CARD_DESCRIPTION_LENGTH,
        t("deck_section.card_fields_side.example.errors.maxLength", {
          maxLength: MAX_CARD_DESCRIPTION_LENGTH,
        }),
      ),
    ),
    exampleTranslation: v.pipe(
      v.string(),
      v.maxLength(
        MAX_CARD_DESCRIPTION_LENGTH,
        t(
          "deck_section.card_fields_side.example_translation.errors.maxLength",
          {
            maxLength: MAX_CARD_DESCRIPTION_LENGTH,
          },
        ),
      ),
    ),
    cefr: v.enum(CefrEnum),
  });

export type CardFields = v.InferOutput<ReturnType<typeof cardFieldsSchema>>;
