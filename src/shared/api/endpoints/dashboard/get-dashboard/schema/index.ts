import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";
import { deckSchema } from "./deck.schema";

export const dashboardSchema = v.object({
  childFolders: v.array(
    v.object({
      id: idSchema(),
      name: v.string(),
      createdAt: dateSchema(),
      updatedAt: dateSchema(),
      numberOfCards: v.number(),
    }),
  ),
  childDecks: v.array(deckSchema),
});

export type IDashboard = v.InferOutput<typeof dashboardSchema>;
