"use client";

import { ICard } from "@/api/schemas/card.schema";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";
import { useGameCardsController } from "@/features/game-cards-controller";
import { GameMode } from "@/shared/types/Game";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { TypeItGame } from "./TypeItGame";

const classesSlots = tv({
  slots: {
    base: "flex flex-col gap-4",
    content: "flex h-full w-full",
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
}

export const TypeItCardsListGame = (
  props: TypeItCardsListGameProps,
): ReactElement => {
  const classes = classesSlots({});
  const cardsController = useGameCardsController(props);

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar cardsMap={cardsController.cardsMap} />
      <div className="h-full w-full">
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
    </div>
  );
};
