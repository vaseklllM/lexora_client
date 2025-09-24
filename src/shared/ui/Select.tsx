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
  disabled?: boolean;
};

export interface SelectOptgroup {
  id: string | number;
  label: string;
  options: SelectOption[];
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  optgroups?: SelectOptgroup[];
  label?: string;
  ref?: React.Ref<HTMLSelectElement>;
  onChangeValue?: (value: string) => void;
}

export const Select = (props: SelectProps): ReactElement => {
  const { options, label, ref, onChangeValue, optgroups, ...selectProps } =
    props;
  const classes = classesSlots();

  const select = (
    <select
      {...selectProps}
      value={props.value}
      className={classes.select({ className: props.className })}
      onChange={(e) => {
        props.onChange?.(e);
        onChangeValue?.(e.target.value);
      }}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      ref={ref}
    >
      {Array.isArray(optgroups) && (
        <>
          {optgroups.map((optgroup) => (
            <optgroup key={optgroup.id} label={optgroup.label}>
              {optgroup.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </>
      )}
      {Array.isArray(options) && (
        <>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </>
      )}
      {/* <optgroup label="You used before">
        {[options?.[0], options?.[1]].map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </optgroup>
      <optgroup label="Other languages">
        
      </optgroup> */}
    </select>
  );

  if (label) {
    return (
      <div>
        <label className="mb-2 block text-sm/6 font-medium">{label}</label>
        {select}
      </div>
    );
  }

  return select;
};
