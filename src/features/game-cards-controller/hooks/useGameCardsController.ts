import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useState } from "react";

interface Result {
  active: ICard;
  isLastCard: boolean;
  next: (isGuessed: boolean) => void;
}

interface Props {
  cards: ICard[];
  onFinish?: () => void;
}

type TState = {
  cards: ICard[];
  activeCard: ICard;
  activeCardIdx: number;
  finishedCards: ICard[];
};

export function useGameCardsController(props: Props): Result {
  const [state, setState] = useState<TState>(
    ((): TState => {
      const cards = mixArray(props.cards);
      const activeCardIdx = 0;

      return {
        cards,
        activeCard: cards[activeCardIdx]!,
        activeCardIdx,
        finishedCards: [],
      };
    })(),
  );

  const next = useCallback<Result["next"]>(
    (isGuessed) => {
      setState((prevState) => {
        if (!isGuessed) {
          let activeCardIdx = prevState.activeCardIdx + 1;

          if (prevState.activeCardIdx === prevState.cards.length - 1) {
            activeCardIdx = 0;
          }

          return {
            ...prevState,
            activeCardIdx,
            activeCard: prevState.cards[activeCardIdx]!,
          };
        }

        let activeCardIdx = prevState.activeCardIdx;

        if (activeCardIdx === prevState.cards.length - 1) {
          activeCardIdx = 0;
        }

        const finishedCards = prevState.finishedCards.some(
          (card) => card.id === prevState.activeCard.id,
        )
          ? prevState.finishedCards
          : [...prevState.finishedCards, prevState.activeCard];

        const cards = prevState.cards.filter(
          (card) =>
            !finishedCards.some((finishedCard) => finishedCard.id === card.id),
        );

        if (cards.length === 0) {
          props.onFinish?.();
          return prevState;
        }

        return {
          ...prevState,
          cards,
          finishedCards,
          activeCardIdx,
          activeCard: cards[activeCardIdx]!,
        };
      });
    },
    [setState, props.onFinish],
  );

  return {
    active: state.activeCard,
    next,
    isLastCard: state.cards.length <= 1,
  };
}
