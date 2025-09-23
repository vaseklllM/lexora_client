"use client";

import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import classes from "./style.module.scss";

const classesSlots = tv({
  slots: {
    col: `${classes.col} max-w-xl`,
    container: `${classes.container}`,
    front: `${classes.front} bg-base-100`,
    back: `${classes.back} bg-base-100`,
    inner: `${classes.inner} absolute top-[50%] left-0 z-2 w-full p-2`,
    card: "min-h-96 rounded-xl shadow-lg",
  },
  variants: {
    activeSide: {
      front: {},
      back: {
        col: `${classes.col_view_back}`,
      },
    },
    hoverSwitch: {
      true: {
        col: `${classes.col_hover_switch}`,
      },
    },
  },
});

export type CardSide = "front" | "back";

interface Props {
  className?: string;
  activeSide?: CardSide;
  onSideChange?: (side: CardSide) => void;
  hoverSwitch?: boolean;
  front?: ReactElement;
  back?: ReactElement;
}

export const Card = (props: Props): ReactElement => {
  const classes = classesSlots({
    activeSide: props.activeSide,
    hoverSwitch: props.hoverSwitch,
  });

  return (
    <div className={classes.col()}>
      <div className={classes.container()}>
        <div className={classes.front({ className: classes.card() })}>
          <div className={classes.inner()}>{props.front}</div>
        </div>
        <div className={classes.back({ className: classes.card() })}>
          <div className={classes.inner()}>{props.back}</div>
        </div>
      </div>
    </div>
  );
};
