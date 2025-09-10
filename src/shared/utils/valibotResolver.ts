import { valibotResolver as valibotResolverHookForm } from "@hookform/resolvers/valibot";
import { FieldErrors } from "react-hook-form";
import * as v from "valibot";

// valibotResolverHookForm cant work with v.forward
export const valibotResolver: typeof valibotResolverHookForm = (
  schema: any,
) => {
  return async (values: any) => {
    try {
      const result = await v.parseAsync(schema, values);

      return { values: result, errors: {} };
    } catch (error) {
      if (v.isValiError(error)) {
        const fieldErrors: FieldErrors = {};

        // Process all issues including forwarded ones
        for (const issue of error.issues) {
          const path = issue.path?.map((p) => p.key).join(".") || "root";
          if (!fieldErrors[path]) {
            fieldErrors[path] = {
              type: issue.type || "validation",
              message: issue.message,
            };
          }
        }

        return {
          values: {},
          errors: fieldErrors,
        };
      }

      return {
        values: {},
        errors: {
          root: {
            type: "unknown",
            message: "An unknown error occurred",
          },
        },
      };
    }
  };
};
