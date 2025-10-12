import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "w-full",
    content: "flex items-center justify-between gap-2",
    progressOf: "text-base-content/80 text-sm font-medium",
    percent: "text-base-content/60 text-sm font-medium",
    progress: "progress progress-primary opacity-80",
  },
  variants: {
    disabled: {
      true: {
        progressOf: "text-base-content/20",
        percent: "text-base-content/20",
        progress: "bg-base-content/10",
      },
    },
    status: {
      finished: {
        progress: "progress-success",
      },
    },
  },
});

interface Props {
  className?: string;
  progressOf: string;
  percent: number;
  disabled?: boolean;
}

export const Progress = (props: Props): ReactElement => {
  const classes = classesSlots({
    disabled: props.disabled,
    status: props.percent >= 100 ? "finished" : undefined,
  });

  return (
    <div className={classes.base()}>
      <div className={classes.content()}>
        <p className={classes.progressOf()}>{props.progressOf}</p>
        <p className={classes.percent()}>{props.percent}%</p>
      </div>
      <progress
        className={classes.progress()}
        value={props.percent}
        max="100"
      ></progress>
    </div>
  );
};
