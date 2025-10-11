"use client";

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
    loader:
      "loading loading-spinner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  variants: {
    disabled: {
      true: {},
      false: {},
    },
    variant: {
      ghost: {
        button: "btn-ghost",
      },
      dash: {
        button: "btn-dash",
      },
      soft: {
        button: "btn-soft",
      },
      outline: {
        button: "btn-outline",
      },
    },
    color: {
      neutral: {
        button: "btn-neutral",
      },
      primary: {
        button: "btn-primary",
      },
      secondary: {
        button: "btn-secondary",
      },
      accent: {
        button: "btn-accent",
      },
      info: {
        button: "btn-info",
      },
      success: {
        button: "btn-success",
      },
      warning: {
        button: "btn-warning",
      },
      error: {
        button: "btn-error",
      },
    },
    size: {
      xs: {
        button: "btn-xs",
      },
      sm: {
        button: "btn-sm",
        loader: "",
      },
      md: {
        button: "btn-md",
      },
      lg: {
        button: "btn-lg",
      },
      xl: {
        button: "btn-xl",
      },
    },
    visibleLoadingSpinner: {
      true: {
        button: "btn-disabled",
        loader: "",
      },
    },
  },
});

type Color =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  color?: "neutral" | Color;
  variant?: "ghost" | "dash" | "soft" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Button = (props: ButtonProps) => {
  const { isLoading, children, onClick, color, variant, size, ...buttonProps } =
    props;

  const [isLoadingState, setIsLoadingState] = useState(false);

  const visibleLoadingSpinner = isLoading || isLoadingState;

  const classes = classesSlots({
    color,
    variant,
    size,
    visibleLoadingSpinner,
  });

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
      {visibleLoadingSpinner && <span className={classes.loader()}></span>}
    </button>
  );
};
