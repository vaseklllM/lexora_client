import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { ArrowIcon } from "../icons/Arrow";
import Link from "next/link";

const classesSlots = tv({
  slots: {
    button: "btn btn-circle btn-soft h-9 w-9 rounded-full",
    icon: "ml-0.5",
  },
});

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export const ButtonBack = (props: Props): ReactElement => {
  const classes = classesSlots();

  return props.href ? (
    <Link
      href={props.href}
      className={classes.button({ className: props.className })}
    >
      <ArrowIcon />
    </Link>
  ) : (
    <button
      className={classes.button({ className: props.className })}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <ArrowIcon />
    </button>
  );
};
