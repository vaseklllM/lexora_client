"use client";

import { ICard } from "@/api/schemas/card.schema";
import { useMixCards } from "@/shared/hooks/useMixCards";
import { useSliceCards } from "@/shared/hooks/useSliceCards";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { PairItGameRound } from "./PairItGameRound";
import { useGameCardsController } from "@/shared/hooks/useGameCardsController";

const classesSlots = tv({
  slots: {
    base: "flex w-full",
  },
});

interface Props {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const PairItGame = memo((props: Props): ReactElement => {
  const classes = classesSlots();
  const mixedCards = useMixCards(props.cards);

  const gameCardsController = useGameCardsController({
    cards: mixedCards,
    // onFinishReviewCard: props.onFinishReviewCard,
    onFinish: props.onFinish,
  });

  const cardsController = useSliceCards({
    cards: mixedCards,
    // onFinish: props.onFinish,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <PairItGameRound
        cards={cardsController.cards}
        onFinishPart={cardsController.onNextPart}
        onFinishReviewCard={gameCardsController.next}
      />
    </div>
  );
});

PairItGame.displayName = "PairItStep";
