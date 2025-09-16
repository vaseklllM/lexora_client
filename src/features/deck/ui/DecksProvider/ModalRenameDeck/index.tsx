"use client";

import { useDeckStore } from "@/features/deck/model/store";
import { ModalRenameDeck as ModalRenameDeckComponent } from "@/features/modal-rename-deck";
import { ReactElement } from "react";

export const ModalRenameDeck = (): ReactElement => {
  const isOpen = useDeckStore((state) => state.modalRenameDeck.isOpen);
  const closeHandler = useDeckStore((state) => state.closeModalRenameDeck);
  const deck = useDeckStore((state) => state.modalRenameDeck.deck);

  return (
    <ModalRenameDeckComponent
      isOpen={isOpen}
      onClose={closeHandler}
      deckId={deck?.id}
      deckName={deck?.name}
    />
  );
};
