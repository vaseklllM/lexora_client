import { Language } from "@/api/schemas/language.schema";
import { Arrow2Icon } from "@/shared/icons/Arrow2";
import { GlobeIcon } from "@/shared/icons/Globe";
import { SelectOption } from "@/shared/ui/Select";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { LanguageSelectProps } from "../LanguageSelect";

const classesSlots = tv({
  slots: {
    dropdown: "dropdown",
    button: "btn btn-ghost btn-sm btn-primary m-1 gap-0.5 rounded-xl",
    icon: "dark:text-base-content/70",
    content:
      "dropdown-content bg-base-200 dark:bg-base-100 rounded-box flex max-h-[calc(100vh-100px)] w-max flex-col gap-1 overflow-y-scroll p-2 shadow-sm",
    item: "hover:bg-base-300 dark:hover:bg-base-200 flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm font-medium",
    itemActive: "bg-base-300 dark:bg-base-200 cursor-default",
  },
  variants: {
    dropdownPosition: {
      "bottom-start": {
        dropdown: "dropdown-bottom dropdown-start",
      },
      "bottom-end": {
        dropdown: "dropdown-bottom dropdown-end",
      },
    },
  },
});

export type DropdownPosition = "bottom-start" | "bottom-end";

interface Props extends Pick<LanguageSelectProps, "onChangeLanguage"> {
  className?: string;
  dropdownPosition?: DropdownPosition;
  options: SelectOption[];
  activeLanguage: Language;
}

export const IconSelect = (props: Props): ReactElement => {
  const classes = classesSlots({
    dropdownPosition: props.dropdownPosition,
  });

  return (
    <div className={classes.dropdown({ className: props.className })}>
      <div tabIndex={1} role="button" className={classes.button()}>
        <GlobeIcon height="18px" width="18px" className={classes.icon()} />
        <Arrow2Icon height="16px" width="16px" className={classes.icon()} />
      </div>
      <div tabIndex={-1} className={classes.content()}>
        {props.options.map((option) => (
          <button
            type="button"
            key={option.value}
            className={classes.item({
              className:
                props.activeLanguage.code === option.value &&
                classes.itemActive(),
            })}
            disabled={props.activeLanguage.code === option.value}
            onClick={() => props.onChangeLanguage?.(option.value)}
          >
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
