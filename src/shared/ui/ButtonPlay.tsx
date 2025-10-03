import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  useCallback,
} from "react";
import { tv } from "tailwind-variants";
import { PlayIcon } from "../icons/Play";

const classesSlots = tv({
  slots: {
    button: "btn btn-circle btn-primary h-10 w-10 rounded-full sm:h-9 sm:w-9",
    icon: "ml-0.5",
  },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonPlay = (props: Props): ReactElement => {
  const { onClick, className, ...buttonProps } = props;

  const classes = classesSlots();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <button
      {...buttonProps}
      className={classes.button({ className })}
      onClick={clickHandler}
    >
      <PlayIcon className={classes.icon()} />
    </button>
  );
};
