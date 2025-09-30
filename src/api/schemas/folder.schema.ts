import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

export const folderSchema = v.object({
  id: idSchema(),
  name: v.string(),
  createdAt: dateSchema(),
  updatedAt: dateSchema(),
  numberOfCards: v.number(),
});

export type IFolder = v.InferOutput<typeof folderSchema>;
