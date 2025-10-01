"use client";

import { ICard } from "@/api/schemas/card.schema";
import { ViewCard } from "@/entities/view-card";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 flex items-center justify-center gap-6 overflow-hidden rounded-xl p-6",
    cards: "relative h-124 w-85",
    card: "transition-[left,top, opacity] absolute h-120 w-85 p-4 shadow-md/40 duration-600",
    cardOne: "top-0 left-0 z-5",
    cardTwo: "top-1 left-1 z-4",
    cardThree: "top-2 left-2 z-3",
    cardFour: "top-3 left-3 z-2",
    cardFive: "top-4 left-4 z-1",
    button: "z-6 h-12 w-12 shadow-md/30",
    buttonArrowLeft: "",
    buttonArrowRight: "",
  },
  variants: {
    activeCard: {
      cardOne: {
        card: "",
      },
      cardTwo: {
        cardOne: "-left-200 opacity-0",
        cardTwo: "top-0 left-0 z-4",
        cardThree: "top-1 left-1 z-3",
        cardFour: "top-2 left-2 z-2",
        cardFive: "top-3 left-3 z-1",
      },
      cardThree: {
        cardOne: "-left-200 opacity-0",
        cardTwo: "-left-201 opacity-0",
        cardThree: "top-0 left-0 z-3",
        cardFour: "top-1 left-1 z-2",
        cardFive: "top-2 left-2 z-1",
      },
      cardFour: {
        cardOne: "-left-200 opacity-0",
        cardTwo: "-left-201 opacity-0",
        cardThree: "-left-202 opacity-0",
        cardFour: "top-0 left-0 z-2",
        cardFive: "top-1 left-1 z-1",
      },
      cardFive: {
        cardOne: "-left-200 opacity-0",
        cardTwo: "-left-201 opacity-0",
        cardThree: "-left-202 opacity-0",
        cardFour: "-left-203 opacity-0",
        cardFive: "top-0 left-0 z-1",
      },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const PreviewStep = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);

  const classes = classesSlots({
    activeCard: getCardEnum(activeCardIdx),
  });

  const handlePreviousCard = useCallback(() => {
    setActiveCardIdx(
      (prev) => (prev - 1 + props.cards.length) % props.cards.length,
    );
  }, [setActiveCardIdx]);

  const handleNextCard = useCallback(() => {
    setActiveCardIdx((prev) => (prev + 1) % props.cards.length);
  }, [setActiveCardIdx]);

  return (
    <div className={classes.base({ className: props.className })}>
      <ButtonIcon
        icon="arrow_left"
        variant="soft"
        color="primary"
        className={classes.button({ className: classes.buttonArrowLeft() })}
        iconWidth="24px"
        iconHeight="24px"
        disabled={activeCardIdx === 0}
        onClick={handlePreviousCard}
      />
      <div className={classes.cards()}>
        {props.cards.map((card, idx) => (
          <ViewCard
            key={card.id}
            card={card}
            disabled={idx !== activeCardIdx}
            className={classes.card({
              className: (() => {
                switch (idx) {
                  case 0:
                    return classes.cardOne();
                  case 1:
                    return classes.cardTwo();
                  case 2:
                    return classes.cardThree();
                  case 3:
                    return classes.cardFour();
                  case 4:
                    return classes.cardFive();
                }
              })(),
            })}
          />
        ))}
      </div>
      <ButtonIcon
        icon="arrow_right"
        variant="soft"
        color="accent"
        className={classes.button({ className: classes.buttonArrowRight() })}
        iconWidth="24px"
        iconHeight="24px"
        onClick={handleNextCard}
        disabled={activeCardIdx === props.cards.length - 1}
      />
    </div>
  );
};

function getCardEnum(activeCardIdx: number) {
  switch (activeCardIdx) {
    case 0:
      return "cardOne";

    case 1:
      return "cardTwo";

    case 2:
      return "cardThree";

    case 3:
      return "cardFour";

    case 4:
      return "cardFive";
  }
}
