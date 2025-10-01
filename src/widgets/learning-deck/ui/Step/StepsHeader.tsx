import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useLearningDeckStore } from "../../model/store";

const classesSlots = tv({
  slots: {
    base: "flex justify-center",
    steps: "steps w-full",
    step: "step",
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
      },
      typeIt: {
        stepStart: "step-primary",
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
        stepRecallIt: "step-primary",
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
