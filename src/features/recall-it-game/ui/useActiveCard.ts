import { ICard } from "@/api/schemas/card.schema";
import { useGameCardsController } from "@/features/game-cards-controller";
import { player } from "@/shared/hooks/usePlayer";
import { sleep } from "@/shared/utils/sleep";
import { useCallback } from "react";

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
  const cardsController = useGameCardsController({
    cards,
    onFinish,
  });

  const nextCard = useCallback(
    async (isGuessed: boolean) => {
      onBlurWordDescription?.();
      setIsBlurTranslation?.(true);
      await sleep(150);

      cardsController.next(isGuessed);

      setIsTimerExpired?.(false);
      setIsUserShowedTranslation?.(false);

      await sleep(150);
    },
    [
      cards.length,

      onBlurWordDescription,
      setIsBlurTranslation,
      setIsTimerExpired,
      setIsUserShowedTranslation,
      cardsController.next,
    ],
  );

  const forgotCard = useCallback(() => {
    player.stop();
    nextCard(false);
  }, [nextCard]);

  const recalledCard = useCallback(() => {
    player.stop();
    nextCard(true);
  }, [nextCard]);

  return {
    card: cardsController.active,
    forgotCard,
    recalledCard,
    idx: cardsController.idx,
  };
}
