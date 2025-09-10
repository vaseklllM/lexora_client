import React, { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const input = tv({
  slots: {
    base: "",
    inputField:
      "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
    errorMessage: "mt-1 text-xs text-red-500",
  },
  variants: {
    error: {
      true: {
        inputField: "outline-red-500",
      },
    },
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

export const Input = (props: InputProps): React.ReactElement | null => {
  const { error, className, ...inputProps } = props;

  const { base, inputField, errorMessage } = input({
    error: !!error,
    className,
  });

  return (
    <div className={base()}>
      <input {...inputProps} className={inputField()} />
      {error && <p className={errorMessage()}>{error}</p>}
    </div>
  );
};
