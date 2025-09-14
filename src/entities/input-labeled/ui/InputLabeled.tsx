import { Input, InputProps } from "@/shared/ui/Input";
import React from "react";
import { tv } from "tailwind-variants";

const classes = tv({
  slots: {
    base: "",
    labelContainer: "",
    label: "block w-max text-sm/6 font-medium",
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
  label: string;
  rightLabel?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export const InputLabeled = (
  props: InputLabeledProps,
): React.ReactElement | null => {
  const { rightLabel, label: labelProp, ref, ...inputProps } = props;

  const { base, label, labelContainer } = classes({
    className: props.className,
    rightLabel: !!rightLabel,
  });

  return (
    <div className={base()}>
      <div className={labelContainer()}>
        <label htmlFor={props.id} className={label()}>
          {labelProp}
        </label>
        {rightLabel}
      </div>
      <div className="mt-2">
        <Input {...inputProps} ref={ref} />
      </div>
    </div>
  );
};
