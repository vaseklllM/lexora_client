"use client";

import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";
import { buttonClassesSlots } from "./classes";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface Props {
  className?: string;
  numberOfNewCards: number;
  deckId: string;
}

export const ButtonStart = (props: Props): ReactElement => {
  const classes = buttonClassesSlots();
  const isCardsToLearn = props.numberOfNewCards > 0;
  const startLearningSession = useLearningDeckStore(
    (state) => state.startLearningSession,
  );
  const { t } = useTranslation();

  const startHandler = useCallback(async () => {
    const result = await startLearningDeckSession({
      deckId: props.deckId,
      count: 5,
    });
    if (result.ok) {
      startLearningSession(result.data.cards);
    }
  }, [props.deckId, startLearningSession]);

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
        {t("learning_deck.step.start.button_start.title")}
        {isCardsToLearn
          ? ""
          : ` (${t("learning_deck.step.start.button_start.no_words_to_learn")})`}
      </p>
    </div>
  );
};
