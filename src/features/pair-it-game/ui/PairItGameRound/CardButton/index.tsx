"use client";

import { memo, ReactElement, useEffect, useState } from "react";
import { tv } from "tailwind-variants";

export type Position = "left" | "right";
export type CardButtonStatus = "active" | "success" | "error";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 text-base-content hover:bg-base-200 w-full cursor-pointer rounded-xl p-3 text-sm break-words opacity-100 transition-opacity duration-300 select-none md:p-4",
  },
  variants: {
    status: {
      active: {
        base: "bg-primary text-primary-content hover:bg-primary/90",
      },
      success: {
        base: "bg-success text-success-content hover:bg-success cursor-auto",
      },
      error: {
        base: "bg-error text-error-content hover:bg-error cursor-auto",
      },
    },
    titleLength: {
      big: {
        base: "text-[10px] sm:text-xs",
      },
    },
    isHidden: {
      true: {
        base: "opacity-0",
      },
    },
  },
});

export type CardButtonClickHandler = (args: {
  id: string;
  position: Position;
}) => void;

interface Props {
  className?: string;
  title: string;
  id: string;
  onClick?: CardButtonClickHandler;
  position: Position;
  status?: CardButtonStatus;
}

export const CardButton = memo((props: Props): ReactElement => {
  const [isHidden, setIsHidden] = useState(false);

  const classes = classesSlots({
    status: props.status,
    titleLength: props.title.length >= 60 ? "big" : undefined,
    isHidden,
  });

  useEffect(() => {
    if (props.status === "success" && !isHidden) {
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    }
  }, [props.status, isHidden]);

  return (
    <button
      className={classes.base({ className: props.className })}
      onClick={() => {
        if (props.status === "success" || props.status === "error") {
          return;
        }

        props.onClick?.({ id: props.id, position: props.position });
      }}
      disabled={props.status === "success" || props.status === "error"}
    >
      {props.title}
    </button>
  );
});

CardButton.displayName = "CardButton";
