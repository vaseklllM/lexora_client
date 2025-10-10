import { ReactElement, ReactNode } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    chip: "bg-base-300 inline rounded-full px-3 py-1.5 text-sm font-medium",
  },
});

interface Props {
  className?: string;
  children: ReactNode;
}

export const Chip = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div className={classes.chip({ className: props.className })}>
      {props.children}
    </div>
  );
};
