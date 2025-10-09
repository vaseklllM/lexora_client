import { finishLearningDeckSession } from "@/api/deck/finish-learning-deck-session";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { IDeck } from "@/api/schemas/deck.schema";
import { GuessItGame } from "@/features/guess-it-game";
import { PairItGame } from "@/features/pair-it-game";
import { RecallItGame } from "@/features/recall-it-game";
import { TypeItCardsListGame } from "@/features/type-it-game";
import { AnimatePresence, Transition, Variants, motion } from "motion/react";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";
import { Step, useLearningDeckStore } from "../../model/store";
import { Header } from "./Header";
import { PreviewStep } from "./PreviewStep";
import {
  ButtonRepeat,
  ButtonRepeatAll,
  ButtonStart,
  ModalReviewType,
} from "./StepStart";

const classesSlots = tv({
  slots: {
    base: "",
    content:
      "bg-base-300 relative flex h-170 overflow-hidden rounded-xl sm:h-160",
    buttonStart: "h-28 w-28 md:h-28 md:w-28",
    textStart: "text-base-content/80 text-lg font-bold",
    startButton: "flex flex-col items-center justify-center gap-4",
    step: `absolute inset-0 flex h-full w-full min-w-full p-4 md:p-6`,
    stepStart: "left-0 flex-col items-center justify-evenly",
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
  const cards = useLearningDeckStore((state) => state.cards);
  const step = useLearningDeckStore((state) => state.activeStep);
  const openStep = useLearningDeckStore((state) => state.openStep);
  const stepAnimation = useLearningDeckStore((state) => state.stepAnimation);
  const stopSession = useLearningDeckStore((state) => state.stopSession);

  const finishReviewStepHandler = useCallback(() => {
    openStep(Step.PAIR_IT);
  }, [openStep]);

  const finishPairItStepHandler = useCallback(() => {
    openStep(Step.GUESS_IT);
  }, [openStep]);

  const finishGuessItStepHandler = useCallback(() => {
    openStep(Step.RECALL_IT);
  }, [openStep]);

  const finishRecallItStepHandler = useCallback(() => {
    openStep(Step.TYPE_IT);
  }, [openStep]);

  const finishTypeItStepHandler = useCallback(async () => {
    await finishLearningDeckSession({
      cardIds: cards.map((card) => card.id),
    });
    await revalidateGetDeck(props.deck.id);
    stopSession();
  }, [cards, props.deck.id, stopSession]);

  const classes = classesSlots();

  const isCardsToRepeat = props.deck.numberOfCardsNeedToReview > 0;
  const isCardsToRepeatAll = props.deck.numberOfCardsInProgress > 0;

  return (
    <div className={classes.base({ className: props.className })}>
      <Header />
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
              <ButtonStart
                numberOfNewCards={props.deck.numberOfNewCards}
                deckId={props.deck.id}
              />
              {isCardsToRepeat && (
                <ButtonRepeat
                  numberOfCardsNeedToReview={
                    props.deck.numberOfCardsNeedToReview
                  }
                />
              )}
              {isCardsToRepeatAll && (
                <ButtonRepeatAll
                  numberOfCardsInProgress={props.deck.numberOfCardsInProgress}
                />
              )}
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
      <ModalReviewType deckId={props.deck.id} />
    </div>
  );
};
