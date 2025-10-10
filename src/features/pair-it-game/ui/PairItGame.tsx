"use client";

import { ICard } from "@/api/schemas/card.schema";
import { useMixCards } from "@/shared/hooks/useMixCards";
import { useSliceCards } from "@/shared/hooks/useSliceCards";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { PairItGameRound } from "./PairItGameRound";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col items-center gap-4",
    statusBar: "w-full md:max-w-200",
    content: "h-full w-full",
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

  const cardsController = useSliceCards({
    cards: mixedCards,
    cardsPerPart: 5,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar cardsMap={[]} className={classes.statusBar()} />
      <PairItGameRound
        cards={cardsController.cards}
        onFinishPart={cardsController.nextPart}
        onFinishReviewCard={cardsController.finishCard}
        className={classes.content()}
      />
    </div>
  );
});

PairItGame.displayName = "PairItStep";
