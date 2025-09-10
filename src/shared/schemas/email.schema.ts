import * as v from "valibot";

export const emailSchema = () =>
  v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("Invalid email format."),
    v.pipe(v.string(), v.toLowerCase()),
  );
