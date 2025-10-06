import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { sleep } from "@/shared/utils/sleep";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  cards: ICard[];
  onFinish?: () => void;
  onBlurWordDescription?: () => void;
  setIsBlurTranslation?: (isBlur: boolean) => void;
  setIsTimerExpired?: (isTimerExpired: boolean) => void;
  setIsUserShowedTranslation?: (isUserShowedTranslation: boolean) => void;
}

export function useActiveCard({
  cards,
  onFinish,
  onBlurWordDescription,
  setIsBlurTranslation,
  setIsTimerExpired,
  setIsUserShowedTranslation,
}: Props) {
  const mixedCards = useMemo(() => mixArray(cards), [cards]);

  const [finishedCards, setFinishedCards] = useState<string[]>([]);
  const [activeCardId, setActiveCardId] = useState<string>(mixedCards[0]!.id);
  const [isVisibleCards, setIsVisibleCards] = useState<boolean>(true);

  const card = mixedCards.find((card) => card.id === activeCardId)!;

  useEffect(() => {
    if (finishedCards.length === cards.length) {
      onFinish?.();
    }
  }, [finishedCards.length, cards.length, onFinish]);

  const nextCard = useCallback(async () => {
    setIsVisibleCards(false);
    onBlurWordDescription?.();
    setIsBlurTranslation?.(true);
    await sleep(150);

    const activeCards = mixedCards.filter(
      (card) => !finishedCards.includes(card.id),
    );

    const activeCardIdx = activeCards.findIndex(
      (card) => card.id === activeCardId,
    );

    setIsTimerExpired?.(false);
    setIsUserShowedTranslation?.(false);

    if (activeCardIdx === activeCards.length - 1) {
      setActiveCardId(activeCards[0]!.id);
    } else {
      setActiveCardId(activeCards[activeCardIdx + 1].id);
    }

    setIsVisibleCards(true);
    await sleep(150);
  }, [
    mixedCards,
    finishedCards,
    activeCardId,
    setIsVisibleCards,
    onBlurWordDescription,
    setIsBlurTranslation,
    setIsTimerExpired,
    setIsUserShowedTranslation,
  ]);

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
    isVisibleCards,
  };
}
