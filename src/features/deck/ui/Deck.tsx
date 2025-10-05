"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { Deck as DeckEntity } from "@/entities/deck";
import { routes } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { HTMLAttributes, memo, ReactElement, Ref, useCallback } from "react";
import { tv } from "tailwind-variants";
import styles from "./style.module.scss";
import { useButtons } from "./useButtons";

const classes = tv({
  base: "",
  variants: {
    isDragging: {
      true: styles.draggable,
      false: "",
    },
    dragOverlay: {
      true: "",
      false: "",
    },
  },
});

export interface DeckProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  deck: IDeck;
  isDragging?: boolean;
  dragOverlay?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const Deck = memo((props: DeckProps): ReactElement => {
  const { deck, className, dragOverlay, isDragging, ...lastProps } = props;

  const buttons = useButtons(props);
  const router = useRouter();

  const clickHandler = useCallback(
    (event: React.MouseEvent) => {
      if (event.altKey || event.metaKey) {
        window.open(routes.dashboard.deck.url(props.deck.id), "_blank");
      } else {
        router.push(routes.dashboard.deck.url(props.deck.id));
      }
    },
    [props.deck.id, router],
  );

  const clickPlayHandler = useCallback(() => {
    if (props.deck.numberOfCards <= 0) return;

    if (props.deck.numberOfNewCards === props.deck.numberOfCards) {
      router.push(routes.dashboard.learningDeck.url(props.deck.id));
    }
  }, [props.deck, router]);

  return (
    <DeckEntity
      {...lastProps}
      className={classes({
        className,
        dragOverlay,
        isDragging,
      })}
      deck={deck}
      dottedDropdownButtons={buttons}
      onClick={clickHandler}
      onPlay={clickPlayHandler}
      hover={isDragging}
    />
  );
});

Deck.displayName = "Deck";
