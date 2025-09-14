import { idSchema } from "@/shared/schemas/id.schema";
import { languageSchema } from "@/shared/schemas/language.schema";
import * as v from "valibot";

export const deckSchema = v.object({
  id: idSchema(),
  name: v.string(),
  numberOfNewCards: v.number(),
  numberOfCardsInProgress: v.number(),
  numberOfCardsNeedToReview: v.number(),
  numberOfCards: v.number(),
  numberOfCardsLearned: v.number(),
  languageWhatIKnow: languageSchema(),
  languageWhatILearn: languageSchema(),
});

export type IDeck = v.InferOutput<typeof deckSchema>;
