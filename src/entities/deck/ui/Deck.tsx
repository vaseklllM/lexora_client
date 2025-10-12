"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { DropdownItem, DropdownMenu } from "@/entities/dropdown-menu";
import { Progress } from "@/entities/progress";
import { useLanguage } from "@/shared/config/i18n";
import { ButtonPlay } from "@/shared/ui/ButtonPlay";
import { countOf } from "@/shared/utils/count-of";
import { HTMLAttributes, ReactElement, Ref } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 relative flex cursor-pointer flex-col gap-2 rounded-lg p-3 pr-4 pl-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700",
    header: "flex items-center gap-2",
    languageIcon: "text-2xl",
    name: "text-base-content/100 w-[calc(100%-55px)] truncate text-sm font-medium",
    content: "flex items-center gap-2",

    dottedButton: "absolute top-2 right-2",
  },
  variants: {
    hover: {
      true: "bg-gray-200 dark:bg-gray-700",
      false: "",
    },
  },
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  deck: IDeck;
  dottedDropdownButtons: DropdownItem[];
  onClick?: (event: React.MouseEvent) => void;
  onPlay?: () => void;
  ref?: Ref<HTMLDivElement>;
  hover?: boolean;
}

export const Deck = (props: Props): ReactElement => {
  const {
    deck,
    className,
    dottedDropdownButtons,
    onPlay,
    hover,
    ...lastProps
  } = props;

  const language = useLanguage();

  const classes = classesSlots({
    hover,
  });

  return (
    <div {...lastProps} className={classes.base({ className })}>
      <DropdownMenu
        items={dottedDropdownButtons}
        className={classes.dottedButton()}
        buttonType="dotted"
        listPosition="end"
        listClassName="mt-1"
      />
      <div className={classes.header()}>
        <span className={classes.languageIcon()}>
          {deck.languageWhatILearn.iconSymbol}
        </span>
        <p className={classes.name()}>{deck.name}</p>
      </div>
      <div className={classes.content()}>
        <Progress
          percent={props.deck.masteryScore}
          progressOf={countOf(deck.numberOfCards, "card", language)}
          disabled={deck.numberOfCards <= 0}
        />
        <ButtonPlay disabled={deck.numberOfCards === 0} onClick={onPlay} />
      </div>
    </div>
  );
};
