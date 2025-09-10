import * as v from "valibot";

export const fullNameSchema = () =>
  v.pipe(
    v.string(),
    v.nonEmpty("Please enter your Full Name."),
    v.minLength(3, "Full Name is too short."),
    v.check(
      (input) => input === input.trim(),
      "Full Name cannot have spaces at the beginning or end.",
    ),
    v.check(
      (input) => !/[!@#$%^&*()_+=[\]{};':"\\|,.<>?~]/.test(input),
      "Full Name cannot contain special characters.",
    ),
    v.check(
      (input) => !/-{2,}/.test(input),
      "Full Name cannot contain multiple consecutive hyphens.",
    ),
    v.check(
      (input) => !/[0-9]/.test(input),
      "Full Name cannot contain numbers.",
    ),
  );
