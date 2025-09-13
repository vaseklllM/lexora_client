import { revalidateTag } from "next/cache";
import { FetchInstance } from "../../../core/fetchInstance";
import { Fetchable } from "../../types/Fetchable";

interface Revalidatable {
  invalidate: () => void;
}

export class MeQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchInstance) {}

  private readonly _url = "auth/me";
  private readonly _tag = "me";

  async fetch() {
    const result = await this.fetchInstance(this._url);

    return result.json();
  }

  invalidate() {
    revalidateTag(this._tag);
  }
}
