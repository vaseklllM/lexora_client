import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useLearningDeckStore } from "../../../model/store";

const classesSlots = tv({
  slots: {
    base: "flex justify-center pb-6",
    steps: "steps w-full text-[10px] sm:text-xs md:text-base",
    step: "step after:bg-primary min-w-max! before:h-1! after:h-6! after:w-6! md:after:h-[2rem]! md:after:w-[2rem]!",
    stepStart: "",
    stepPreview: "",
    stepPairIt: "",
    stepGuessIt: "",
    stepRecallIt: "",
    stepTypeIt: "",
  },
  variants: {
    activeStep: {
      start: {
        stepStart: "step-primary",
      },
      preview: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
      },
      pairIt: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
      },
      guessIt: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
      },
      recallIt: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
        stepRecallIt: "step-primary",
      },
      typeIt: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
        stepRecallIt: "step-primary",
        stepTypeIt: "step-primary",
      },
    },
  },
});

interface Props {
  className?: string;
}

export const StepsHeader = (props: Props): ReactElement => {
  const step = useLearningDeckStore((state) => state.activeStep);

  const classes = classesSlots({
    activeStep: step,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <ul className={classes.steps()}>
        <li
          className={classes.step({
            className: classes.stepStart(),
          })}
        >
          Start
        </li>
        <li
          className={classes.step({
            className: classes.stepPreview(),
          })}
        >
          Review
        </li>
        <li
          className={classes.step({
            className: classes.stepPairIt(),
          })}
        >
          Pair it
        </li>
        <li
          className={classes.step({
            className: classes.stepGuessIt(),
          })}
        >
          Guess it
        </li>
        <li
          className={classes.step({
            className: classes.stepRecallIt(),
          })}
        >
          Recall it
        </li>
        <li
          className={classes.step({
            className: classes.stepTypeIt(),
          })}
        >
          Type it
        </li>
      </ul>
    </div>
  );
};
