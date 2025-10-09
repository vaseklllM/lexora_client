"use client";

import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import {
  Step,
  useLearningDeckStore,
} from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";
import { buttonClassesSlots } from "./classes";

interface Props {
  className?: string;
  numberOfNewCards: number;
  deckId: string;
}

export const ButtonStart = (props: Props): ReactElement => {
  const classes = buttonClassesSlots();
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
        iconWidth="40px"
        iconHeight="40px"
        onClick={startHandler}
        disabled={!isCardsToLearn}
      />
      <p className={classes.title()}>
        Learn{isCardsToLearn ? "" : " (no words to learn)"}
      </p>
    </div>
  );
};
