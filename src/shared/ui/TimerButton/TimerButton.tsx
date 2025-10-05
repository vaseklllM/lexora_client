import { memo, ReactElement } from "react";
import { useTimer } from "react-timer-hook";
import { tv } from "tailwind-variants";
import styles from "./style.module.scss";

const classesSlots = tv({
  slots: {
    button:
      "bg-accent/20 font-regular flex h-12 w-24 cursor-pointer items-center justify-center rounded-full p-4 px-6 text-xl",
    icon: "h-full w-full",
  },
});

const strokeDashoffsetMax = 235;

interface Props {
  className?: string;
  children?: React.ReactNode;
  seconds: number;
}

export const TimerButton = memo((props: Props): ReactElement => {
  const classes = classesSlots();

  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * props.seconds),
  });

  const strokeDashoffset =
    strokeDashoffsetMax * (1 - timer.totalSeconds / props.seconds);

  return (
    <button
      className={classes.button({
        className: [props.className, styles.countdown],
      })}
    >
      <svg
        className={classes.icon({ className: styles.countdown__icon })}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 96 48"
        preserveAspectRatio="none"
      >
        <rect
          className={styles.countdown__icon__circle}
          x="2"
          y="2"
          width="92"
          height="44"
          rx="24"
          ry="24"
          style={{ strokeDashoffset, strokeDasharray: strokeDashoffsetMax }}
          transform="rotate(0 48 32) scale(1, 1)"
        />
      </svg>
      <span className="relative z-10">{props.children}</span>
    </button>
  );
});

TimerButton.displayName = "TimerButton";
