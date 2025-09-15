import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";
import { allSchema } from "./schema";

class AllQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "languages/all";
  private readonly _tag = `languages-all__${stackQueryKeys.next()}`;

  async fetch() {
    const result = await this.fetchInstance(this._url, {
      next: {
        tags: [this._tag],
      },
    });
    const data = await result.json();

    return v.parse(allSchema, data);
  }

  revalidate() {
    revalidateTag(this._tag);
  }
}

export const allQuery = new AllQuery(fetchCustom);
