import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useEffect, useState } from "react";

type CardMap = Pick<ICard, "id"> & {
  isActive: boolean;
  status?: "finished" | "mistake";
};

export interface GameCardsControllerResult {
  idx: number;
  active: ICard;
  isLastCard: boolean;
  next: (isGuessed: boolean) => void;
  // when user make mistake active card will be save in cards array
  makeMistake: () => void;
  isMadeMistake: boolean;
  cardsMap: CardMap[];
}

export type GameCardsControllerFinishReviewCardHandler = (args: {
  card: ICard;
  isGuessed: boolean;
}) => void;

type Props = {
  cards: ICard[];
  onFinish?: () => void;
  onFinishReviewCard?: GameCardsControllerFinishReviewCardHandler;
};

type TState = {
  idx: number;
  cards: ICard[];
  activeCard: ICard;
  activeCardIdx: number;
  finishedCards: ICard[];
  isMadeMistake: boolean;
  isFinished: boolean;
  cardsMap: CardMap[];
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
        cardsMap: cards.map((card, idx) => ({
          id: card.id,
          isActive: idx === 0,
          status: undefined,
        })),
      };
    })(),
  );

  const next = useCallback<GameCardsControllerResult["next"]>(
    (isGuessed) => {
      props.onFinishReviewCard?.({
        card: state.activeCard,
        isGuessed: state.isMadeMistake ? false : isGuessed,
      });

      setState((prevState) => {
        if (!isGuessed || prevState.isMadeMistake) {
          let activeCardIdx = prevState.activeCardIdx + 1;

          if (prevState.activeCardIdx === prevState.cards.length - 1) {
            activeCardIdx = 0;
          }

          const activeCard = prevState.cards[activeCardIdx]!;

          return {
            ...prevState,
            activeCardIdx,
            activeCard,
            isMadeMistake: false,
            idx: prevState.idx + 1,
            cardsMap: prevState.cardsMap.map((card) => {
              if (card.id === activeCard.id) {
                return { ...card, isActive: true };
              }

              if (card.id === prevState.activeCard.id) {
                return { ...card, isActive: false, status: "mistake" };
              }

              return card;
            }),
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

        const activeCard = cards[activeCardIdx]!;

        if (cards.length === 0) {
          return {
            ...prevState,
            isFinished: true,
            finishedCards,
            cardsMap: prevState.cardsMap.map((card) => {
              if (card.id === prevState.activeCard.id) {
                return { ...card, isActive: true, status: "finished" };
              }

              return card;
            }),
          };
        }

        return {
          ...prevState,
          cards,
          finishedCards,
          activeCardIdx,
          activeCard,
          idx: prevState.idx + 1,
          cardsMap: prevState.cardsMap.map((card) => {
            if (card.id === activeCard.id) {
              return { ...card, isActive: true };
            }

            if (card.id === prevState.activeCard.id) {
              return { ...card, isActive: false, status: "finished" };
            }

            return card;
          }),
        };
      });
    },
    [setState, props.onFinishReviewCard, state.activeCard, state.isMadeMistake],
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
    cardsMap: state.cardsMap,
  };
}
