import { createFolderQuery } from "./create";
import { deleteFolderQuery } from "./delete/query";

export class FolderService {
  public readonly create = createFolderQuery;
  public readonly delete = deleteFolderQuery;
}

export const folderService = new FolderService();
