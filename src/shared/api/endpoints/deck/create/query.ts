import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { createDeckSchema } from "./schema";

interface Args {
  name: string;
  languageWhatIKnowCode: string;
  languageWhatILearnCode: string;
  folderId?: string;
}

class CreateDeckQuery implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "deck/create";

  async fetch(args: Args) {
    const result = await this.fetchInstance(this._url, {
      method: "POST",
      body: args,
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message);
    }

    return v.parse(createDeckSchema, data);
  }
}

export const createDeckQuery = new CreateDeckQuery(fetchCustom);
