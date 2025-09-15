import { deleteDeckQuery } from "./delete";

class DeckService {
  public readonly delete = deleteDeckQuery;
}

export const deckService = new DeckService();
