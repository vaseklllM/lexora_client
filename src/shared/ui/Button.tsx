import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    button: "btn rounded-md",
    loader: "loading loading-spinner",
  },
  variants: {
    btnType: {
      primary: {
        button: "btn-primary",
        loader: "text-primary",
      },
      secondary: {
        button: "btn-secondary",
        loader: "text-secondary",
      },
      accent: {
        button: "btn-accent",
        loader: "text-accent",
      },
      neutral: {
        button: "btn-neutral",
        loader: "text-neutral",
      },
      info: {
        button: "btn-info",
        loader: "text-info",
      },
      success: {
        button: "btn-success",
        loader: "text-success",
      },
      warning: {
        button: "btn-warning",
        loader: "text-warning",
      },
      error: {
        button: "btn-error",
        loader: "text-error",
      },
    },
  },
});

type ButtonType =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  btnType?: ButtonType;
}

export const Button = (props: ButtonProps) => {
  const { isLoading, children, btnType = "primary", ...buttonProps } = props;

  const classes = classesSlots({
    btnType,
  });

  return (
    <button
      {...buttonProps}
      disabled={isLoading || buttonProps.disabled}
      className={classes.button({ className: props.className })}
    >
      {isLoading ? <span className={classes.loader()}></span> : children}
    </button>
  );
};
