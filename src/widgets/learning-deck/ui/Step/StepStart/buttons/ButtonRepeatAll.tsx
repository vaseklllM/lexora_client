"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement } from "react";
import { buttonClassesSlots } from "./classes";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface Props {
  className?: string;
  numberOfCardsInProgress: number;
}

export const ButtonRepeatAll = (props: Props): ReactElement => {
  const classes = buttonClassesSlots({
    type: "repeatAll",
  });
  const { t } = useTranslation();

  const openModalRepeatAllGameType = useLearningDeckStore(
    (state) => state.openModalRepeatAllGameType,
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <ButtonIcon
        icon="repeat"
        color="primary"
        className={classes.button()}
        iconWidth="48px"
        iconHeight="48px"
        onClick={openModalRepeatAllGameType}
      />
      <p className={classes.title()}>
        {t("learning_deck.step.start.button_repeat_all.title", {
          numberOfCardsInProgress: props.numberOfCardsInProgress,
        })}
      </p>
    </div>
  );
};
