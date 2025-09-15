import { createDeckQuery } from "./create";
import { deleteDeckQuery } from "./delete";

class DeckService {
  public readonly delete = deleteDeckQuery;
  public readonly create = createDeckQuery;
}

export const deckService = new DeckService();
