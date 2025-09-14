import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { dateSchema } from "@/shared/schemas/date.schema";
import { emailSchema } from "@/shared/schemas/email.schema";
import { fullNameSchema } from "@/shared/schemas/fullName.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { fetchInstance, FetchInstance } from "../../../core/fetchInstance";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";

class MeQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchInstance) {}

  private readonly _responseSchema = v.object({
    id: idSchema(),
    name: fullNameSchema(),
    email: emailSchema(),
    avatar: v.optional(v.string()),
    createdAt: dateSchema(),
    updatedAt: dateSchema(),
  });

  private readonly _url = "auth/me";
  private readonly _tag = `auth-me__${stackQueryKeys.next()}`;

  async fetch() {
    // console.log("FETCHING ME");
    const result = await this.fetchInstance(this._url);
    const data = await result.json();

    // console.log(data);

    return {
      ...data,
    };

    // return v.parse(this._responseSchema, data);
  }

  revalidate() {
    revalidateTag(this._tag);
  }
}

export const meQuery = new MeQuery(fetchInstance);
