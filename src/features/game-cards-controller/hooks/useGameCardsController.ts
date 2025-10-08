import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useState } from "react";

interface Result {
  active: ICard;
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
        let activeCardIdx = prevState.activeCardIdx + 1;

        if (!isGuessed) {
          if (prevState.activeCardIdx === prevState.cards.length) {
            activeCardIdx = 0;
          }

          return {
            ...prevState,
            activeCardIdx,
            activeCard: prevState.cards[activeCardIdx]!,
          };
        }

        if (activeCardIdx === prevState.cards.length) {
          props.onFinish?.();
          return prevState;
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

        return {
          ...prevState,
          cards,
          finishedCards,
          activeCard: cards[prevState.activeCardIdx]!,
        };
      });
    },
    [setState, props.onFinish],
  );

  return {
    active: state.activeCard,
    next,
  };
}
