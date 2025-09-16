import { deleteFolderQuery } from "./delete";
import { renameFolderQuery } from "./rename";

export class FolderService {
  public readonly delete = deleteFolderQuery;
  public readonly rename = renameFolderQuery;
}

export const folderService = new FolderService();
