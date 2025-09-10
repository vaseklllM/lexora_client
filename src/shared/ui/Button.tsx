import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
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
