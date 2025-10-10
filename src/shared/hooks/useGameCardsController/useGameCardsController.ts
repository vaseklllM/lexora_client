import { ICard } from "@/api/schemas/card.schema";
import { CardMap } from "@/entities/repeat-cards-status-bar";
import { useCallback, useMemo, useState } from "react";

type CustomCardMap = {
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
  cardsMap: CustomCardMap[];
};

export function useGameCardsController(
  props: Props,
): GameCardsControllerResult {
  if (props.cards.length === 0) {
    throw new Error("Cards are not set");
  }

  const [state, setState] = useState<TState>(
    ((): TState => {
      return {
        isMadeMistake: false,
        idx: 0,
        cardsMap: props.cards.map(
          (card, idx): CustomCardMap => ({
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

      const newActiveCardId = getNextActiveCardId(state.cardsMap);

      if (!isGuessed || state.isMadeMistake) {
        setState((prevState) => ({
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
        }));
      } else {
        const newCardsMap = state.cardsMap.map((map): CustomCardMap => {
          if (!map.isActive) return map;
          return { ...map, status: "finished" };
        });

        if (
          newCardsMap.filter((map) => map.status !== "finished").length === 0
        ) {
          setState((prevState) => ({
            ...prevState,
            cardsMap: newCardsMap,
          }));
          props.onFinish?.();
        } else {
          setState((prevState) => ({
            ...prevState,
            idx: prevState.idx + 1,
            cardsMap: prevState.cardsMap.map((map) => {
              if (map.card.id === newActiveCardId) {
                return { ...map, isActive: true };
              }

              if (!map.isActive) return map;

              return { ...map, isActive: false, status: "finished" };
            }),
          }));
        }
      }
    },
    [setState, props.onFinishReviewCard, props.onFinish, state, activeCard],
  );

  const makeMistake = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isMadeMistake: true,
    }));
  }, [setState]);

  const isLastCard = useMemo(
    () => state.cardsMap.filter((map) => map.status !== "finished").length <= 1,
    [state.cardsMap],
  );

  const cardsMap = useMemo(
    () =>
      state.cardsMap.map(
        (map): CardMap => ({
          id: map.card.id,
          isActive: map.isActive,
          status: map.status,
        }),
      ),
    [state.cardsMap],
  );

  return {
    active: activeCard,
    next,
    isLastCard,
    makeMistake,
    isMadeMistake: state.isMadeMistake,
    idx: state.idx,
    cardsMap,
  };
}

function getNextActiveCardId(cardsMap: CustomCardMap[]): string {
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
