import { renameFolderQuery } from "./rename";

export class FolderService {
  public readonly rename = renameFolderQuery;
}

export const folderService = new FolderService();
