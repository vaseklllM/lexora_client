import { Input, InputProps } from "@/shared/ui/Input";
import React from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "",
    labelContainer: "",
    label: "block text-sm/6 font-medium",
    required: "text-error",
    inputWrapper: "mt-2 flex w-full items-center gap-2",
    input: "w-full",
  },
  variants: {
    rightLabel: {
      true: {
        labelContainer: "flex items-center justify-between",
      },
    },
  },
});

interface InputLabeledProps extends InputProps {
  className?: string;
  labelClassName?: string;
  label: string;
  rightLabel?: React.ReactNode;
  inputWrapperClassName?: string;
  inputClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
  required?: boolean;
  actionButton?: React.ReactNode;
}

export const InputLabeled = (
  props: InputLabeledProps,
): React.ReactElement | null => {
  const {
    rightLabel,
    label: labelProp,
    ref,
    labelClassName,
    inputWrapperClassName,
    required,
    inputClassName,
    actionButton,
    ...inputProps
  } = props;

  const classes = classesSlots({
    rightLabel: !!rightLabel,
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.labelContainer()}>
        <label
          htmlFor={props.id}
          className={classes.label({ className: labelClassName })}
        >
          {labelProp}
          {required && <span className={classes.required()}>*</span>}
        </label>
        {rightLabel}
      </div>
      <div
        className={classes.inputWrapper({ className: inputWrapperClassName })}
      >
        <Input
          {...inputProps}
          ref={ref}
          className={classes.input({ className: inputClassName })}
        />
        {actionButton}
      </div>
    </div>
  );
};
