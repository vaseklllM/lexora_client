"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { Deck as DeckEntity } from "@/entities/deck";
import { routes } from "@/shared/routes";
import { useRouter } from "next/navigation";
import { memo, ReactElement, useCallback } from "react";
import { useButtons } from "./useButtons";

export interface DeckProps {
  className?: string;
  deck: IDeck;
}

export const Deck = memo((props: DeckProps): ReactElement => {
  const buttons = useButtons(props);
  const router = useRouter();

  const clickHandler = useCallback(() => {
    router.push(routes.dashboard.deck.url(props.deck.id));
  }, [props.deck.id]);

  return (
    <DeckEntity
      {...props}
      dottedDropdownButtons={buttons}
      onClick={clickHandler}
    />
  );
});

Deck.displayName = "Deck";
