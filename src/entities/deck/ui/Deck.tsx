import { IDeck } from "@/api/schemas/deck.schema";
import { DropdownItem, DropdownMenu } from "@/entities/dropdown-menu";
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
    progressContent: "w-full",
    progressContentText: "flex items-center justify-between gap-2",
    numberOfCards: "text-sm font-medium",
    progress: "progress progress-primary opacity-80",
    numberOfCardsProgress: "text-sm font-medium",
    dottedButton: "absolute top-2 right-2",
  },
  variants: {
    isCards: {
      true: {
        numberOfCards: "text-base-content/80",
        numberOfCardsProgress: "text-base-content/60",
      },
      false: {
        numberOfCards: "text-base-content/20",
        numberOfCardsProgress: "text-base-content/20",
        progress: "bg-base-content/10",
      },
    },
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

  const classes = classesSlots({
    isCards: deck.numberOfCards > 0,
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
        <div className={classes.progressContent()}>
          <div className={classes.progressContentText()}>
            <p className={classes.numberOfCards()}>
              {countOf(deck.numberOfCards, "card")}
            </p>
            <p className={classes.numberOfCardsProgress()}>
              {props.deck.masteryScore}%
            </p>
          </div>
          <progress
            className={classes.progress()}
            value={props.deck.masteryScore}
            max="100"
          ></progress>
        </div>
        <ButtonPlay disabled={deck.numberOfCards === 0} onClick={onPlay} />
      </div>
    </div>
  );
};
