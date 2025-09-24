import { ICard } from "@/api/schemas/card.schema";
import { Card, CardSide } from "@/entities/card";
import { memo, ReactElement, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    card: "",
    front: "flex h-full w-full items-center justify-center",
    buttonAdd: "btn btn-dash btn-primary rounded-full font-light",
    back: "flex h-full w-full flex-col justify-between",
  },
});

interface Props {
  className?: string;
  card: ICard;
}

export const ViewCard = memo((props: Props): ReactElement => {
  const [activeSide, setActiveSide] = useState<CardSide>("front");

  const classes = classesSlots();

  return (
    <Card
      className={classes.card({ className: props.className })}
      activeSide={activeSide}
      onSideChange={setActiveSide}
      front={
        <div className={classes.front()}>
          {props.card.textInLearningLanguage}
        </div>
      }
      back={<div>back</div>}
      hoverSwitch
    />
  );
});

ViewCard.displayName = "AddCard";
