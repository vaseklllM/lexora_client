import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { Button } from "@/shared/ui/Button";
import { TimerButton } from "@/shared/ui/TimerButton";
import { mixArray } from "@/shared/utils/mixArray";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { tv } from "tailwind-variants";
import { CardItem } from "./CardItem";

const classesSlots = tv({
  slots: {
    base: "h-full flex-col items-center justify-between p-16!",
    header: "flex flex-col gap-6",
    content: "",
    timer: "",
    timerExpiredButton: "h-12 w-24 rounded-full",
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const RecallIt = (props: Props): ReactElement => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [isBlurTranslation, setIsBlurTranslation] = useState<boolean>(true);
  const [isBlurWordDescription, setIsBlurWordDescription] =
    useState<boolean>(true);
  const blurDescriptionTimer = useRef<NodeJS.Timeout>(null);

  const blurWordDescription = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlurWordDescription(true);
    blurDescriptionTimer.current = setTimeout(() => {
      setIsBlurWordDescription(false);
    }, 4000);
  }, []);

  const showDescriptionWord = useCallback(() => {
    if (blurDescriptionTimer.current) {
      clearTimeout(blurDescriptionTimer.current);
    }

    setIsBlurWordDescription(false);
  }, []);

  const mixedCards = useMemo(() => mixArray(props.cards), [props.cards]);

  const activeCard = mixedCards[activeCardIdx];

  useEffect(() => {
    setActiveCardIdx(0);
  }, [props.cards]);

  const classes = classesSlots();

  const handleTimerExpire = useCallback(() => {
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
  }, []);

  useEffect(() => {
    player.play(activeCard.soundUrls[0]);
    blurWordDescription();
  }, [activeCard]);

  const showHandler = useCallback(() => {
    setIsTimerExpired(true);
    setIsBlurTranslation(false);
    showDescriptionWord();
  }, [showDescriptionWord]);

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.header()}>
        <CardItem
          title={activeCard.textInLearningLanguage}
          description={activeCard.descriptionInLearningLanguage}
          soundUrls={activeCard.soundUrls}
          isBlurWordDescription={isBlurWordDescription}
        />
        <CardItem
          title={activeCard.textInKnownLanguage}
          description={activeCard.descriptionInKnownLanguage}
          isBlur={isBlurTranslation}
        />
      </div>
      <div className={classes.content()}>
        {isTimerExpired ? (
          <Button color="accent" className={classes.timerExpiredButton()}>
            Next
          </Button>
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
