import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "btn btn-primary rounded-md",
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = (props: Props) => {
  return (
    <button {...props} className={button(props)}>
      Sign in
    </button>
  );
};
