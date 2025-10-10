import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useEffect, useMemo, useState } from "react";

type CardMap = {
  isActive: boolean;
  status?: "finished" | "mistake";
  card: ICard;
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
  if (props.cards.length === 0) {
    throw new Error("Cards are not set");
  }

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
        cardsMap: cards.map(
          (card, idx): CardMap => ({
            isActive: idx === 0,
            status: undefined,
            card,
          }),
        ),
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
          const prevActiveCardIdx = prevState.activeCardIdx;
          let newActiveCardIdx = prevActiveCardIdx + 1;

          if (prevActiveCardIdx === prevState.cards.length - 1) {
            newActiveCardIdx = 0;
          }

          const activeCard = prevState.cards[newActiveCardIdx]!;

          return {
            ...prevState,
            activeCardIdx: newActiveCardIdx,
            activeCard,
            isMadeMistake: false,
            idx: prevState.idx + 1,
            cardsMap: prevState.cardsMap.map((map) => {
              if (map.card.id === activeCard.id) {
                return { ...map, isActive: true };
              }

              if (!map.isActive) return map;

              return { ...map, isActive: false, status: "mistake" };
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
            cardsMap: prevState.cardsMap.map((map) => {
              if (!map.isActive) return map;
              return { ...map, status: "finished" };
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
          cardsMap: prevState.cardsMap.map((map) => {
            if (map.card.id === activeCard.id) {
              return { ...map, isActive: true };
            }

            if (!map.isActive) return map;

            return { ...map, isActive: false, status: "finished" };
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

  const activeCard = useMemo(
    (): ICard => state.cardsMap.find((card) => card.isActive)!.card,
    [state.cardsMap, props.cards],
  );

  const isLastCard = useMemo(
    () => state.cardsMap.filter((map) => map.status !== "finished").length <= 1,
    [state.cardsMap],
  );

  return {
    active: activeCard,
    next,
    isLastCard,
    makeMistake,
    isMadeMistake: state.isMadeMistake,
    idx: state.idx,
    cardsMap: state.cardsMap,
  };
}
