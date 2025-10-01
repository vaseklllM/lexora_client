import { ICard } from "@/api/schemas/card.schema";
import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, useCallback } from "react";
import { tv } from "tailwind-variants";
import { Step, useLearningDeckStore } from "../../model/store";
import { PreviewStep } from "./PreviewStep";
import { StepsHeader } from "./StepsHeader";

const classesSlots = tv({
  slots: {
    base: "",
    content:
      "bg-base-300 mt-6 flex min-h-124 items-center justify-center overflow-hidden rounded-xl p-6",
    buttonStart: "h-28 w-28",
    textStart: "text-base-content/80 text-lg font-bold",
  },
  variants: {
    step: {
      start: {
        content: "flex-col gap-6",
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
  const finishFirstStepHandler = useCallback(() => {
    openStep(Step.PAIR_IT);
  }, [openStep]);

  const classes = classesSlots({
    step: getStepEnum(step),
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <StepsHeader />
      <div className={classes.content()}>
        <ButtonIcon
          color="primary"
          icon="play"
          className={classes.buttonStart()}
          iconWidth="48px"
          iconHeight="48px"
        />
        <p className={classes.textStart()}>Click to start</p>
      </div>
    </div>
  );

  switch (step) {
    case Step.PREVIEW:
      return (
        <PreviewStep
          cards={props.cards}
          className={props.className}
          onFinish={finishFirstStepHandler}
        />
      );

    default:
      return null;
  }
};

function getStepEnum(step: Step) {
  switch (step) {
    case Step.START:
      return "start";
  }
}
