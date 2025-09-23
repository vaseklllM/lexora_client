"use client";

import { memo, ReactElement, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import classes from "./style.module.scss";

const classesSlots = tv({
  slots: {
    col: `${classes.col} max-w-xs`,
    container: `${classes.container}`,
    front: `${classes.front}`,
    back: `${classes.back}`,
    inner: `${classes.inner} absolute top-[50%] left-0 z-2 h-full w-full p-2`,
    card: "bg-base-100 min-h-96 rounded-xl shadow-lg",
  },
  variants: {
    activeSide: {
      front: {},
      back: {
        col: `${classes.col_view_back}`,
      },
      hidden: {
        col: `${classes.col_view_hidden}`,
      },
    },
    hoverSwitch: {
      true: {
        col: `${classes.col_hover_switch}`,
      },
    },
  },
});

export type CardSide = "front" | "back" | "hidden";

interface Props {
  className?: string;
  activeSide?: CardSide;
  onSideChange?: (side: CardSide) => void;
  hoverSwitch?: boolean;
  front?: ReactElement;
  back?: ReactElement;
  defaultSide?: CardSide;
}

export const Card = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>(
    props.defaultSide || "front",
  );

  const classes = classesSlots({
    activeSide,
    hoverSwitch: props.hoverSwitch,
  });

  useEffect(() => {
    if (props.activeSide) {
      setActiveSide(props.activeSide);
    }
  }, [props.activeSide]);

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
});

Card.displayName = "Card";
