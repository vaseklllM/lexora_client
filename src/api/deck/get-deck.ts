"use server";

import { fetchCustom } from "@/shared/api-core/fetchCustom";
import { idSchema } from "@/shared/schemas/id.schema";
import * as v from "valibot";

const resultSchema = v.object({
  id: idSchema(),
});

type Result = v.InferOutput<typeof resultSchema>;

export const getDeck = async (deckId: string): Promise<Result> => {
  const result = await fetchCustom(`deck/${deckId}`);

  // console.log(result.data);

  return v.parse(resultSchema, result.data);
};
