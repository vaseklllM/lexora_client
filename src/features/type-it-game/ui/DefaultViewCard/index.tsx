import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { InputField } from "./InputField";

const classesSlots = tv({
  slots: {
    base: "flex h-full flex-col items-center gap-4",
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
    </div>
  );
};
