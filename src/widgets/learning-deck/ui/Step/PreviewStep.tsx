"use client";

import { ICard } from "@/api/schemas/card.schema";
import { ViewCard } from "@/entities/view-card";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { Step, useLearningDeckStore } from "../../model/store";

const classesSlots = tv({
  slots: {
    base: "flex items-center justify-center gap-4 sm:gap-6",
    cards: "relative h-100 w-full sm:h-100 sm:w-70 md:h-124 md:w-85",
    card: "transition-[left,top, opacity] absolute h-100 w-full p-4 shadow-md/40 duration-600 sm:h-100 sm:w-70 md:h-120 md:w-85",
    cardOne: "top-0 left-0 z-5",
    cardTwo: "top-1 left-1 z-4",
    cardThree: "top-2 left-2 z-3",
    cardFour: "top-3 left-3 z-2",
    cardFive: "top-4 left-4 z-1",
    button:
      "absolute bottom-3 z-6 h-10 w-10 shadow-md/30 sm:relative sm:bottom-0 sm:h-12 sm:w-12",
    buttonArrowLeft: "left-3 sm:left-0",
    buttonArrowRight: "right-3 sm:right-0",
  },
  variants: {
    activeCard: {
      cardOne: {
        card: "",
      },
      cardTwo: {
        cardOne: "-left-150 opacity-0",
        cardTwo: "top-0 left-0 z-4",
        cardThree: "top-1 left-1 z-3",
        cardFour: "top-2 left-2 z-2",
        cardFive: "top-3 left-3 z-1",
      },
      cardThree: {
        cardOne: "-left-150 opacity-0",
        cardTwo: "-left-151 opacity-0",
        cardThree: "top-0 left-0 z-3",
        cardFour: "top-1 left-1 z-2",
        cardFive: "top-2 left-2 z-1",
      },
      cardFour: {
        cardOne: "-left-150 opacity-0",
        cardTwo: "-left-151 opacity-0",
        cardThree: "-left-152 opacity-0",
        cardFour: "top-0 left-0 z-2",
        cardFive: "top-1 left-1 z-1",
      },
      cardFive: {
        cardOne: "-left-150 opacity-0",
        cardTwo: "-left-151 opacity-0",
        cardThree: "-left-152 opacity-0",
        cardFour: "-left-153 opacity-0",
        cardFive: "top-0 left-0 z-1",
      },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const PreviewStep = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const step = useLearningDeckStore((state) => state.activeStep);

  const classes = classesSlots({
    activeCard: getCardEnum(activeCardIdx),
  });

  useEffect(() => {
    if (step === Step.PREVIEW) {
      sleep(1000).then(() => {
        player.play(props.cards[0].soundUrls[0]);
      });
    }
  }, [step]);

  const handlePreviousCard = useCallback(async () => {
    const prevIdx =
      (activeCardIdx - 1 + props.cards.length) % props.cards.length;
    setActiveCardIdx(prevIdx);

    await sleep(600);

    player.play(props.cards[prevIdx].soundUrls[0]);
  }, [setActiveCardIdx, activeCardIdx]);

  const handleNextCard = useCallback(async () => {
    const nextIdx = activeCardIdx + 1;

    if (nextIdx === props.cards.length) {
      props.onFinish?.();
      return;
    }

    setActiveCardIdx(nextIdx);

    await sleep(600);
    player.play(props.cards[nextIdx].soundUrls[0]);
  }, [setActiveCardIdx, props.onFinish, activeCardIdx]);

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
            useBackground
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
