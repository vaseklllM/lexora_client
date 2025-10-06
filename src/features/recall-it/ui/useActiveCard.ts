import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useActiveCard(cards: ICard[]) {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);

  const mixedCards = useMemo(() => mixArray(cards), [cards]);

  const card = mixedCards[activeCardIdx];

  useEffect(() => {
    setActiveCardIdx(0);
  }, [cards]);

  const forgotCard = useCallback(() => {}, []);
  const recalledCard = useCallback(() => {}, []);

  return {
    card,
    forgotCard,
    recalledCard,
  };
}
