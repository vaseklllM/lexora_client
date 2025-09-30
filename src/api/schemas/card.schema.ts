import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

export enum Cefr {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

const masteryScoreSchema = v.pipe(v.number(), v.minValue(0), v.maxValue(100));

export const cardSchema = v.object({
  id: idSchema(),
  textInKnownLanguage: v.string(),
  textInLearningLanguage: v.string(),
  createdAt: dateSchema(),
  masteryScore: masteryScoreSchema,
  isNew: v.boolean(),
  descriptionInKnownLanguage: v.optional(v.string()),
  descriptionInLearningLanguage: v.optional(v.string()),
  soundUrls: v.array(
    v.pipe(
      v.string(),
      v.transform((input) => {
        if (input.startsWith("https://")) {
          return input;
        }

        return `${process.env.SYSTEM_NEXT_TTS_URL}/${input}`;
      }),
    ),
  ),
  cefr: v.optional(v.enum(Cefr)),
});

export type ICard = v.InferOutput<typeof cardSchema>;
