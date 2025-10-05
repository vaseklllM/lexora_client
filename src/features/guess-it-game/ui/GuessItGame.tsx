"use client";

import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { OptionButton } from "./OptionButton";

const classesSlots = tv({
  slots: {
    base: "items-center justify-center",
    content: "flex max-w-full flex-col gap-2 md:gap-4",
    header:
      "mb-2 flex min-h-34 max-w-full items-center justify-center rounded-lg p-4 md:min-h-42 md:min-w-96 dark:bg-gray-800",
    headerText: "max-w-full text-center text-2xl break-words",
    option:
      "bg-base-100 text-base-content hover:bg-base-200 cursor-pointer rounded-lg p-3 text-sm",
  },
  variants: {
    status: {
      success: {
        option: "bg-success text-success-content hover:bg-success cursor-auto",
      },
      error: {
        option: "bg-error text-error-content hover:bg-error cursor-auto",
      },
    },
    headerSize: {
      big: {
        headerText: "text-sm",
      },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
}

export const GuessItGame = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isMixRandomCards, setIsMixRandomCards] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const isLastCard = props.cards.length - 1 === activeCardIdx;

  const activeCard = useMemo(
    () => props.cards[activeCardIdx],
    [props.cards, activeCardIdx],
  );

  const classes = classesSlots({
    headerSize:
      activeCard?.textInLearningLanguage.length >= 50 ? "big" : undefined,
  });

  const nextCard = useCallback(() => {
    setActiveCardIdx((prev) => prev + 1);
  }, [props.cards]);

  const mixRandomCards = useCallback(() => {
    setIsMixRandomCards((v) => !v);
  }, []);

  const randomCards = useMemo(
    () => mixArray(props.cards),
    [props.cards, isMixRandomCards],
  );

  const handleOptionClick = useCallback(
    (card: ICard) => {
      if (card.id === activeCard.id) {
        if (isLastCard) {
          props.onFinish?.();
        } else {
          nextCard();
        }
      }
    },
    [activeCard, nextCard, mixRandomCards, isLastCard, props.onFinish],
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.content()}>
        <div className={classes.header()}>
          <h3 className={classes.headerText()}>
            {activeCard?.textInLearningLanguage}
          </h3>
        </div>
        {randomCards.map((option) => (
          <OptionButton
            title={option.textInKnownLanguage}
            className={classes.option()}
            key={option.id}
            onClick={() => handleOptionClick(option)}
            id={option.id}
            isRightOption={option.id === activeCard.id}
            onMixRandomCards={mixRandomCards}
            isLastCard={isLastCard}
            isChecked={isChecked}
            onChecked={setIsChecked}
            soundUrl={option.soundUrls[0]}
          />
        ))}
      </div>
    </div>
  );
};
