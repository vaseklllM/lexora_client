import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { renameFolderSchema } from "./schema";

interface Args {
  newName: string;
  id: string;
}

class RenameFolderQuery implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "folder/rename";

  async fetch(args: Args) {
    const result = await this.fetchInstance(this._url, {
      method: "PATCH",
      body: args,
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message);
    }

    return v.parse(renameFolderSchema, data);
  }
}

export const renameFolderQuery = new RenameFolderQuery(fetchCustom);
