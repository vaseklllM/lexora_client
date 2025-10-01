import { ICard } from "@/api/schemas/card.schema";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";
import { Step, useLearningDeckStore } from "../../model/store";
import { PairItStep } from "./PairItStep";
import { PreviewStep } from "./PreviewStep";
import { StepsHeader } from "./StepsHeader";

const classesSlots = tv({
  slots: {
    base: "",
    content:
      "bg-base-300 relative mt-6 min-h-142 overflow-hidden rounded-xl p-6",
    buttonStart: "h-28 w-28",
    textStart: "text-base-content/80 text-lg font-bold",
    step: "absolute top-0 flex h-full w-full transition-[left] duration-600",
    stepStart: "left-0 flex-col items-center justify-center gap-6",
    stepPreview: "left-[100%]",
    stepPairIt: "left-[100%]",
    stepGuessIt: "",
    stepRecallIt: "",
    stepTypeIt: "",
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
      guessIt: {},
      recallIt: {},
      typeIt: {},
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

  const startHandler = useCallback(() => {
    openStep(Step.PREVIEW);
  }, [openStep]);

  const finishReviewStepHandler = useCallback(() => {
    openStep(Step.PAIR_IT);
  }, [openStep]);

  const classes = classesSlots({
    step,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <StepsHeader />
      <div className={classes.content()}>
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
        <PreviewStep
          className={classes.step({ className: classes.stepPreview() })}
          cards={props.cards}
          onFinish={finishReviewStepHandler}
        />
        <PairItStep
          className={classes.step({ className: classes.stepPairIt() })}
        />
      </div>
    </div>
  );
};
