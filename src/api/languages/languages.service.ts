import { allQuery } from "./all";

class LanguagesService {
  public readonly all = allQuery;
}

export const languagesService = new LanguagesService();
