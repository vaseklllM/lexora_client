import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { createFolderSchema } from "./schema";

interface Args {
  name: string;
  parentFolderId?: string;
}

class CreateFolderQuery implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "folder/create";

  async fetch(args: Args) {
    const result = await this.fetchInstance(this._url, {
      method: "POST",
      body: args,
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message);
    }

    return v.parse(createFolderSchema, data);
  }
}

export const createFolderQuery = new CreateFolderQuery(fetchCustom);
