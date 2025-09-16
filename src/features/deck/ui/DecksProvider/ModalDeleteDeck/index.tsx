"use client";

import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { ModalAgree, ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useDeckStore } from "@/features/deck/model/store";
import { ReactElement, useCallback } from "react";

export const ModalDeleteDeck = (): ReactElement => {
  const isOpen = useDeckStore((state) => state.modalDeleteDeck.isOpen);
  const closeHandler = useDeckStore((state) => state.closeModalDeleteDeck);
  const folderName = useDeckStore((state) => state.modalDeleteDeck.deck?.name);

  const onDelete = useCallback<ModalAgreeOnAgree>(async ({ closeModal }) => {
    const store = useDeckStore.getState();
    const deckId = store.modalDeleteDeck.deck?.id;
    if (typeof deckId === "string") {
      // await deleteDeck(deckId);
      await closeModal();
      await revalidateGetDashboard();
    }
    await closeModal();
  }, []);

  return (
    <ModalAgree
      isOpen={isOpen}
      onCloseModal={closeHandler}
      title={`Delete deck '${folderName}'`}
      description="Are you sure you want to delete this folder?"
      cancelButtonText="Cancel"
      agreeButtonText="Delete"
      onAgree={onDelete}
    />
  );
};
