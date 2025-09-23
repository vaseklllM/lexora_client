import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

export const userSchema = () =>
  v.object({
    id: idSchema(),
    name: v.pipe(v.string(), v.nonEmpty()),
    email: v.pipe(v.string(), v.nonEmpty(), v.email()),
    avatar: v.optional(v.pipe(v.string(), v.url())),
    createdAt: dateSchema(),
    updatedAt: dateSchema(),
  });
