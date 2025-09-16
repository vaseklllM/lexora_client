"use client";

import { IDeck } from "@/api/schemas/deck.schema";
import { Deck as DeckEntity } from "@/entities/deck";
import { memo, ReactElement } from "react";
import { useButtons } from "./useButtons";

export interface DeckProps {
  className?: string;
  deck: IDeck;
}

export const Deck = memo((props: DeckProps): ReactElement => {
  const buttons = useButtons(props);

  return <DeckEntity {...props} dottedDropdownButtons={buttons} />;
});

Deck.displayName = "Deck";
