import * as v from "valibot";

export function resultErrorSchema<
  R extends v.ObjectSchema<any, any>,
  E extends v.ObjectSchema<any, any>[],
>(dataSchema: R, errorSchemas: E) {
  return v.variant("ok", [
    v.object({
      ok: v.literal(true),
      data: dataSchema,
    }),
    v.object({
      ok: v.literal(false),
      data: v.variant("statusCode", errorSchemas),
    }),
  ]);
}
