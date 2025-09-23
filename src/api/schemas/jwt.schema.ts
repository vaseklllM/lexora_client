import * as v from "valibot";

export const jwtSchema = v.object({
  token: v.string(),
  refreshToken: v.string(),
  expiresIn: v.number(),
});

export type IJwt = v.InferOutput<typeof jwtSchema>;
