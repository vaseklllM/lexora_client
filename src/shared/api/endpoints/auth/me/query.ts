import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { revalidateTag } from "next/cache";
import { FetchInstance } from "../../../core/fetchInstance";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";

export class MeQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchInstance) {}

  private readonly _url = "auth/me";
  private readonly _tag = `auth-me__${stackQueryKeys.next()}`;

  async fetch() {
    const result = await this.fetchInstance(this._url);

    return result.json();
  }

  revalidate() {
    revalidateTag(this._tag);
  }
}
