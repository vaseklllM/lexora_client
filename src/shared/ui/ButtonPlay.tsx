import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { PlayIcon } from "../icons/Play";

const classesSlots = tv({
  slots: {
    button: "btn btn-circle btn-primary h-9 w-9 rounded-full",
    icon: "ml-0.5",
  },
});

interface Props {
  className?: string;
  disabled?: boolean;
}

export const ButtonPlay = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <button
      className={classes.button({ className: props.className })}
      disabled={props.disabled}
    >
      <PlayIcon className={classes.icon()} />
    </button>
  );
};
