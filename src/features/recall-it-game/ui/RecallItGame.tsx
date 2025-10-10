"use client";

import { ICard } from "@/api/schemas/card.schema";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";
import { GameCardsControllerFinishReviewCardHandler } from "@/features/game-cards-controller";
import { player } from "@/shared/hooks/usePlayer";
import { Button } from "@/shared/ui/Button";
import { TimerButton } from "@/shared/ui/TimerButton";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { CardItem } from "./CardItem";
import { useActiveCard } from "./useActiveCard";
import { useBlurWordDescription } from "./useBlurWordDescription";

const classesSlots = tv({
  slots: {
    base: "flex h-full w-full flex-col items-center gap-4",
    header:
      "grid h-full w-full max-w-full grid-cols-1 flex-col gap-4 transition-opacity duration-150 lg:h-auto lg:w-250",
    content: "mt-auto grid gap-4",
    buttonForgot: "h-12 rounded-full",
    buttonRecalled: "h-12 rounded-full",
    timer: "",
    timerExpiredButton: "h-12 w-24 rounded-full",
    statusBar: "w-full lg:max-w-250",
  },
  variants: {
    isUserShowedTranslation: {
      true: {
        content: "grid-cols-2",
      },
    },
  },
});

const variants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface Props {
  className?: string;
  cards: ICard[];
  onFinish?: () => void;
  onFinishReviewCard?: GameCardsControllerFinishReviewCardHandler;
}

export const RecallItGame = (props: Props): ReactElement => {
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [isUserShowedTranslation, setIsUserShowedTranslation] =
    useState<boolean>(false);
  const [isBlurTranslation, setIsBlurTranslation] = useState<boolean>(true);

  const blurWordDescription = useBlurWordDescription();

  const activeCard = useActiveCard({
    ...props,
    onBlurWordDescription: blurWordDescription.blur,
    setIsBlurTranslation,
    setIsTimerExpired,
    setIsUserShowedTranslation,
    onFinishReviewCard: props.onFinishReviewCard,
  });

  const classes = classesSlots({
    isUserShowedTranslation,
  });

  const handleTimerExpire = useCallback(() => {
    player.play(activeCard.card.soundUrls[0]);
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
  }, [activeCard.card.soundUrls[0]]);

  const showHandler = useCallback(() => {
    player.play(activeCard.card.soundUrls[0]);
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
    setIsUserShowedTranslation(true);
    blurWordDescription.show();
  }, [activeCard.card.soundUrls[0]]);

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar
        cardsMap={activeCard.cardsMap}
        className={classes.statusBar()}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCard.idx}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2 }}
          className={classes.header()}
        >
          <CardItem
            title={activeCard.card.textInLearningLanguage}
            description={activeCard.card.descriptionInLearningLanguage}
            soundUrls={activeCard.card.soundUrls}
            isBlurWordDescription={blurWordDescription.isBlur}
            cefr={activeCard.card.cefr}
          />
          <CardItem
            title={activeCard.card.textInKnownLanguage}
            description={activeCard.card.descriptionInKnownLanguage}
            isBlur={isBlurTranslation}
          />
        </motion.div>
      </AnimatePresence>
      <div className={classes.content()}>
        {isTimerExpired ? (
          isUserShowedTranslation ? (
            <>
              <Button
                onClick={activeCard.forgotCard}
                color="error"
                className={classes.buttonForgot()}
              >
                Forgot
              </Button>
              <Button
                onClick={activeCard.recalledCard}
                color="accent"
                className={classes.buttonRecalled()}
              >
                Recalled
              </Button>
            </>
          ) : (
            <Button
              onClick={activeCard.forgotCard}
              color="accent"
              className={classes.timerExpiredButton()}
            >
              Next
            </Button>
          )
        ) : (
          <TimerButton
            className={classes.timer()}
            seconds={9}
            onTimerExpire={handleTimerExpire}
            onClick={showHandler}
          >
            Show
          </TimerButton>
        )}
      </div>
    </div>
  );
};
