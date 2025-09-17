import { ErrorStatus } from "@/shared/api-core/errorStatus";
import * as v from "valibot";

export const badRequestErrorSchema = <T extends string>(fields: T[]) =>
  v.object({
    message: v.array(v.string()),
    error: v.string(),
    statusCode: v.literal(ErrorStatus.BAD_REQUEST),
    errors: v.record(v.picklist(fields), v.array(v.string())),
  });
