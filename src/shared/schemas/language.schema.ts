import * as v from "valibot";

export const languageSchema = () =>
  v.object({
    code: v.pipe(v.string(), v.nonEmpty(), v.length(2)),
    name: v.pipe(v.string(), v.nonEmpty()),
    nativeName: v.pipe(v.string(), v.nonEmpty()),
    iconSymbol: v.pipe(v.string(), v.nonEmpty()),
  });
