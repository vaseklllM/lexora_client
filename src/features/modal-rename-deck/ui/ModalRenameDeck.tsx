"use client";

import { revalidateGetDashboard } from "@/api/dashboard/get-dashboard";
import { renameDeck } from "@/api/deck/rename-deck";
import { ModalRename, ModalRenameSaveHandler } from "@/entities/modal-rename";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { parseBadRequestErrors } from "@/shared/api-core/parseBadRequestErrors";
import { MAX_DECK_NAME_LENGTH } from "@/shared/config/config";
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
      if (!props.deckId) return;

      const result = await renameDeck({
        name,
        deckId: props.deckId,
      });
      if (result.ok) {
        await close();
        await revalidateGetDashboard();
      } else {
        switch (result.data.statusCode) {
          case ErrorStatus.BAD_REQUEST: {
            parseBadRequestErrors(
              result.data.errors,
              ({ field, firstError }) => {
                switch (field) {
                  case "name": {
                    setNameError(firstError);
                    break;
                  }
                }
              },
            );
            break;
          }

          case ErrorStatus.CONFLICT: {
            setNameError(result.data.message);
            break;
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
