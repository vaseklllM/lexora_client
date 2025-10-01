import { ButtonHTMLAttributes, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { AiIcon } from "../icons/Ai";
import { ArrowIcon } from "../icons/Arrow";
import { CheckIcon } from "../icons/Check";
import { DeleteIcon } from "../icons/Delete";
import { EditIcon } from "../icons/Edit";
import { PlayIcon } from "../icons/Play";
import { PlusIcon } from "../icons/Plus";
import { SoundIcon } from "../icons/Sound";

const classesSlots = tv({
  slots: {
    button: "btn h-8 w-8 rounded-full p-0",
    tooltip: "tooltip flex",
  },
  variants: {
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
  icon:
    | "edit"
    | "check"
    | "cancel"
    | "ai"
    | "delete"
    | "sound"
    | "arrow_left"
    | "arrow_right"
    | "play";
  variant?: "ghost" | "dash" | "soft" | "outline";
  color?: "neutral" | Color;
  textColor?: Color;
  tooltip?: string;
  iconWidth?: string;
  iconHeight?: string;
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
    tooltip,
    iconWidth,
    iconHeight,
    ...buttonProps
  } = props;
  const classes = classesSlots({ disabled, variant, color, textColor });

  const button = (
    <button
      {...buttonProps}
      className={classes.button({ className })}
      disabled={disabled}
      type={type}
    >
      {children}
      <Icon icon={icon} iconWidth={iconWidth} iconHeight={iconHeight} />
    </button>
  );

  if (tooltip) {
    return (
      <div className={classes.tooltip()} data-tip={tooltip}>
        {button}
      </div>
    );
  }

  return button;
};

const iconClasses = tv({
  slots: {
    plus: "rotate-45",
    arrow: "",
    arrowLeft: "",
    arrowRight: "rotate-180",
    play: "translate-x-0.5",
  },
});

function Icon(props: Pick<Props, "icon" | "iconWidth" | "iconHeight">) {
  const classes = iconClasses();

  switch (props.icon) {
    case "edit":
      return <EditIcon height="18px" width="18px" />;

    case "check":
      return <CheckIcon height="22px" width="22px" />;

    case "cancel":
      return <PlusIcon className={classes.plus()} height="24px" width="24px" />;

    case "ai":
      return <AiIcon height="16px" width="16px" />;

    case "delete":
      return <DeleteIcon height="18px" width="18px" />;

    case "sound":
      return <SoundIcon height="18px" width="18px" />;

    case "arrow_left":
    case "arrow_right":
      return (
        <ArrowIcon
          height={props.iconHeight || "18px"}
          width={props.iconWidth || "18px"}
          className={classes.arrow({
            className:
              props.icon === "arrow_left"
                ? classes.arrowLeft()
                : classes.arrowRight(),
          })}
        />
      );

    case "play":
      return (
        <PlayIcon
          height={props.iconHeight || "14px"}
          width={props.iconWidth || "14px"}
          className={classes.play()}
        />
      );
  }
}
