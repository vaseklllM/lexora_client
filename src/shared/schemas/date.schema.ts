import * as v from "valibot";

export const dateSchema = () =>
  v.pipe(
    v.string(),
    v.nonEmpty(),
    v.transform((input) => new Date(input)),
    v.date(),
  );
