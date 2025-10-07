"use client";

import { ICard } from "@/api/schemas/card.schema";
import { AnimatePresence, motion } from "motion/react";
import { memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useTypeItGameStore, withStoreProvider } from "../model/store";
import { CardItem } from "./CardItem";
import { DefaultViewCard } from "./DefaultViewCard";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col gap-4",
    content: "grid h-full grid-cols-1 gap-4",
    defaultBlock: "",
  },
});

export interface TypeItGameProps {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const TypeItGame = memo(
  withStoreProvider(function Component(props: TypeItGameProps): ReactElement {
    const classes = classesSlots({});

    const viewVariant = useTypeItGameStore((state) => state.viewVariant);

    return (
      <div className={classes.base({ className: props.className })}>
        <div className={classes.content()}>
          <CardItem />
          <AnimatePresence mode="wait">
            {viewVariant === "default" && (
              <motion.div
                key="A"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
                className={classes.defaultBlock()}
              >
                <DefaultViewCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }),
);
