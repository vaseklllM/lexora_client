import { ButtonHTMLAttributes, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { AiIcon } from "../icons/Ai";
import { CheckIcon } from "../icons/Check";
import { DeleteIcon } from "../icons/Delete";
import { EditIcon } from "../icons/Edit";
import { PlusIcon } from "../icons/Plus";

const classesSlots = tv({
  slots: {
    button: "btn h-8 w-8 rounded-full p-0",
  },
  variants: {
    icon: {
      check: {},
      edit: {},
      cancel: {},
      ai: {},
      delete: {},
    },
    disabled: {
      true: {},
      false: {},
    },
    variant: {
      ghost: {
        button: "btn-ghost",
      },
      dash: {
        button: "btn-dash",
      },
      soft: {
        button: "btn-soft",
      },
      outline: {
        button: "btn-outline",
      },
    },
    color: {
      neutral: {
        button: "btn-neutral",
      },
      primary: {
        button: "btn-primary",
      },
      secondary: {
        button: "btn-secondary",
      },
      accent: {
        button: "btn-accent",
      },
      info: {
        button: "btn-info",
      },
      success: {
        button: "btn-success",
      },
      warning: {
        button: "btn-warning",
      },
      error: {
        button: "btn-error",
      },
    },
    textColor: {
      primary: {
        button: "text-primary",
      },
      secondary: {
        button: "text-secondary",
      },
      accent: {
        button: "text-accent",
      },
      info: {
        button: "text-info",
      },
      success: {
        button: "text-success",
      },
      warning: {
        button: "text-warning",
      },
      error: {
        button: "text-error",
      },
    },
  },
  compoundVariants: [
    {
      disabled: true,
      textColor: "primary",
      variant: "ghost",
      class: {
        button: "text-primary/30",
      },
    },
  ],
});

type Color =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: "edit" | "check" | "cancel" | "ai" | "delete";
  variant?: "ghost" | "dash" | "soft" | "outline";
  color?: "neutral" | Color;
  textColor?: Color;
}

export const ButtonIcon = (props: Props): ReactElement => {
  const {
    icon,
    className,
    disabled,
    type = "button",
    variant,
    color,
    textColor,
    children,
    ...buttonProps
  } = props;
  const classes = classesSlots({ disabled, icon, variant, color, textColor });

  return (
    <button
      {...buttonProps}
      className={classes.button({ className })}
      disabled={disabled}
      type={type}
    >
      {children}
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
      return <EditIcon height="14px" width="14px" />;

    case "check":
      return <CheckIcon height="22px" width="22px" />;

    case "cancel":
      return <PlusIcon className={classes.plus()} height="24px" width="24px" />;

    case "ai":
      return <AiIcon height="16px" width="16px" />;

    case "delete":
      return <DeleteIcon height="18px" width="18px" />;
  }
}
