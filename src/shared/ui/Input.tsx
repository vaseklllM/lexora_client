import React, { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  base: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = (props: Props): React.ReactElement | null => {
  return <input {...props} className={input(props)} />;
};
