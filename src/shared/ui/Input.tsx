import React, { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  base: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = (props: Props): React.ReactElement | null => {
  return <input {...props} className={input(props)} />;
};
