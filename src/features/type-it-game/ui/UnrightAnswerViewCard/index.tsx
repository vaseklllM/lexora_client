import { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { useActiveCard } from "../../hooks/useActiveCard";
import { CardItem } from "../CardItem";

const classesSlots = tv({
  slots: {
    base: "flex h-full",
  },
});

interface Props {
  className?: string;
}

export const UnrightAnswerViewCard = (props: Props): ReactElement => {
  const classes = classesSlots();
  const activeCard = useActiveCard();

  return (
    <CardItem
      className={classes.base({ className: props.className })}
      title={activeCard.textInKnownLanguage}
      description={activeCard.descriptionInKnownLanguage}
    />
  );
};
