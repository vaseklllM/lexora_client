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

      return {
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

  const activeCard = useMemo(
    (): ICard => state.cardsMap.find((card) => card.isActive)!.card,
    [state.cardsMap, props.cards],
  );

  const next = useCallback<GameCardsControllerResult["next"]>(
    (isGuessed) => {
      props.onFinishReviewCard?.({
        card: activeCard,
        isGuessed: state.isMadeMistake ? false : isGuessed,
      });

      setState((prevState): TState => {
        if (!isGuessed || prevState.isMadeMistake) {
          const newActiveCardId = getNextActiveCardId(prevState.cardsMap);

          return {
            ...prevState,
            isMadeMistake: false,
            idx: prevState.idx + 1,
            cardsMap: prevState.cardsMap.map((map) => {
              if (map.card.id === newActiveCardId) {
                return { ...map, isActive: true };
              }

              if (map.isActive) {
                return { ...map, isActive: false, status: "mistake" };
              }
              return map;
            }),
          };
        }

        const newCardsMap = prevState.cardsMap.map((map): CardMap => {
          if (!map.isActive) return map;
          return { ...map, status: "finished" };
        });

        if (
          newCardsMap.filter((map) => map.status !== "finished").length === 0
        ) {
          return {
            ...prevState,
            isFinished: true,

            cardsMap: newCardsMap,
          };
        }

        const newActiveCardId = getNextActiveCardId(prevState.cardsMap);

        return {
          ...prevState,
          idx: prevState.idx + 1,
          cardsMap: prevState.cardsMap.map((map) => {
            if (map.card.id === newActiveCardId) {
              return { ...map, isActive: true };
            }

            if (!map.isActive) return map;

            return { ...map, isActive: false, status: "finished" };
          }),
        };
      });
    },
    [setState, props.onFinishReviewCard, state.isMadeMistake, activeCard],
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

function getNextActiveCardId(cardsMap: CardMap[]): string {
  const activeIdx = cardsMap.findIndex((map) => map.isActive);

  const activeCardInLastMap = cardsMap
    .slice(activeIdx + 1)
    .find((i) => i.status === undefined || i.status === "mistake");

  if (activeCardInLastMap) {
    return activeCardInLastMap.card.id;
  }

  const activeCard = cardsMap.find(
    (i) => i.status === undefined || i.status === "mistake",
  );

  if (activeCard) {
    return activeCard.card.id;
  }

  return cardsMap.find((i) => i.isActive)!.card.id;
}
