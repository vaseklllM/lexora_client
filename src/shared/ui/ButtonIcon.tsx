import { ButtonHTMLAttributes, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { EditIcon } from "../icons/Edit";
import { PlusIcon } from "../icons/Plus";

const classesSlots = tv({
  slots: {
    button: "btn btn-ghost text-base-content/60 h-8 w-8 rounded-full p-0",
  },
  variants: {
    disabled: {
      true: {
        button: "text-base-content/30",
      },
    },
  },
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: "edit" | "save" | "cancel";
}

export const ButtonIcon = (props: Props): ReactElement => {
  const { icon, className, disabled, ...buttonProps } = props;
  const classes = classesSlots({ disabled });

  return (
    <button
      {...buttonProps}
      className={classes.button({ className })}
      disabled={disabled}
    >
      <Icon icon={icon} />
    </button>
  );
};

const iconClasses = tv({
  slots: {
    plus: "rotate-45",
  },
});

function Icon(props: Pick<Props, "icon" | "className">) {
  const classes = iconClasses();

  switch (props.icon) {
    case "edit":
      return <EditIcon className={props.className} />;

    case "save":
      return <EditIcon className={props.className} />;

    case "cancel":
      return (
        <PlusIcon
          className={classes.plus({ className: props.className })}
          height="24px"
          width="24px"
        />
      );
  }
}
