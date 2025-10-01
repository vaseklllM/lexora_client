"use client";

import { ICard } from "@/api/schemas/card.schema";
import { ViewCard } from "@/entities/view-card";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "bg-base-300 flex flex-col items-center gap-4 rounded-xl p-6",
    card: "h-120 w-85 p-4 shadow-xl",
  },
});

interface Props {
  className?: string;
  cards: ICard[];
}

export const PreviewStep = (props: Props): ReactElement => {
  // const [activeId, setActiveId] = useState<string>(props.cards[0].id);

  const classes = classesSlots();

  return (
    <div className={classes.base({ className: props.className })}>
      {props.cards.map((card) => (
        <ViewCard key={card.id} card={card} className={classes.card()} />
      ))}
    </div>
  );
};
