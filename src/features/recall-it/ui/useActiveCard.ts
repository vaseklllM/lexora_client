import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  cards: ICard[];
  onFinish?: () => void;
}

export function useActiveCard({ cards, onFinish }: Props) {
  const mixedCards = useMemo(() => mixArray(cards), [cards]);

  const [finishedCards, setFinishedCards] = useState<string[]>([]);
  const [activeCardId, setActiveCardId] = useState<string>(mixedCards[0]!.id);

  const card = mixedCards.find((card) => card.id === activeCardId)!;

  useEffect(() => {
    if (finishedCards.length === cards.length) {
      onFinish?.();
    }
  }, [finishedCards.length, cards.length, onFinish]);

  const nextCard = useCallback(() => {
    const activeCards = mixedCards.filter(
      (card) => !finishedCards.includes(card.id),
    );

    const activeCardIdx = activeCards.findIndex(
      (card) => card.id === activeCardId,
    );

    if (activeCardIdx === activeCards.length - 1) {
      setActiveCardId(activeCards[0]!.id);
    } else {
      setActiveCardId(activeCards[activeCardIdx + 1].id);
    }
  }, [mixedCards, finishedCards, activeCardId, onFinish, setFinishedCards]);

  const forgotCard = useCallback(() => {
    nextCard();
  }, [nextCard]);

  const recalledCard = useCallback(() => {
    setFinishedCards((prev) => {
      if (prev.includes(card.id)) {
        return prev;
      }
      return [...prev, card.id];
    });
    nextCard();
  }, [card.id, nextCard, setFinishedCards]);

  return {
    card,
    forgotCard,
    recalledCard,
  };
}
