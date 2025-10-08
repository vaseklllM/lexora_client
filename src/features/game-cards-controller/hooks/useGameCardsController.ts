import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useState } from "react";

interface Result {
  active: ICard;
  next: (isGuessed: boolean) => void;
}

interface Props {
  cards: ICard[];
}

type TState = {
  cards: ICard[];
  activeCard: ICard;
  activeCardIdx: number;
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
      };
    })(),
  );

  const next = useCallback<Result["next"]>(
    (isGuessed) => {
      setState((prevState) => {
        if (!isGuessed) {
          return {
            ...prevState,
            activeCardIdx: prevState.activeCardIdx + 1,
            activeCard: prevState.cards[prevState.activeCardIdx + 1]!,
          };
        }

        return {
          ...prevState,
        };
      });
    },
    [setState],
  );

  return {
    active: state.activeCard,
    next,
  };
}
