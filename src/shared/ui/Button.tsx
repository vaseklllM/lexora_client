import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "btn btn-primary rounded-md",
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
}

export const Button = (props: Props) => {
  const { isLoading, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      disabled={isLoading || buttonProps.disabled}
      className={button(props)}
    >
      Sign in
    </button>
  );
};
