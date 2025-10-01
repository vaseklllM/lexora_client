import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex justify-center",
    steps: "steps w-full",
    step: "step",
  },
});

interface Props {
  className?: string;
}

export const StepsHeader = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <ul className={classes.steps()}>
        <li className={classes.step({ className: "step-primary" })}>Start</li>
        <li className={classes.step({ className: "" })}>Review</li>
        <li className={classes.step({ className: "" })}>Pair it</li>
        <li className={classes.step({ className: "" })}>Guess it</li>
        <li className={classes.step({ className: "" })}>Recall it</li>
      </ul>
    </div>
  );
};
