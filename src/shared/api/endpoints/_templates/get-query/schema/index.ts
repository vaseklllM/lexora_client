import { languageSchema } from "@/shared/schemas/language.schema";
import * as v from "valibot";

export const allSchema = v.object({
  data: v.array(languageSchema()),
});
