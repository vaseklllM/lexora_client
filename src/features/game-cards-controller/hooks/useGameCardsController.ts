import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useEffect, useState } from "react";

interface GameCardsControllerResult {
  idx: number;
  active: ICard;
  isLastCard: boolean;
  next: (isGuessed: boolean) => void;
  // when user make mistake active card will be save in cards array
  makeMistake: () => void;
  isMadeMistake: boolean;
}

interface Props {
  cards: ICard[];
  onFinish?: () => void;
}

type TState = {
  idx: number;
  cards: ICard[];
  activeCard: ICard;
  activeCardIdx: number;
  finishedCards: ICard[];
  isMadeMistake: boolean;
  isFinished: boolean;
};

export function useGameCardsController(
  props: Props,
): GameCardsControllerResult {
  const [state, setState] = useState<TState>(
    ((): TState => {
      const cards = mixArray(props.cards);
      const activeCardIdx = 0;

      return {
        cards,
        activeCard: cards[activeCardIdx]!,
        activeCardIdx,
        finishedCards: [],
        isMadeMistake: false,
        isFinished: false,
        idx: 0,
      };
    })(),
  );

  const next = useCallback<GameCardsControllerResult["next"]>(
    (isGuessed) => {
      setState((prevState) => {
        if (!isGuessed || prevState.isMadeMistake) {
          let activeCardIdx = prevState.activeCardIdx + 1;

          if (prevState.activeCardIdx === prevState.cards.length - 1) {
            activeCardIdx = 0;
          }

          return {
            ...prevState,
            activeCardIdx,
            activeCard: prevState.cards[activeCardIdx]!,
            isMadeMistake: false,
            idx: prevState.idx + 1,
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
          return { ...prevState, isFinished: true };
        }

        return {
          ...prevState,
          cards,
          finishedCards,
          activeCardIdx,
          activeCard: cards[activeCardIdx]!,
          idx: prevState.idx + 1,
        };
      });
    },
    [setState, props.onFinish],
  );

  const makeMistake = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMadeMistake: true,
    }));
  }, [setState]);

  useEffect(() => {
    if (state.isFinished) {
      props.onFinish?.();
    }
  }, [state.isFinished, props.onFinish]);

  return {
    active: state.activeCard,
    next,
    isLastCard: state.cards.length <= 1,
    makeMistake,
    isMadeMistake: state.isMadeMistake,
    idx: state.idx,
  };
}
