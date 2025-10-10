import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { ButtonCheck } from "./ButtonCheck";
import { ButtonHelp } from "./ButtonHelp";

const classesSlots = tv({
  slots: {
    buttons:
      "grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:w-max",
    button: "md:min-w-48",
  },
});

interface Props {
  className?: string;
}

export const DefaultViewButtons = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.buttons({ className: props.className })}>
      <ButtonHelp className={classes.button()} />
      <ButtonCheck className={classes.button()} />
    </div>
  );
};
