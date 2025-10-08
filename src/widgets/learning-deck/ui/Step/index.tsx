import { finishLearningDeckSession } from "@/api/deck/finish-learning-deck-session";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { ICard } from "@/api/schemas/card.schema";
import { IDeck } from "@/api/schemas/deck.schema";
import { GuessItGame } from "@/features/guess-it-game";
import { PairItGame } from "@/features/pair-it-game";
import { RecallItGame } from "@/features/recall-it-game";
import { TypeItCardsListGame } from "@/features/type-it-game";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { AnimatePresence, Transition, Variants, motion } from "motion/react";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { Step, useLearningDeckStore } from "../../model/store";
import { PreviewStep } from "./PreviewStep";
import { StepsHeader } from "./StepsHeader";

const classesSlots = tv({
  slots: {
    base: "",
    content:
      "bg-base-300 relative mt-6 flex h-170 overflow-hidden rounded-xl sm:h-160",
    buttonStart: "h-28 w-28 md:h-28 md:w-28",
    textStart: "text-base-content/80 text-lg font-bold",
    step: `absolute inset-0 flex h-full w-full min-w-full p-4 md:p-6`,
    stepStart: "left-0 flex-col items-center justify-center gap-6",
  },
});

const transition: Transition = {
  duration: 0.8,
  ease: [0.32, 0.72, 0, 1],
};

const variants: Variants = {
  enter: (direction: "forward" | "backward") => {
    return {
      x: direction === "forward" ? "100%" : "-100%",
    };
  },
  center: {
    x: 0,
  },
  exit: (direction: "forward" | "backward") => {
    return {
      x: direction === "forward" ? "-100%" : "100%",
    };
  },
};

interface Props {
  className?: string;
  deck: IDeck;
}

export const StepComponent = (props: Props): ReactElement | null => {
  const [cards, setCards] = useState<ICard[]>([]);
  const step = useLearningDeckStore((state) => state.activeStep);
  const openStep = useLearningDeckStore((state) => state.openStep);
  const stepAnimation = useLearningDeckStore((state) => state.stepAnimation);

  const showStep = useCallback(
    async (step: Step) => {
      openStep(step);
    },
    [openStep],
  );

  const startHandler = useCallback(async () => {
    const result = await startLearningDeckSession({
      deckId: props.deck.id,
      count: 5,
    });
    if (result.ok) {
      setCards(result.data.cards);
      openStep(Step.PREVIEW);
    }
  }, [props.deck.id, openStep]);

  const finishReviewStepHandler = useCallback(async () => {
    await showStep(Step.PAIR_IT);
  }, [showStep]);

  const finishPairItStepHandler = useCallback(async () => {
    await showStep(Step.GUESS_IT);
  }, [showStep]);

  const finishGuessItStepHandler = useCallback(async () => {
    await showStep(Step.RECALL_IT);
  }, [showStep]);

  const finishRecallItStepHandler = useCallback(async () => {
    await showStep(Step.TYPE_IT);
  }, [showStep]);

  const finishTypeItStepHandler = useCallback(async () => {
    await finishLearningDeckSession({
      cardIds: cards.map((card) => card.id),
    });
    await revalidateGetDeck(props.deck.id);
    await showStep(Step.START);
  }, [cards, props.deck.id, showStep]);

  const classes = classesSlots();

  const isCardsToLearn = props.deck.numberOfNewCards > 0;

  return (
    <div className={classes.base({ className: props.className })}>
      <StepsHeader />
      <div className={classes.content()}>
        <AnimatePresence custom={stepAnimation} initial={false}>
          {step === Step.START && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step({
                className: classes.stepStart(),
              })}
            >
              <ButtonIcon
                color="primary"
                icon="play"
                className={classes.buttonStart()}
                iconWidth="48px"
                iconHeight="48px"
                onClick={startHandler}
                disabled={!isCardsToLearn}
              />
              <p className={classes.textStart()}>
                Learn{isCardsToLearn ? "" : " (no words to learn)"}
              </p>
            </motion.div>
          )}
          {step === Step.PREVIEW && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step()}
            >
              <PreviewStep
                className={classes.step()}
                cards={cards}
                onFinish={finishReviewStepHandler}
              />
            </motion.div>
          )}
          {step === Step.PAIR_IT && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step()}
            >
              <PairItGame
                className={classes.step()}
                cards={cards}
                onFinish={finishPairItStepHandler}
              />
            </motion.div>
          )}
          {step === Step.GUESS_IT && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step()}
            >
              <GuessItGame
                className={classes.step()}
                cards={cards}
                onFinish={finishGuessItStepHandler}
              />
            </motion.div>
          )}
          {step === Step.RECALL_IT && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step()}
            >
              <RecallItGame
                className={classes.step()}
                cards={cards}
                onFinish={finishRecallItStepHandler}
              />
            </motion.div>
          )}
          {step === Step.TYPE_IT && (
            <motion.div
              key={step}
              custom={stepAnimation}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={transition}
              className={classes.step()}
            >
              <TypeItCardsListGame
                className={classes.step()}
                cards={cards}
                onFinish={finishTypeItStepHandler}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
