"use client";

import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { AnimatePresence, motion } from "motion/react";
import { ReactElement, useMemo, useState } from "react";
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

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const TypeItCardsListGame = (
  props: TypeItCardsListGameProps,
): ReactElement => {
  const classes = classesSlots({});
  const cards = useMemo(() => mixArray(props.cards), [props.cards]);
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);

  const activeCard = useMemo(
    () => cards[activeCardIdx],
    [cards, activeCardIdx],
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.id}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className={classes.base({ className: props.className })}
        >
          <TypeItGame card={activeCard} />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => setActiveCardIdx((prev) => prev + 1)}
        style={{ position: "absolute", bottom: 0, right: 0 }}
      >
        Next
      </button>
    </>
  );
};
