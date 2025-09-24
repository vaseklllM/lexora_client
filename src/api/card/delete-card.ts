"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import * as v from "valibot";

const resultSchema = v.object({
  message: v.string(),
});

type Result = v.InferOutput<typeof resultSchema>;

export const deleteCard = async (cardId: string): Promise<Result> => {
  const result = await fetchCustom(`card/${cardId}`, {
    method: "DELETE",
  });

  return v.parse(resultSchema, result.data);
};
