import { getDeck } from "@/api/deck/get-deck";
import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { ErrorStatus } from "@/shared/api-core/errorStatus";
import { routes } from "@/shared/routes";
import { LearningDeck } from "@/widgets/learning-deck";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  const result = await startLearningDeckSession({
    deckId: params.id,
  });

  if (!result.ok) {
    switch (result.data.statusCode) {
      case ErrorStatus.NOT_FOUND: {
        redirect(routes.dashboard.url());
      }
    }
  }

  const { cards, foldersBreadcrumbs, ...deck } = await getDeck(params.id);

  return (
    <LearningDeck
      cards={result.data.cards}
      foldersBreadcrumbs={foldersBreadcrumbs}
      deck={deck}
    />
  );
}
