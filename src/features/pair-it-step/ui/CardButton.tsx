import { ReactElement } from "react";
import { tv } from "tailwind-variants";

export type Position = "left" | "right";

const classesSlots = tv({
  slots: {
    base: "bg-base-100 text-base-content hover:bg-base-200 w-50 cursor-pointer rounded-xl p-4 text-sm",
  },
  variants: {
    isActive: {
      true: {
        base: "bg-primary text-primary-content hover:bg-primary/90",
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
  isActive?: boolean;
  position: Position;
}

export const CardButton = (props: Props): ReactElement => {
  const classes = classesSlots({
    isActive: props.isActive,
  });

  return (
    <button
      className={classes.base({ className: props.className })}
      onClick={() => {
        props.onClick?.({ id: props.id, position: props.position });
      }}
    >
      {props.title}
    </button>
  );
};
