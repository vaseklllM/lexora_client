"use client";

import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import {
  Step,
  useLearningDeckStore,
} from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex flex-col items-center justify-center gap-4",
    button: "h-28 w-28 md:h-28 md:w-28",
    title: "text-base-content/80 text-lg font-bold",
  },
});

interface Props {
  className?: string;
  numberOfNewCards: number;
  deckId: string;
}

export const ButtonStart = (props: Props): ReactElement => {
  const classes = classesSlots();
  const isCardsToLearn = props.numberOfNewCards > 0;
  const setCards = useLearningDeckStore((state) => state.setCardsToLearn);
  const openStep = useLearningDeckStore((state) => state.openStep);

  const startHandler = useCallback(async () => {
    const result = await startLearningDeckSession({
      deckId: props.deckId,
      count: 5,
    });
    if (result.ok) {
      setCards(result.data.cards);
      openStep(Step.PREVIEW);
    }
  }, [props.deckId, setCards, openStep]);

  return (
    <div className={classes.base()}>
      <ButtonIcon
        color="primary"
        icon="play"
        className={classes.button()}
        iconWidth="48px"
        iconHeight="48px"
        onClick={startHandler}
        disabled={!isCardsToLearn}
      />
      <p className={classes.title()}>
        Learn{isCardsToLearn ? "" : " (no words to learn)"}
      </p>
    </div>
  );
};
