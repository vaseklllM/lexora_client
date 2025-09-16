import { IDeck } from "@/api/schemas/deck.schema";
import { DropdownItem, DropdownMenu } from "@/entities/dropdown-menu";
import { countOf } from "@/shared/utils/count-of";
import { PercentMath } from "@/shared/utils/percent-math";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 hover:bg-base-content/15 relative flex cursor-pointer flex-col gap-2 rounded-lg p-3 pr-4 pl-4",
    header: "flex items-center gap-2",
    headerIcon: "text-2xl",
    headerName: "text-base-content/100 text-sm font-medium",
    content: "flex items-center justify-between gap-2",
    numberOfCards: "text-sm font-medium",
    progress: "progress progress-primary opacity-80",
    numberOfCardsProgress: "text-sm font-medium",
    dottedButton: "absolute top-2 right-2",
  },
  variants: {
    isNumberOfCards: {
      true: {
        numberOfCards: "text-base-content/60",
        numberOfCardsProgress: "text-base-content/60",
      },
      false: {
        numberOfCards: "text-base-content/30",
        numberOfCardsProgress: "text-base-content/30",
      },
    },
  },
});

interface Props {
  className?: string;
  deck: IDeck;
  dottedDropdownButtons: DropdownItem[];
}

export const Deck = (props: Props): ReactElement => {
  const classes = classesSlots();

  const numberOfCardsProgress = PercentMath.calculate(
    props.deck.numberOfCards,
    props.deck.numberOfCardsLearned,
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <DropdownMenu
        items={props.dottedDropdownButtons}
        className={classes.dottedButton()}
        buttonType="dotted"
        listPosition="end"
        listClassName="mt-1"
      />
      <div className={classes.header()}>
        <span className={classes.headerIcon()}>
          {props.deck.languageWhatILearn.iconSymbol}
        </span>
        <p className={classes.headerName()}>{props.deck.name}</p>
      </div>
      <div className={classes.content()}>
        <p
          className={classes.numberOfCards({
            isNumberOfCards: props.deck.numberOfCards > 0,
          })}
        >
          {countOf(props.deck.numberOfCards, "card")}
        </p>
        <p className={classes.numberOfCardsProgress()}>
          {numberOfCardsProgress}%
        </p>
      </div>
      <progress
        className={classes.progress()}
        value={numberOfCardsProgress}
        max="100"
      ></progress>
    </div>
  );
};
