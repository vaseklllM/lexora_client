"use server";

import { deckService } from "@/shared/api/endpoints/deck/deck.service";
import { Inputs } from "./ModalCreateDeck";

export const createDeck = async (inputs: Inputs, folderId?: string) => {
  await deckService.create.fetch({
    name: inputs.deck_name,
    languageWhatIKnowCode: inputs.languageWhatIKnowCode,
    languageWhatILearnCode: inputs.languageWhatILearnCode,
    folderId,
  });
};
