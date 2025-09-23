"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import classes from "./style.module.scss";

const classesSlots = tv({
  slots: {
    col: `${classes.col} max-w-3xs`,
    container: `${classes.container}`,
    front: `${classes.front}`,
    back: `${classes.back}`,
    inner: `${classes.inner}`,
    card: "min-h-80 rounded-xl shadow-md/20",

    // base: "bg-base-content/5 relative min-h-80 max-w-2xs rounded-xl p-5 pr-5 pb-5 pl-5 shadow-md/20 duration-250 ease-linear perspective-distant",
    // text: "text-base-content/100",
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
    <>
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
      <ButtonIcon
        icon="edit"
        onClick={() =>
          props.onSideChange?.(props.activeSide === "front" ? "back" : "front")
        }
      />
    </>
  );

  //   return (
  //     <div className={classes.base({ className: props.className })}>
  //       <div className={classes.front()}>
  //         <p className={classes.text()}>Front</p>
  //         <ButtonIcon
  //           className={classes.buttonSwitch()}
  //           icon="edit"
  //           onClick={() =>
  //             props.onSideChange?.(
  //               props.activeSide === "front" ? "back" : "front",
  //             )
  //           }
  //         />
  //       </div>
  //       <div className={classes.back()}>
  //         <p className={classes.text()}>Back</p>
  //       </div>
  //     </div>
  //   );
};
