import * as v from "valibot";
import { jwtSchema } from "./jwt.schema";
import { userSchema } from "./user.schema";

export const loginSchema = v.object({
  ...jwtSchema.entries,
  user: userSchema(),
});
