import { fetchCustom, FetchCustomType } from "@/shared/api/core/fetchCustom";
import { stackQueryKeys } from "@/shared/api/core/stackQueryKeys";
import { idSchema } from "@/shared/schemas/id.schema";
import { revalidateTag } from "next/cache";
import * as v from "valibot";
import { Fetchable } from "../../types/Fetchable";
import { Revalidatable } from "../../types/Revalidatable";

class DashboardQuery implements Fetchable, Revalidatable {
  constructor(private readonly fetchInstance: FetchCustomType) {}

  private readonly _responseSchema = v.object({
    // id: idSchema(),
    childFolders: v.array(
      v.object({
        id: idSchema(),
        // name: "My decks",
        // createdAt: "2025-09-08T21:06:18.197Z",
        // updatedAt: "2025-09-08T21:09:06.112Z",
        // numberOfCards: 0,
      }),
    ),
    childDecks: v.array(
      v.object({
        id: idSchema(),
        // name: "Desk name",
        // numberOfNewCards: 5,
        // numberOfCardsInProgress: 0,
        // numberOfCardsNeedToReview: 0,
        // languageWhatIKnow: {
        //   code: "uk",
        //   name: "Ukrainian",
        //   nativeName: "Українська",
        //   iconSymbol: "🇺🇦",
        // },
        // languageWhatILearn: {
        //   code: "en",
        //   name: "English",
        //   nativeName: "English",
        //   iconSymbol: "🇺🇸",
        // },
        // numberOfCards: 5,
        // numberOfCardsLearned: 0,
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
