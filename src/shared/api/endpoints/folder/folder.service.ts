import { createFolderQuery } from "./create";

export class FolderService {
  public readonly create = createFolderQuery;
}

export const folderService = new FolderService();
