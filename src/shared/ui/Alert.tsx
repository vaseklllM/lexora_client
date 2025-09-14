import { ReactElement, ReactNode } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    alert: "alert",
    svg: "h-6 w-6 shrink-0 stroke-current",
  },
  variants: {
    type: {
      error: {
        alert: "alert-error",
      },
      success: {
        alert: "alert-success",
      },
      warning: {
        alert: "alert-warning",
      },
      info: {
        alert: "alert-info",
      },
      neutral: {
        alert: "",
      },
    },
  },
});

interface Props {
  className?: string;
  message: ReactNode;
  type?: "error" | "success" | "warning" | "info" | "neutral";
}

export const Alert = (props: Props): ReactElement => {
  const classes = classesSlots({
    type: props.type || "neutral",
  });

  return (
    <div role="alert" className={classes.alert({ className: props.className })}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes.svg()}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{props.message}</span>
    </div>
  );
};
