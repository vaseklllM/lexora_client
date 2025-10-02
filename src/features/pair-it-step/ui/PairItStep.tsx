"use client";

import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { memo, ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { CardButton, CardButtonClickHandler, Position } from "./CardButton";

const classesSlots = tv({
  slots: {
    base: "items-center justify-center gap-4",
    content: "grid grid-cols-2 gap-4",
  },
});

type PairCard = {
  id: string;
  title: string;
  position: Position;
};

interface Props {
  className?: string;
  cards: ICard[];
}

export const PairItStep = memo((props: Props): ReactElement => {
  const classes = classesSlots();
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [activeRight, setActiveRight] = useState<string | null>(null);

  const cards = useMemo(() => {
    let leftCards: PairCard[] = [];
    let rightCards: PairCard[] = [];

    props.cards.forEach((card) => {
      leftCards.push({
        id: card.id,
        title: card.textInKnownLanguage,
        position: "left",
      });

      rightCards.push({
        id: card.id,
        title: card.textInLearningLanguage,
        position: "right",
      });
    });

    leftCards = mixArray(leftCards);
    rightCards = mixArray(rightCards);

    const list: PairCard[] = [];

    for (let i = 0; i < props.cards.length; i++) {
      list.push(leftCards[i]);
      list.push(rightCards[i]);
    }

    return list;
  }, [props.cards]);

  const clickHandler = useCallback<CardButtonClickHandler>((args) => {
    switch (args.position) {
      case "left":
        setActiveLeft((prev) => (prev === args.id ? null : args.id));
        break;

      case "right":
        setActiveRight((prev) => (prev === args.id ? null : args.id));
        break;
    }
  }, []);

  const checkIsActive = useCallback(
    (id: string, position: Position) => {
      switch (position) {
        case "left":
          return activeLeft === id;
        case "right":
          return activeRight === id;
      }
    },
    [activeLeft, activeRight],
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.content()}>
        {cards.map((card) => (
          <CardButton
            title={card.title}
            id={card.id}
            key={`${card.position}-${card.id}`}
            position={card.position}
            onClick={clickHandler}
            isActive={checkIsActive(card.id, card.position)}
          />
        ))}
      </div>
    </div>
  );
});

PairItStep.displayName = "PairItStep";
