"use client";

import { ICard } from "@/api/schemas/card.schema";
import { AnimatePresence, motion } from "motion/react";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useActiveCard } from "../../hooks/useActiveCard";
import { withNextCardHandlerProvider } from "../../hooks/useNextCardHandler";
import { useTypeItGameStore, withStoreProvider } from "../../model/store";
import { CardItem } from "./CardItem";
import { DefaultViewCard } from "./DefaultViewCard";
import { UnrightAnswerButtons } from "./UnrightAnswerButtons";
import { UnrightAnswerViewCard } from "./UnrightAnswerViewCard";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col gap-4",
    content: "grid h-full grid-cols-1 grid-rows-2 gap-4",
    defaultBlock: "",
    buttons: "flex h-12 w-full justify-center",
  },
});

export type TypeItGameNextCardHandler = (isGuessed: boolean) => void;

export interface TypeItGameProps {
  className?: string;
  card: ICard;
  onNextCard?: TypeItGameNextCardHandler;
}

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const TypeItGame = memo(
  withStoreProvider(
    withNextCardHandlerProvider(function Component(
      props: TypeItGameProps,
    ): ReactElement {
      const classes = classesSlots({});
      const viewVariant = useTypeItGameStore((state) => state.viewVariant);
      const activeCard = useActiveCard();

      return (
        <div className={classes.base({ className: props.className })}>
          <div className={classes.content()}>
            <CardItem
              title={activeCard.textInKnownLanguage}
              description={activeCard.descriptionInKnownLanguage}
              cefr={activeCard.cefr}
              soundUrls={activeCard.soundUrls}
            />
            <AnimatePresence mode="wait">
              {viewVariant === "default" && (
                <motion.div
                  key="default_card"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <DefaultViewCard />
                </motion.div>
              )}
              {(viewVariant === "unrightAnswer" || viewVariant === "help") && (
                <motion.div
                  key="unrightAnswer_card"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <UnrightAnswerViewCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {viewVariant === "default" && (
              <motion.div
                key="default_buttons"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                className={classes.buttons()}
                transition={{ duration: 0.3 }}
              />
            )}
            {(viewVariant === "unrightAnswer" || viewVariant === "help") && (
              <motion.div
                key="unrightAnswer_buttons"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                className={classes.buttons()}
                transition={{ duration: 0.3 }}
              >
                <UnrightAnswerButtons />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }),
  ),
);
