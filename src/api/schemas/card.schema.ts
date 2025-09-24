import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

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
  nativeSoundUrls: v.array(v.string()),
});

export type ICard = v.InferOutput<typeof cardSchema>;
