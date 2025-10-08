import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "h-3 w-3 rounded-sm",
  },
});

interface Props {
  className?: string;
  width?: string;
  height?: string;
}

export const StopIcon = (props: Props): ReactElement => {
  const classes = classesSlots();

  return (
    <div
      className={classes.base({ className: props.className })}
      style={{ backgroundColor: "currentcolor" }}
    ></div>
  );
};
