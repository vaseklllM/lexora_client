import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { useCallback, useMemo, useState } from "react";

const CARDS_PER_PART = 5;

type Props = {
  cards: ICard[];
  onFinish?: () => void;
};

export function useCardsController(props: Props) {
  const [part, setPart] = useState<number>(1);

  const mixedCards = useMemo(() => mixArray(props.cards), []);

  const activePartCards = useMemo(
    () => mixedCards.slice((part - 1) * CARDS_PER_PART, part * CARDS_PER_PART),
    [mixedCards, part],
  );

  const nextPartHandler = useCallback(() => {
    if (part * CARDS_PER_PART >= mixedCards.length) {
      props.onFinish?.();
      return;
    }

    setPart((prev) => prev + 1);
  }, [mixedCards, part, props.onFinish]);

  return {
    cards: activePartCards,
    onNextPart: nextPartHandler,
  };
}
