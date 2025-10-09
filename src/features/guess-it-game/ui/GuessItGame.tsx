"use client";

import { ICard } from "@/api/schemas/card.schema";
import { RepeatCardsStatusBar } from "@/entities/repeat-cards-status-bar";
import { useGameCardsController } from "@/features/game-cards-controller";
import { player } from "@/shared/hooks/usePlayer";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { Cerf } from "@/shared/ui/Cefr";
import { mixArray } from "@/shared/utils/mixArray";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { OptionButton } from "./OptionButton";

const classesSlots = tv({
  slots: {
    base: "flex w-full flex-col items-center justify-center",
    content:
      "mt-4 flex h-full w-full max-w-full flex-col gap-4 md:gap-4 lg:w-250",
    iconButtons: "absolute top-2 left-2 flex flex-row items-center gap-2",
    header:
      "bg-base-200 relative grid h-full min-h-34 max-w-full grid-cols-1 items-center justify-center rounded-lg p-2 md:min-h-42 md:min-w-96 md:p-4 dark:bg-gray-800",
    headerText: "max-w-full text-center text-2xl break-words",
    option:
      "bg-base-100 text-base-content hover:bg-base-200 cursor-pointer rounded-lg p-3 text-sm",
    statusBar: "w-full lg:max-w-250",
  },
  variants: {
    status: {
      success: {
        option: "bg-success text-success-content hover:bg-success cursor-auto",
      },
      error: {
        option: "bg-error text-error-content hover:bg-error cursor-auto",
      },
    },
    headerLength: {
      big: {
        headerText: "text-sm",
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
}

export const GuessItGame = (props: Props): ReactElement => {
  const [isMixOptions, setIsMixOptions] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const cardsController = useGameCardsController({
    cards: props.cards,
    onFinish: props.onFinish,
  });

  const classes = classesSlots({
    headerLength:
      cardsController.active.textInLearningLanguage.length >= 50
        ? "big"
        : undefined,
  });

  const mixRandomCards = useCallback(() => {
    setIsMixOptions((v) => !v);
  }, []);

  const options = useMemo(
    () => mixArray(props.cards),
    [props.cards, isMixOptions],
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <RepeatCardsStatusBar
        cardsMap={cardsController.cardsMap}
        className={classes.statusBar()}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={cardsController.idx}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className={classes.content()}
        >
          <div className={classes.header()}>
            <div className={classes.iconButtons()}>
              {cardsController.active.cefr && (
                <Cerf cefr={cardsController.active.cefr} />
              )}
              {cardsController.active.soundUrls?.map((soundUrl, idx) => (
                <ButtonIcon
                  key={idx}
                  icon="sound"
                  variant="ghost"
                  color="primary"
                  onClick={() => {
                    player.play(soundUrl);
                  }}
                />
              ))}
            </div>
            <h3 className={classes.headerText()}>
              {cardsController.active.textInLearningLanguage}
            </h3>
          </div>
          {options.map((option) => (
            <OptionButton
              title={option.textInKnownLanguage}
              className={classes.option()}
              key={option.id}
              onMakeMistake={cardsController.makeMistake}
              onNext={cardsController.next}
              id={option.id}
              isRightOption={option.id === cardsController.active.id}
              onMixOptions={mixRandomCards}
              isLastCard={cardsController.isLastCard}
              isChecked={isChecked}
              onChecked={setIsChecked}
              soundUrl={option.soundUrls[0]}
              isMadeMistake={cardsController.isMadeMistake}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
