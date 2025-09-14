import { fetchCustom } from "@/shared/api/core/fetchCustom";
import { FetchCustomType } from "@/shared/api/core/fetchCustom/fetchCustom";
import { dateSchema } from "@/shared/schemas/date.schema";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";

class Logout implements Fetchable {
  constructor(private readonly fetchInstance: FetchCustomType) {}
  private readonly _url = "auth/logout";

  private readonly _responseSchema = v.object({
    message: v.string(),
    loggedOutAt: dateSchema(),
  });

  async fetch() {
    const result = await this.fetchInstance(this._url, {
      method: "POST",
    });
    const data = await result.json();

    return v.parse(this._responseSchema, data);
  }
}

export const logoutQuery = new Logout(fetchCustom);
