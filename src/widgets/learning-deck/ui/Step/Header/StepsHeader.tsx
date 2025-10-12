import { useTranslation } from "@/shared/hooks/useTranslation";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useLearningDeckStore } from "../../../model/store";

const classesSlots = tv({
  slots: {
    base: "flex justify-center pb-6",
    steps: "steps w-full text-[10px] sm:text-xs md:text-base",
    step: "step after:bg-primary min-w-max! before:h-1! after:h-6! after:w-6! md:after:h-[2rem]! md:after:w-[2rem]!",
    stepPreview: "",
    stepPairIt: "",
    stepGuessIt: "",
    stepRecallIt: "",
    stepTypeIt: "",
  },
  variants: {
    activeStep: {
      start: {},
      preview: {
        stepPreview: "step-primary",
      },
      pairIt: {
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
      },
      guessIt: {
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
      },
      recallIt: {
        stepPreview: "step-primary",
        stepPairIt: "step-primary",
        stepGuessIt: "step-primary",
        stepRecallIt: "step-primary",
      },
      typeIt: {
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
  const { t } = useTranslation();
  const classes = classesSlots({
    activeStep: step,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <ul className={classes.steps()}>
        <li
          className={classes.step({
            className: classes.stepPreview(),
          })}
        >
          {t("learning_deck.header.steps.review")}
        </li>
        <li
          className={classes.step({
            className: classes.stepPairIt(),
          })}
        >
          {t("learning_deck.header.steps.pair_it")}
        </li>
        <li
          className={classes.step({
            className: classes.stepGuessIt(),
          })}
        >
          {t("learning_deck.header.steps.guess_it")}
        </li>
        <li
          className={classes.step({
            className: classes.stepRecallIt(),
          })}
        >
          {t("learning_deck.header.steps.recall_it")}
        </li>
        <li
          className={classes.step({
            className: classes.stepTypeIt(),
          })}
        >
          {t("learning_deck.header.steps.type_it")}
        </li>
      </ul>
    </div>
  );
};
