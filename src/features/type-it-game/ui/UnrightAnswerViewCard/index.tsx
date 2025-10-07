import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useActiveCard } from "../../hooks/useActiveCard";
import { CardItem } from "../CardItem";
import { useTypeItGameStore } from "../../model/store";

const classesSlots = tv({
  slots: {
    base: "flex h-full flex-col items-center gap-4",
    cardItem: "flex-1",
    buttons:
      "grid w-full grid-cols-2 gap-4 transition-opacity duration-1000 md:w-max",
    button: "md:min-w-48",
  },
});

interface Props {
  className?: string;
}

export const UnrightAnswerViewCard = (props: Props): ReactElement => {
  const classes = classesSlots();
  const activeCard = useActiveCard();
  const viewVariant = useTypeItGameStore((state) => state.viewVariant);

  return (
    <div className={classes.base({ className: props.className })}>
      <CardItem
        title={activeCard.textInLearningLanguage}
        description={activeCard.descriptionInLearningLanguage}
        className={classes.cardItem()}
        isWrongAnswer={viewVariant === "unrightAnswer"}
      />
    </div>
  );
};
