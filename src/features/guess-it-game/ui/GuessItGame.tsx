import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "items-center justify-center",
  },
});

interface Props {
  className?: string;
}

export const GuessItGame = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      GuessItGame
    </div>
  );
};
