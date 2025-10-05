import { ReactElement } from "react";
import { useTimer } from "react-timer-hook";
import { tv } from "tailwind-variants";
import styles from "./style.module.scss";

const classesSlots = tv({
  slots: {
    button:
      "bg-accent/20 font-regular border-accent flex h-16 w-24 cursor-pointer items-center justify-center rounded-full border p-4 px-6 text-xl",
    icon: "h-16 w-24",
  },
});

const strokeDashoffsetMax = 375.7873229980469;

interface Props {
  className?: string;
  children?: React.ReactNode;
  seconds: number;
}

export const TimerButton = (props: Props): ReactElement => {
  const classes = classesSlots();

  const timer = useTimer({
    expiryTimestamp: new Date(Date.now() + 1000 * props.seconds),
  });

  const strokeDashoffset =
    strokeDashoffsetMax - strokeDashoffsetMax * (timer.totalSeconds / 100);

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
        x="0px"
        y="0px"
        viewBox="0 0 130 130"
        overflow="visible"
        enableBackground="new 0 0 130 130"
      >
        <path
          className={styles.countdown__icon__circle}
          d="M5,64.8a59.8,59.8 0 1,0 119.6,0a59.8,59.8 0 1,0 -119.6,0"
          style={{ strokeDashoffset }}
          transform="rotate(-90 65 65) scale(-1, 1) translate(-130, 0)"
        />
      </svg>
      <span>{props.children}</span>
    </button>
  );
};
