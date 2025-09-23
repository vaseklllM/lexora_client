"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import classes from "./style.module.scss";

const classesSlots = tv({
  slots: {
    col: `${classes.col} ${classes.col_hover_switch} max-w-2xs`,
    container: `${classes.container}`,
    front: `${classes.front} shadow-md/20`,
    back: `${classes.back} shadow-md/20`,
    inner: `${classes.inner}`,

    // base: "bg-base-content/5 relative min-h-80 max-w-2xs rounded-xl p-5 pr-5 pb-5 pl-5 shadow-md/20 duration-250 ease-linear perspective-distant",
    // text: "text-base-content/100",
    // buttonSwitch: "absolute top-3 right-3",
    // front: "",
    // back: "",
  },
  variants: {
    activeSide: {
      front: {
        // base: "",
      },
      back: {
        col: `${classes.col_view_back}`,
      },
    },
  },
});

export type CardSide = "front" | "back";

interface Props {
  className?: string;
  activeSide?: CardSide;
  onSideChange?: (side: CardSide) => void;
}

export const Card = (props: Props): ReactElement => {
  const classes = classesSlots({ activeSide: props.activeSide });

  return (
    <>
      <div className={classes.col()}>
        <div className={classes.container()}>
          <div className={classes.front()}>
            <div className={classes.inner()}>
              <p>Diligord</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div className={classes.back()}>
            <div className={classes.inner()}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
                cum repellat velit quae suscipit c.
              </p>
            </div>
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
