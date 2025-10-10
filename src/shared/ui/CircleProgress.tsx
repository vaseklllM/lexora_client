import { CSSProperties, ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "radial-progress bg-base-200 text-base-content border-base-300/0 border-2 text-sm",
  },
});

interface Props {
  className?: string;
  value?: number;
}

export const CircleProgress = (props: Props): ReactElement | null => {
  const classes = classesSlots();

  if (typeof props.value !== "number") {
    return null;
  }

  return (
    <div
      style={
        {
          "--value": props.value,
          "--size": "30px",
          "--thickness": "2px",
        } as CSSProperties
      }
      aria-valuenow={props.value}
      role="progressbar"
      className={classes.base({ className: props.className })}
    >
      {Math.round(props.value / 10)}
    </div>
  );
};
