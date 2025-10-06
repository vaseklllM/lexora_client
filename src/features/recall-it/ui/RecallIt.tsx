import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { Button } from "@/shared/ui/Button";
import { TimerButton } from "@/shared/ui/TimerButton";
import { mixArray } from "@/shared/utils/mixArray";
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "h-full flex-col items-center justify-between p-10!",
    header: "flex flex-col gap-4",
    headerTextBlock:
      "mb-2 flex min-h-20 max-w-full items-center justify-center rounded-lg bg-slate-300 p-2 text-center text-2xl md:min-h-30 md:min-w-96 md:p-4 dark:bg-gray-800",
    headerText: "text-center text-2xl break-words",
    headerTextInKnownLanguage: "transition-blur duration-300",
    content: "",
    timer: "",
    timerExpiredButton: "h-12 w-24 rounded-full text-base",
  },
  variants: {
    isShowCard: {
      true: "",
      false: { headerTextInKnownLanguage: "blur-md" },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const RecallIt = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);

  const mixedCards = useMemo(() => mixArray(props.cards), [props.cards]);

  const activeCard = mixedCards[activeCardIdx];

  useEffect(() => {
    setActiveCardIdx(0);
  }, [props.cards]);

  const classes = classesSlots({
    isShowCard,
  });

  const handleTimerExpire = useCallback(() => {
    setIsTimerExpired(true);
    setIsShowCard(true);
  }, []);

  useEffect(() => {
    player.play(activeCard.soundUrls[0]);
  }, [activeCard]);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <div className={classes.headerTextBlock()}>
          <span className={classes.headerText()}>
            {activeCard.textInLearningLanguage}
          </span>
        </div>
        <div className={classes.headerTextBlock()}>
          <span
            className={classes.headerText({
              className: classes.headerTextInKnownLanguage(),
            })}
          >
            {activeCard.textInKnownLanguage}
          </span>
        </div>
      </div>
      <div className={classes.content()}>
        {isTimerExpired ? (
          <Button
            variant="soft"
            color="accent"
            className={classes.timerExpiredButton()}
          >
            Next
          </Button>
        ) : (
          <TimerButton
            className={classes.timer()}
            seconds={9}
            onTimerExpire={handleTimerExpire}
          >
            Show
          </TimerButton>
        )}
      </div>
    </div>
  );
};
