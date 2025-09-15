import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

export const createDeckSchema = v.object({
  name: v.string(),
  id: idSchema(),
});
