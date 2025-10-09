"use client";

import { ICard } from "@/api/schemas/card.schema";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";
import {
  GameCardsControllerFinishReviewCardHandler,
  useGameCardsController,
} from "@/features/game-cards-controller";
import { GameMode } from "@/shared/types/Game";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { TypeItGame } from "./TypeItGame";

const classesSlots = tv({
  slots: {
    base: "flex w-full flex-col items-center justify-center gap-4",
    content: "flex h-full w-full lg:max-w-250",
    statusBar: "w-full lg:max-w-250",
  },
});

const variants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export interface TypeItCardsListGameProps {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
  mode?: GameMode;
  onFinishReviewCard?: GameCardsControllerFinishReviewCardHandler;
}

export const TypeItCardsListGame = (
  props: TypeItCardsListGameProps,
): ReactElement => {
  const classes = classesSlots({});
  const cardsController = useGameCardsController({
    cards: props.cards,
    onFinishReviewCard: props.onFinishReviewCard,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar
        cardsMap={cardsController.cardsMap}
        className={classes.statusBar()}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={cardsController.idx}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className={classes.content()}
        >
          <TypeItGame
            card={cardsController.active}
            onNextCard={cardsController.next}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
