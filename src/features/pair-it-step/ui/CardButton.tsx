import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 text-primary-content w-50 cursor-pointer rounded-xl p-4 text-sm",
  },
});

interface Props {
  className?: string;
  title: string;
  id: string;
}

export const CardButton = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <button className={classes.base({ className: props.className })}>
      {props.title}
    </button>
  );
};
