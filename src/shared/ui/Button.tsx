import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    button: "btn relative rounded-md",
    loader: "loading loading-spinner absolute",
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { isLoading, children, onClick, ...buttonProps } = props;

  const [isLoadingState, setIsLoadingState] = useState(false);

  const classes = classesSlots();

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (event) => {
      try {
        setIsLoadingState(true);
        await onClick?.(event);
      } finally {
        setIsLoadingState(false);
      }
    },
    [onClick, setIsLoadingState],
  );

  return (
    <button
      {...buttonProps}
      disabled={isLoading || isLoadingState || buttonProps.disabled}
      className={classes.button({ className: props.className })}
      onClick={clickHandler}
    >
      {children}
      {(isLoading || isLoadingState) && (
        <span className={classes.loader()}></span>
      )}
    </button>
  );
};
