import * as v from "valibot";

export const deleteDeckSchema = v.object({
  message: v.string(),
});
