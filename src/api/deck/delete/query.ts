import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { deleteDeckSchema } from "./schema";

class DeleteDeckQuery implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "deck/delete";

  async fetch(deckId: string) {
    const result = await this.fetchInstance(this._url, {
      method: "DELETE",
      body: { deckId },
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(data.message);
    }

    return v.parse(deleteDeckSchema, data);
  }
}

export const deleteDeckQuery = new DeleteDeckQuery(fetchCustom);
