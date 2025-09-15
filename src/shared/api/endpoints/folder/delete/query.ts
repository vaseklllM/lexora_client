import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { deleteFolderSchema } from "./schema";

class DeleteFolderQuery implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "folder/delete";

  async fetch(folderId: string) {
    const result = await this.fetchInstance(this._url, {
      method: "DELETE",
      body: { id: folderId },
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message);
    }

    return v.parse(deleteFolderSchema, data);
  }
}

export const deleteFolderQuery = new DeleteFolderQuery(fetchCustom);
