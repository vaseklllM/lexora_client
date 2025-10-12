"use client";

import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { deleteDeck } from "@/api/deck/delete-deck";
import { ModalAgree, ModalAgreeOnAgree } from "@/entities/modal-agree";
import { useDeckStore } from "@/features/deck/model/store";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ReactElement, useCallback } from "react";

export const ModalDeleteDeck = (): ReactElement => {
  const isOpen = useDeckStore((state) => state.modalDeleteDeck.isOpen);
  const closeHandler = useDeckStore((state) => state.closeModalDeleteDeck);
  const deckName = useDeckStore((state) => state.modalDeleteDeck.deck?.name);
  const { t } = useTranslation();

  const onDelete = useCallback<ModalAgreeOnAgree>(async ({ closeModal }) => {
    const store = useDeckStore.getState();
    const deckId = store.modalDeleteDeck.deck?.id;
    if (typeof deckId === "string") {
      await deleteDeck(deckId);
      await closeModal();
      await revalidateGetDashboard();
    }
    await closeModal();
  }, []);

  return (
    <ModalAgree
      isOpen={isOpen}
      onCloseModal={closeHandler}
      title={t("modal.delete_deck.title", { deckName })}
      description={t("modal.delete_deck.description")}
      cancelButtonText={t("modal.delete_deck.buttons.cancel")}
      agreeButtonText={t("modal.delete_deck.buttons.delete")}
      onAgree={onDelete}
    />
  );
};
