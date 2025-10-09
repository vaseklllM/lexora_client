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
    button: "dark:btn-soft btn-outline h-28 w-28 md:h-28 md:w-28",
    title: "text-base-content/80 text-lg font-bold",
  },
});

interface Props {
  className?: string;
  deckId: string;
  numberOfCardsNeedToReview: number;
}

export const ButtonRepeat = (props: Props): ReactElement => {
  const classes = classesSlots();
  const setCards = useLearningDeckStore((state) => state.setCards);
  const openStep = useLearningDeckStore((state) => state.openStep);

  const repeatHandler = useCallback(async () => {
    const result = await startLearningDeckSession({
      deckId: props.deckId,
      count: 5,
    });
    if (result.ok) {
      setCards(result.data.cards);
      openStep(Step.PREVIEW);
    }
  }, [props.deckId, setCards, openStep]);

  const isCardsToReview = props.numberOfCardsNeedToReview > 0;

  return (
    <div className={classes.base()}>
      <ButtonIcon
        color={isCardsToReview ? "primary" : "secondary"}
        icon="repeat"
        className={classes.button()}
        iconWidth="58px"
        iconHeight="58px"
        // variant="outline"
        onClick={repeatHandler}
      />
      <p className={classes.title()}>Repeat</p>
    </div>
  );
};
