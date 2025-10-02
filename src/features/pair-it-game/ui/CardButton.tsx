import { ReactElement } from "react";
import { tv } from "tailwind-variants";

export type Position = "left" | "right";
export type CardButtonStatus = "active" | "success" | "error";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 text-base-content hover:bg-base-200 w-50 cursor-pointer rounded-xl p-4 text-sm",
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

export const CardButton = (props: Props): ReactElement => {
  const classes = classesSlots({
    status: props.status,
  });

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
};
