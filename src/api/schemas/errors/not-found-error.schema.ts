import { ErrorStatus } from "@/shared/api-core/errorStatus";
import * as v from "valibot";

export const notFoundErrorSchema = v.object({
  message: v.string(),
  error: v.string(),
  statusCode: v.literal(ErrorStatus.NOT_FOUND),
});
