"use client";

import { ICard } from "@/api/schemas/card.schema";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";
import { useMixCards } from "@/shared/hooks/useMixCards";
import {
  SliceCardsFinishReviewCardHandler,
  useSliceCards,
} from "@/shared/hooks/useSliceCards";
import { AnimatePresence, motion, Variants } from "motion/react";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { PairItGameRound } from "./PairItGameRound";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col items-center gap-4",
    statusBar: "w-full md:max-w-200",
    content: "h-full w-full",
  },
});
const variants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
  onFinishReviewCard?: SliceCardsFinishReviewCardHandler;
}

export const PairItGame = memo((props: Props): ReactElement => {
  const classes = classesSlots();
  const mixedCards = useMixCards(props.cards);

  const cardsController = useSliceCards({
    cards: mixedCards,
    cardsPerPart: 5,
    onFinish: props.onFinish,
    onFinishReviewCard: props.onFinishReviewCard,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar
        numberOfCards={cardsController.numberOfCards}
        numberOfFinishedCards={cardsController.numberOfFinishedCards}
        className={classes.statusBar()}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={cardsController.part}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className={classes.content()}
        >
          <PairItGameRound
            cards={cardsController.cards}
            onFinishPart={cardsController.nextPart}
            onFinishReviewCard={cardsController.finishCard}
            className={classes.content()}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

PairItGame.displayName = "PairItStep";
