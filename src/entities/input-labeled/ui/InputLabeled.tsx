import { Input } from "@/shared/ui/Input";
import React, { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const inputLabeled = tv({
  base: "block text-sm/6 font-medium text-gray-900",
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
}

export const InputLabeled = (props: Props): React.ReactElement | null => {
  return (
    <div>
      <label htmlFor={props.id} className={inputLabeled(props)}>
        {props.label}
      </label>
      <div className="mt-2">
        <Input {...props} />
      </div>
    </div>
  );
};
