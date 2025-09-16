import * as v from "valibot";
import { languageSchema } from "../../../schemas/language.schema";

export const allSchema = v.object({
  data: v.array(languageSchema),
});
