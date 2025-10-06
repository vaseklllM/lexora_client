import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { Button } from "@/shared/ui/Button";
import { TimerButton } from "@/shared/ui/TimerButton";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { CardItem } from "./CardItem";
import { useActiveCard } from "./useActiveCard";
import { useBlurWordDescription } from "./useBlurWordDescription";

const classesSlots = tv({
  slots: {
    base: "h-full flex-col items-center justify-between p-16!",
    header: "flex flex-col gap-6",
    content: "grid gap-4",
    buttonForgot: "h-12 rounded-full",
    buttonRecalled: "h-12 rounded-full",
    timer: "",
    timerExpiredButton: "h-12 w-24 rounded-full",
  },
  variants: {
    isUserShowedTranslation: {
      true: {
        content: "grid-cols-2",
      },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const RecallIt = (props: Props): ReactElement => {
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [isUserShowedTranslation, setIsUserShowedTranslation] =
    useState<boolean>(false);
  const [isBlurTranslation, setIsBlurTranslation] = useState<boolean>(true);
  const blurWordDescription = useBlurWordDescription();
  const activeCard = useActiveCard(props.cards);

  const classes = classesSlots({
    isUserShowedTranslation,
  });

  const handleTimerExpire = useCallback(() => {
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
  }, []);

  useEffect(() => {
    player.play(activeCard.card.soundUrls[0]);
  }, [activeCard.card]);

  const showHandler = useCallback(() => {
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
    setIsUserShowedTranslation(true);
    blurWordDescription.show();
  }, []);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
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
      </div>
      <div className={classes.content()}>
        {isTimerExpired ? (
          isUserShowedTranslation ? (
            <>
              <Button color="error" className={classes.buttonForgot()}>
                Forgot
              </Button>
              <Button color="accent" className={classes.buttonRecalled()}>
                Recalled
              </Button>
            </>
          ) : (
            <Button color="accent" className={classes.timerExpiredButton()}>
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
