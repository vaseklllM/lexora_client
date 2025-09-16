"use client";

import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { renameDeck } from "@/api/deck/rename-deck";
import { ModalRename, ModalRenameSaveHandler } from "@/entities/modal-rename";
import { MAX_DECK_NAME_LENGTH } from "@/shared/config";
import { ReactElement, useCallback } from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  deckId?: string;
  deckName?: string;
}

export const ModalRenameDeck = (props: Props): ReactElement => {
  const saveHandler = useCallback<ModalRenameSaveHandler>(
    async ({ name, close, setNameError }) => {
      if (props.deckId) {
        try {
          await renameDeck({
            name,
            deckId: props.deckId,
          });
          await close();
          await revalidateGetDashboard();
        } catch (error) {
          if (error instanceof Error) {
            const data = JSON.parse(error.message);
            if (data?.errors?.name) {
              setNameError(data.errors.name[0]);
            }
          }
        }
      }
    },
    [props.deckId],
  );

  return (
    <ModalRename
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSave={saveHandler}
      name={props.deckName}
      title="Rename Deck"
      maxNameLength={MAX_DECK_NAME_LENGTH}
    />
  );
};
