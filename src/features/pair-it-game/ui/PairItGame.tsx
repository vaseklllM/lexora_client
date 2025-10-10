"use client";

import { ICard } from "@/api/schemas/card.schema";
import { useSliceCards } from "@/shared/hooks/useSliceCards";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { PairItGameRound } from "./PairItGameRound";

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
  const cardsController = useSliceCards(props);

  return (
    <div className={classes.base({ className: props.className })}>
      <PairItGameRound
        cards={cardsController.cards}
        onFinish={cardsController.onNextPart}
      />
    </div>
  );
});

PairItGame.displayName = "PairItStep";
