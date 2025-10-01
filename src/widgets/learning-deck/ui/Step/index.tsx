import { ICard } from "@/api/schemas/card.schema";
import { ReactElement, useCallback } from "react";
import { Step, useLearningDeckStore } from "../../model/store";
import { PreviewStep } from "./PreviewStep";

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
