import { ICard } from "@/api/schemas/card.schema";
import { useCallback, useMemo, useState } from "react";

const CARDS_PER_PART = 5;

type Props = {
  cards: ICard[];
  onFinish?: () => void;
};

export type FinishCardHandler = (card: ICard) => void;

export interface UseSliceCardsResult {
  cards: ICard[];
  nextPart: () => void;
  finishCard: FinishCardHandler;
}

export function useSliceCards(props: Props): UseSliceCardsResult {
  const [part, setPart] = useState<number>(1);

  const activePartCards = useMemo(
    () => props.cards.slice((part - 1) * CARDS_PER_PART, part * CARDS_PER_PART),
    [props.cards, part],
  );

  const nextPartHandler = useCallback(() => {
    if (part * CARDS_PER_PART >= props.cards.length) {
      props.onFinish?.();
      return;
    }

    setPart((prev) => prev + 1);
  }, [props.cards, part, props.onFinish]);

  const finishCard = useCallback<FinishCardHandler>((card: ICard) => {
    return card;
  }, []);

  return {
    cards: activePartCards,
    nextPart: nextPartHandler,
    finishCard,
  };
}
