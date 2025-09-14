import * as v from "valibot";

export const noOnlySpacesStringSchema = (message?: string) =>
  v.pipe(
    v.string(),
    v.custom(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
      message,
    ),
  );
