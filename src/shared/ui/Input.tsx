import React, { InputHTMLAttributes, useState } from "react";
import { tv } from "tailwind-variants";
import { EyeIcon } from "../icons/Eye";

const classesSlots = tv({
  slots: {
    base: "relative",
    inputField:
      "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-100 dark:outline-gray-700 dark:placeholder:text-gray-500",
    errorMessage: "mt-1 text-left text-xs text-red-500",
    eyeButton:
      "btn text-base-content/70 btn-ghost btn-sm btn-circle absolute top-[2px] right-[2px]",
    eyeIcon: "",
  },
  variants: {
    error: {
      true: {
        inputField: "outline-red-500",
        eyeButton: "text-red-500/70",
      },
    },
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

export const Input = (
  props: InputProps & { ref?: React.Ref<HTMLInputElement> },
): React.ReactElement | null => {
  const { error, className, ref, ...inputProps } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const classes = classesSlots({
    error: !!error,
  });

  return (
    <div className={classes.base({ className })}>
      <input
        {...inputProps}
        type={
          inputProps.type === "password"
            ? isPasswordVisible
              ? "text"
              : "password"
            : inputProps.type
        }
        ref={ref}
        className={classes.inputField()}
      />
      {error && <p className={classes.errorMessage()}>{error}</p>}
      {inputProps.type === "password" && (
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className={classes.eyeButton()}
        >
          <EyeIcon
            off={!isPasswordVisible}
            width="18px"
            height="18px"
            className={classes.eyeIcon()}
          />
        </button>
      )}
    </div>
  );
};
