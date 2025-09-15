import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    select: "select",
  },
});

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  className?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Select = (props: SelectProps): ReactElement => {
  const classes = classesSlots();

  return (
    <select
      defaultValue={props.value}
      className={classes.select({ className: props.className })}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
