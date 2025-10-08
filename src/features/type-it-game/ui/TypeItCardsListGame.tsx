"use client";

import { ICard } from "@/api/schemas/card.schema";
import { useGameCardsController } from "@/features/game-cards-controller";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { TypeItGame } from "./TypeItGame";

const classesSlots = tv({
  slots: {
    base: "",
  },
});

export interface TypeItCardsListGameProps {
  className?: string;
  cards: ICard[];
}

const variants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const TypeItCardsListGame = (
  props: TypeItCardsListGameProps,
): ReactElement => {
  const classes = classesSlots({});
  const cardsController = useGameCardsController({
    cards: props.cards,
    onFinish: () => {},
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cardsController.idx}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
        className={classes.base({ className: props.className })}
      >
        <TypeItGame
          card={cardsController.active}
          onNextCard={cardsController.next}
        />
      </motion.div>
    </AnimatePresence>
  );
};
