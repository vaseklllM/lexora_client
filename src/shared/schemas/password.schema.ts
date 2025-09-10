import * as v from "valibot";

const passwordRegexes = {
  minLength: 4,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
};
export const passwordSchema = () =>
  v.pipe(
    v.string(),
    v.nonEmpty("Please enter your Password."),
    v.minLength(
      passwordRegexes.minLength,
      `Password must be at least ${passwordRegexes.minLength} characters`,
    ),
    v.regex(
      passwordRegexes.uppercase,
      "Password must contain at least one uppercase letter",
    ),
    v.regex(
      passwordRegexes.lowercase,
      "Password must contain at least one lowercase letter",
    ),
    v.regex(
      passwordRegexes.number,
      "Password must contain at least one number",
    ),
  );
