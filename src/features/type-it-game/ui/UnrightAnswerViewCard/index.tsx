import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex h-full",
  },
});

interface Props {
  className?: string;
}

export const UnrightAnswerViewCard = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      UnrightAnswerViewCard
    </div>
  );
};
