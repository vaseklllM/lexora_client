import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { mixArray } from "@/shared/utils/mixArray";
import { sleep } from "@/shared/utils/sleep";
import { useCallback, useMemo, useState } from "react";

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

  const nextCard = useCallback(
    async (newFinishedCards: string[]) => {
      if (newFinishedCards.length === cards.length) {
        onFinish?.();
        return;
      }
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

      if (activeCardIdx === activeCards.length - 1 || activeCardIdx === -1) {
        setActiveCardId(activeCards[0]!.id);
      } else {
        setActiveCardId(activeCards[activeCardIdx + 1].id);
      }

      setIsVisibleCards(true);
      await sleep(150);
    },
    [
      cards.length,
      mixedCards,
      activeCardId,
      setIsVisibleCards,
      onBlurWordDescription,
      setIsBlurTranslation,
      setIsTimerExpired,
      setIsUserShowedTranslation,
      finishedCards,
    ],
  );

  const forgotCard = useCallback(() => {
    player.stop();
    nextCard(finishedCards);
  }, [nextCard, finishedCards]);

  const recalledCard = useCallback(() => {
    player.stop();
    const newFinishedCards = finishedCards.includes(card.id)
      ? finishedCards
      : [...finishedCards, card.id];
    setFinishedCards(newFinishedCards);
    nextCard(newFinishedCards);
  }, [card.id, nextCard, setFinishedCards, finishedCards]);

  return {
    card,
    forgotCard,
    recalledCard,
    isVisibleCards,
  };
}
