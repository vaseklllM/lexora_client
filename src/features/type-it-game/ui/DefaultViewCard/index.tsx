import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { ButtonCheck } from "./ButtonCheck";
import { ButtonHelp } from "./ButtonHelp";
import { InputField } from "./InputField";

const classesSlots = tv({
  slots: {
    base: "flex h-full flex-col items-center justify-evenly",
    buttons:
      "grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:w-max",
    button: "md:min-w-48",
  },
});

interface Props {
  className?: string;
}

export const DefaultViewCard = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      <InputField />
      <div className={classes.buttons()}>
        <ButtonHelp className={classes.button()} />
        <ButtonCheck className={classes.button()} />
      </div>
    </div>
  );
};
