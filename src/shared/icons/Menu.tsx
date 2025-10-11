import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "relative",
    line: "bg-base-content/80 absolute top-1/2 left-1/2 h-[0.8px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-300",
    firstLine:
      "-top-1.5 group-focus-within:top-1/2 group-focus-within:rotate-45",
    secondLine: "opacity-100 group-focus-within:opacity-0",
    thirdLine:
      "top-1.5 group-focus-within:top-1/2 group-focus-within:-rotate-45",
  },
  variants: {
    isActive: {
      true: {
        line: "",
        firstLine: "top-1/2 rotate-45",
        secondLine: "opacity-0",
        thirdLine: "top-1/2 -rotate-45",
      },
    },
  },
});

interface Props {
  className?: string;
  isActive?: boolean;
}

export const MenuIcon = (props: Props): ReactElement => {
  const classes = classesSlots({
    isActive: props.isActive,
  });
  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.line({ className: classes.firstLine() })} />
      <div className={classes.line({ className: classes.secondLine() })} />
      <div className={classes.line({ className: classes.thirdLine() })} />
    </div>
  );
};
