import { ICard } from "@/api/schemas/card.schema";
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
    content: "",
    timer: "",
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const RecallIt = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);

  const mixedCards = useMemo(() => mixArray(props.cards), [props.cards]);

  const activeCard = mixedCards[activeCardIdx];

  useEffect(() => {
    setActiveCardIdx(0);
  }, [props.cards]);

  const classes = classesSlots();

  const handleTimerExpire = useCallback(() => {
    setIsTimerExpired(true);
  }, []);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <div className={classes.headerTextBlock()}>
          <span className={classes.headerText()}>
            {activeCard.textInLearningLanguage}
          </span>
        </div>
        <div className={classes.headerTextBlock()}>
          <span className={classes.headerText({ className: "blur-md" })}>
            {activeCard.textInKnownLanguage}
          </span>
        </div>
      </div>
      <div className={classes.content()}>
        {!isTimerExpired && (
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
