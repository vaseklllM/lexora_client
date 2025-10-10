import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useMemo } from "react";

export const useMixCards = (cards: ICard[]) => {
  return useMemo(() => mixArray(cards), []);
};
