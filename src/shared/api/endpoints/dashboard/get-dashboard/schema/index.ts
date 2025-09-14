import * as v from "valibot";
import { deckSchema } from "./deck.schema";
import { folderSchema } from "./folder.schema";

export const dashboardSchema = v.object({
  childFolders: v.array(folderSchema),
  childDecks: v.array(deckSchema),
});

export type IDashboard = v.InferOutput<typeof dashboardSchema>;
