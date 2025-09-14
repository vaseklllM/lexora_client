import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { dateSchema } from "@/shared/schemas/date.schema";
import { idSchema } from "@/shared/schemas/id.schema";
import { languageSchema } from "@/shared/schemas/language.schema";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";

class DashboardQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _responseSchema = v.object({
    childFolders: v.array(
      v.object({
        id: idSchema(),
        name: v.string(),
        createdAt: dateSchema(),
        updatedAt: dateSchema(),
        numberOfCards: v.number(),
      }),
    ),
    childDecks: v.array(
      v.object({
        id: idSchema(),
        name: v.string(),
        numberOfNewCards: v.number(),
        numberOfCardsInProgress: v.number(),
        numberOfCardsNeedToReview: v.number(),
        numberOfCards: v.number(),
        numberOfCardsLearned: v.number(),
        languageWhatIKnow: languageSchema(),
        languageWhatILearn: languageSchema(),
      }),
    ),
  });

  private readonly _url = "dashboard";
  private readonly _tag = `dashboard__${stackQueryKeys.next()}`;

  async fetch() {
    const result = await this.fetchInstance(this._url, {
      next: {
        tags: [this._tag],
      },
    });
    const data = await result.json();

    return v.parse(this._responseSchema, data);
  }

  revalidate() {
    revalidateTag(this._tag);
  }
}

export const dashboardQuery = new DashboardQuery(fetchCustom);
