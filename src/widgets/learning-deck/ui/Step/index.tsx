import { ICard } from "@/api/schemas/card.schema";
import { GuessItGame } from "@/features/guess-it-game";
import { PairItGame } from "@/features/pair-it-game";
import { RecallIt } from "@/features/recall-it";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { sleep } from "@/shared/utils/sleep";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import { DEFAULT_STEP, Step, useLearningDeckStore } from "../../model/store";
import { PreviewStep } from "./PreviewStep";
import { StepsHeader } from "./StepsHeader";

const STEP_DELAY = 600;

const classesSlots = tv({
  slots: {
    base: "",
    content:
      "bg-base-300 relative mt-6 min-h-170 overflow-hidden rounded-xl sm:min-h-160 md:p-6",
    buttonStart: "h-28 w-28 md:h-28 md:w-28",
    textStart: "text-base-content/80 text-lg font-bold",
    step: `absolute top-0 flex h-full w-full p-4 transition-[left] sm:p-6 duration-${STEP_DELAY}`,
    stepStart: "left-0 flex-col items-center justify-center gap-6",
    stepPreview: "left-[100%]",
    stepPairIt: "left-[100%]",
    stepGuessIt: "left-[100%]",
    stepRecallIt: "left-[100%]",
    stepTypeIt: "left-[100%]",
  },
  variants: {
    step: {
      start: {},
      preview: {
        stepStart: "-left-[100%]",
        stepPreview: "left-0",
      },
      pairIt: {
        stepStart: "-left-[100%]",
        stepPreview: "-left-[100%]",
        stepPairIt: "left-0",
      },
      guessIt: {
        stepStart: "-left-[100%]",
        stepPreview: "-left-[100%]",
        stepPairIt: "-left-[100%]",
        stepGuessIt: "left-0",
      },
      recallIt: {
        stepStart: "-left-[100%]",
        stepPreview: "-left-[100%]",
        stepPairIt: "-left-[100%]",
        stepGuessIt: "-left-[100%]",
        stepRecallIt: "left-0",
      },
      typeIt: {
        stepStart: "-left-[100%]",
        stepPreview: "-left-[100%]",
        stepPairIt: "-left-[100%]",
        stepGuessIt: "-left-[100%]",
        stepRecallIt: "-left-[100%]",
        stepTypeIt: "left-0",
      },
    },
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const StepComponent = (props: Props): ReactElement | null => {
  const step = useLearningDeckStore((state) => state.activeStep);
  const openStep = useLearningDeckStore((state) => state.openStep);
  const [displaySteps, setDisplaySteps] = useState<Step[]>([DEFAULT_STEP]);

  const showStep = useCallback(async (step: Step) => {
    setDisplaySteps((prev) => [...prev, step]);
    await sleep(100);
    openStep(step);
    await sleep(STEP_DELAY);
    const prevStep = getPrevStep(step);
    if (prevStep) {
      setDisplaySteps((prev) => prev.filter((s) => s !== prevStep));
    }
  }, []);

  const startHandler = useCallback(async () => {
    await showStep(Step.PREVIEW);
  }, []);

  const finishReviewStepHandler = useCallback(async () => {
    await showStep(Step.PAIR_IT);
  }, []);

  const finishPairItStepHandler = useCallback(async () => {
    await showStep(Step.GUESS_IT);
  }, []);

  const finishGuessItStepHandler = useCallback(async () => {
    await showStep(Step.RECALL_IT);
  }, []);

  const finishRecallItStepHandler = useCallback(async () => {
    await showStep(Step.TYPE_IT);
  }, []);

  const classes = classesSlots({
    step,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <StepsHeader />
      <div className={classes.content()}>
        {displaySteps.includes(Step.START) && (
          <div className={classes.step({ className: classes.stepStart() })}>
            <ButtonIcon
              color="primary"
              icon="play"
              className={classes.buttonStart()}
              iconWidth="48px"
              iconHeight="48px"
              onClick={startHandler}
              disabled={props.cards.length === 0}
            />
            <p className={classes.textStart()}>Click to start</p>
          </div>
        )}
        {displaySteps.includes(Step.PREVIEW) && (
          <PreviewStep
            className={classes.step({ className: classes.stepPreview() })}
            cards={props.cards}
            onFinish={finishReviewStepHandler}
          />
        )}
        {displaySteps.includes(Step.PAIR_IT) && (
          <PairItGame
            className={classes.step({ className: classes.stepPairIt() })}
            cards={props.cards}
            onFinish={finishPairItStepHandler}
          />
        )}
        {displaySteps.includes(Step.GUESS_IT) && (
          <GuessItGame
            className={classes.step({ className: classes.stepGuessIt() })}
            cards={props.cards}
            onFinish={finishGuessItStepHandler}
          />
        )}
        {displaySteps.includes(Step.RECALL_IT) && (
          <RecallIt
            className={classes.step({ className: classes.stepRecallIt() })}
            cards={props.cards}
            onFinish={finishRecallItStepHandler}
          />
        )}
        {displaySteps.includes(Step.TYPE_IT) && (
          <div className={classes.step({ className: classes.stepTypeIt() })}>
            type it
          </div>
        )}
      </div>
    </div>
  );
};

function getPrevStep(step: Step): Step | undefined {
  switch (step) {
    case Step.START:
      return undefined;

    case Step.PREVIEW:
      return Step.START;

    case Step.PAIR_IT:
      return Step.PREVIEW;

    case Step.GUESS_IT:
      return Step.PAIR_IT;

    case Step.RECALL_IT:
      return Step.GUESS_IT;

    case Step.TYPE_IT:
      return Step.RECALL_IT;

    default:
      const _check: never = step;
      throw new Error(`Unhandled step type: ${_check}`);
  }
}
