import { ICard } from "@/api/schemas/card.schema";
import { useCallback, useMemo, useState } from "react";

const CARDS_PER_PART = 5;

type Props = {
  cards: ICard[];
  onFinish?: () => void;
  cardsPerPart?: number;
};

export type FinishCardHandler = (card: ICard) => void;

export interface UseSliceCardsResult {
  cards: ICard[];
  nextPart: () => void;
  finishCard: FinishCardHandler;
  numberOfFinishedCards: number;
  numberOfCards: number;
}

export function useSliceCards(props: Props): UseSliceCardsResult {
  const { cardsPerPart = CARDS_PER_PART } = props;
  const [part, setPart] = useState<number>(1);
  const [finishedCardIds, setFinishedCardIds] = useState<string[]>([]);

  const activePartCards = useMemo(
    () => props.cards.slice((part - 1) * cardsPerPart, part * cardsPerPart),
    [props.cards, part, cardsPerPart],
  );

  const nextPartHandler = useCallback(() => {
    if (part * cardsPerPart >= props.cards.length) {
      props.onFinish?.();
      return;
    }

    setPart((prev) => prev + 1);
  }, [props.cards, part, props.onFinish, cardsPerPart]);

  const finishCard = useCallback<FinishCardHandler>(
    (card: ICard) => {
      setFinishedCardIds((prev) =>
        prev.includes(card.id) ? prev : [...prev, card.id],
      );
    },
    [setFinishedCardIds],
  );

  return {
    cards: activePartCards,
    nextPart: nextPartHandler,
    finishCard,
    numberOfFinishedCards: finishedCardIds.length,
    numberOfCards: props.cards.length,
  };
}
