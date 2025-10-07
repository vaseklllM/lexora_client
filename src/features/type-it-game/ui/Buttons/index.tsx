import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { ButtonCheck } from "../DefaultViewCard/ButtonCheck";
import { ButtonHelp } from "../DefaultViewCard/ButtonHelp";

const classesSlots = tv({
  slots: {
    buttons:
      "mt-4 grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:w-max",
    button: "md:min-w-48",
  },
});

interface Props {
  className?: string;
}

export const Buttons = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.buttons({ className: props.className })}>
      <ButtonHelp className={classes.button()} />
      <ButtonCheck className={classes.button()} />
    </div>
  );
};
