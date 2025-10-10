"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { FinishCardHandler } from "@/shared/hooks/useSliceCards";
import { MistakeCardHandler } from "@/shared/hooks/useSliceCards/useSliceCards";
import { mixArray } from "@/shared/utils/mixArray";
import { memo, ReactElement, useCallback, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import {
  CardButton,
  CardButtonClickHandler,
  CardButtonStatus,
  Position,
} from "./CardButton";

const classesSlots = tv({
  slots: {
    base: "flex w-full items-center justify-center gap-4",
    content: "flex h-full w-full md:w-200",
    table: "grid h-full w-full grid-cols-2 gap-4",
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
  onFinishPart?: () => void;
  onFinishReviewCard?: FinishCardHandler;
  onMistakeCard?: MistakeCardHandler;
}

export const PairItGameRound = memo((props: Props): ReactElement => {
  const classes = classesSlots();
  const [activeLeft, setActiveLeft] = useState<string>();
  const [activeRight, setActiveRight] = useState<string>();
  const [finishedCards, setFinishedCards] = useState<string[]>([]);
  const [errorLeftCards, setErrorLeftCards] = useState<string[]>([]);
  const [errorRightCards, setErrorRightCards] = useState<string[]>([]);

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

  const addErrorCards = useCallback((left: string, right: string) => {
    setErrorLeftCards((prev) => [...prev, left]);
    setErrorRightCards((prev) => [...prev, right]);

    setTimeout(() => {
      setErrorLeftCards((prev) => prev.filter((id) => id !== left));
      setErrorRightCards((prev) => prev.filter((id) => id !== right));
    }, 1000);
  }, []);

  const clickHandler = useCallback<CardButtonClickHandler>(
    (args) => {
      if (finishedCards.includes(args.id)) {
        return;
      }
      const left = (() => {
        if (args.position !== "left") return activeLeft;
        return activeLeft === args.id ? undefined : args.id;
      })();
      const right = (() => {
        if (args.position !== "right") return activeRight;
        return activeRight === args.id ? undefined : args.id;
      })();

      switch (args.position) {
        case "left": {
          setActiveLeft(left);
          break;
        }

        case "right": {
          setActiveRight(right);
          break;
        }
      }

      if (left && right) {
        if (left === right) {
          setFinishedCards((prev) => [...prev, left]);
          const card = props.cards.find((card) => card.id === left);
          if (card) {
            props.onFinishReviewCard?.(card);
            player.playAsync(card.soundUrls[0]).then(() => {
              if (finishedCards.length === props.cards.length - 1) {
                props.onFinishPart?.();
              }
            });
          }
        } else {
          addErrorCards(left, right);
          const card = props.cards.find((card) => card.id === right);
          if (card) {
            props.onMistakeCard?.(card);
          }
        }
        setActiveLeft(undefined);
        setActiveRight(undefined);
      }
    },
    [
      finishedCards,
      activeLeft,
      activeRight,
      addErrorCards,
      props.onFinishPart,
      props.cards,
      props.onMistakeCard,
    ],
  );

  const getStatus = useCallback(
    (id: string, position: Position): CardButtonStatus | undefined => {
      switch (position) {
        case "left": {
          if (activeLeft === id) {
            return "active";
          }

          if (errorLeftCards.includes(id)) {
            return "error";
          }

          if (finishedCards.includes(id)) {
            return "success";
          }

          break;
        }

        case "right": {
          if (activeRight === id) {
            return "active";
          }

          if (errorRightCards.includes(id)) {
            return "error";
          }

          if (finishedCards.includes(id)) {
            return "success";
          }

          break;
        }
      }
    },
    [activeLeft, activeRight, errorLeftCards, errorRightCards],
  );

  return (
    <div className={classes.base({ className: props.className })}>
      <div className={classes.content()}>
        <div className={classes.table()}>
          {cards.map((card) => (
            <CardButton
              title={card.title}
              id={card.id}
              key={`${card.position}-${card.id}`}
              position={card.position}
              onClick={clickHandler}
              status={getStatus(card.id, card.position)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

PairItGameRound.displayName = "PairItGameRound";
