import * as v from "valibot";

export const passwordRepeatSchema = () =>
  v.pipe(v.string(), v.nonEmpty("Please enter repeat Password."));
