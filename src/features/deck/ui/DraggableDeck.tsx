"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, memo, ReactElement } from "react";
import { tv } from "tailwind-variants";
import { Deck } from "./Deck";

const classes = tv({
  base: "",
  variants: {
    isDragging: {
      true: "",
      false: "",
    },
    dragOverlay: {
      true: "",
      false: "",
    },
  },
});

export interface DeckProps {
  className?: string;
  deck: IDeck;
  isDragging?: boolean;
}

export const DraggableDeck = memo((props: DeckProps): ReactElement => {
  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: props.deck.id,
    });

  const style: CSSProperties | undefined = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <Deck
      className={classes({
        isDragging,
        className: props.className,
      })}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      deck={props.deck}
      isDragging={isDragging}
    />
  );
});

DraggableDeck.displayName = "DraggableDeck";
