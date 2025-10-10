import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useMemo, useState } from "react";

const CARDS_PER_PART = 5;

export function useCardsController(cards: ICard[]) {
  const [part, setPart] = useState<number>(1);

  const mixedCards = useMemo(() => mixArray(cards), []);

  const activePartCards = useMemo(
    () => mixedCards.slice(0, part * CARDS_PER_PART),
    [mixedCards, part],
  );

  const nextPartHandler = useCallback(() => {
    if (part * CARDS_PER_PART >= mixedCards.length) {
      return;
    }

    setPart((prev) => prev + 1);
  }, [mixedCards, part]);

  return {
    cards: activePartCards,
    onNextPart: nextPartHandler,
  };
}
