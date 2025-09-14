import { IDeck } from "@/shared/api/endpoints/dashboard";
import { countOf } from "@/shared/utils/count-of";
import { PercentMath } from "@/shared/utils/percent-math";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 hover:bg-base-content/15 flex cursor-pointer flex-col gap-2 rounded-lg p-3 pr-4 pl-4",
    header: "flex items-center gap-2",
    headerIcon: "text-2xl",
    headerName: "text-base-content/100 text-sm font-medium",
    content: "flex items-center justify-between gap-2",
    numberOfCards: "text-sm font-medium",
    progress: "progress progress-primary opacity-80",
    numberOfCardsProgress: "text-sm font-medium",
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
}

export const Deck = (props: Props): ReactElement => {
  const classes = classesSlots();

  const numberOfCardsProgress = PercentMath.calculate(
    props.deck.numberOfCards,
    props.deck.numberOfCardsLearned,
  );

  return (
    <div className={classes.base({ className: props.className })}>
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
