import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";
import { languageSchema } from "./language.schema";

export const deckSchema = v.object({
  id: idSchema(),
  name: v.string(),
  numberOfNewCards: v.number(),
  numberOfCardsInProgress: v.number(),
  numberOfCardsNeedToReview: v.number(),
  numberOfCards: v.number(),
  numberOfCardsLearned: v.number(),
  languageWhatIKnow: languageSchema,
  languageWhatILearn: languageSchema,
  masteryScore: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
});

export type IDeck = v.InferOutput<typeof deckSchema>;
