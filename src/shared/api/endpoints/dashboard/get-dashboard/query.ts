import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";
import { revalidateDashboard } from "./revalidate";
import { dashboardSchema } from "./schema";

class DashboardQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _url = "dashboard";
  private readonly _tag = `dashboard__${stackQueryKeys.next()}`;

  async fetch() {
    const result = await this.fetchInstance(this._url, {
      next: {
        tags: [this._tag],
      },
    });
    const data = await result.json();

    return v.parse(dashboardSchema, data);
  }

  revalidate() {
    revalidateDashboard(this._tag);
  }
}

export const dashboardQuery = new DashboardQuery(fetchCustom);
