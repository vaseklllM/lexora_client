import { ButtonHTMLAttributes, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { CheckIcon } from "../icons/Check";
import { EditIcon } from "../icons/Edit";
import { PlusIcon } from "../icons/Plus";

const classesSlots = tv({
  slots: {
    button: "btn text-base-content/60 h-8 w-8 rounded-full p-0",
  },
  variants: {
    icon: {
      check: {
        button: "text-accent",
      },
      edit: {
        button: "text-base-content/60",
      },
      cancel: {
        button: "text-error",
      },
    },
    disabled: {
      true: {
        button: "text-base-content/30",
      },
    },
    variant: {
      ghost: {
        button: "btn-ghost",
      },
      dash: {
        button: "btn-dash",
      },
    },
  },
  compoundVariants: [
    {
      variant: "dash",
      icon: "cancel",
      class: {
        button: "btn-error text-primary-content",
      },
    },
    {
      variant: "dash",
      icon: "check",
      class: {
        button: "btn-success text-primary-content",
      },
    },
  ],
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: "edit" | "check" | "cancel";
  variant?: "ghost" | "dash";
}

export const ButtonIcon = (props: Props): ReactElement => {
  const {
    icon,
    className,
    disabled,
    type = "button",
    variant = "ghost",
    ...buttonProps
  } = props;
  const classes = classesSlots({ disabled, icon, variant });

  return (
    <button
      {...buttonProps}
      className={classes.button({ className })}
      disabled={disabled}
      type={type}
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

function Icon(props: Pick<Props, "icon">) {
  const classes = iconClasses();

  switch (props.icon) {
    case "edit":
      return <EditIcon />;

    case "check":
      return <CheckIcon height="22px" width="22px" />;

    case "cancel":
      return <PlusIcon className={classes.plus()} height="24px" width="24px" />;
  }
}
