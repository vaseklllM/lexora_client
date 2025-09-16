import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { ArrowIcon } from "../icons/Arrow";

const classesSlots = tv({
  slots: {
    button: "btn btn-circle btn-soft h-9 w-9 rounded-full",
    icon: "ml-0.5",
  },
});

interface Props {
  className?: string;
  disabled?: boolean;
}

export const ButtonBack = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <button
      className={classes.button({ className: props.className })}
      disabled={props.disabled}
    >
      <ArrowIcon />
    </button>
  );
};
