import { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = (props: Props) => (
  <button {...props} className={button(props)} />
);
