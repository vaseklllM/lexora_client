"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { mixArray } from "@/shared/utils/mixArray";
import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { tv } from "tailwind-variants";
import {
  CardButton,
  CardButtonClickHandler,
  CardButtonStatus,
  Position,
} from "./CardButton";

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
  onFinish?: () => void;
}

export const PairItGame = memo((props: Props): ReactElement => {
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

  const clickHandler = useCallback<CardButtonClickHandler>(
    (args) => {
      if (finishedCards.includes(args.id)) {
        return;
      }

      switch (args.position) {
        case "left":
          setActiveLeft((prev) => (prev === args.id ? undefined : args.id));
          break;

        case "right":
          setActiveRight((prev) => (prev === args.id ? undefined : args.id));
          break;
      }
    },
    [finishedCards],
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

  const addErrorCards = useCallback((left: string, right: string) => {
    setErrorLeftCards((prev) => [...prev, left]);
    setErrorRightCards((prev) => [...prev, right]);

    setTimeout(() => {
      setErrorLeftCards((prev) => prev.filter((id) => id !== left));
      setErrorRightCards((prev) => prev.filter((id) => id !== right));
    }, 1000);
  }, []);

  useEffect(() => {
    if (activeLeft && activeRight) {
      if (activeLeft === activeRight) {
        setFinishedCards((prev) => [...prev, activeLeft]);
        const card = props.cards.find((card) => card.id === activeLeft);
        if (card) {
          player.play(card.soundUrls[0]);
        }
      } else {
        addErrorCards(activeLeft, activeRight);
      }
      setActiveLeft(undefined);
      setActiveRight(undefined);
    }
  }, [activeLeft, activeRight]);

  useEffect(() => {
    if (finishedCards.length === props.cards.length) {
      props.onFinish?.();
    }
  }, [finishedCards.length, props.cards, props.onFinish]);

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
            status={getStatus(card.id, card.position)}
          />
        ))}
      </div>
    </div>
  );
});

PairItGame.displayName = "PairItStep";
