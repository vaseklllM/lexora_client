import { getDeck } from "@/api/deck/get-deck";
import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";
import { LearningDeckSection } from "@/widgets/learning-deck-section";

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

  const { cards, foldersBreadcrumbs, ...deck } = await getDeck(params.id);

  return (
    <LearningDeckSection
      cards={result.cards}
      foldersBreadcrumbs={foldersBreadcrumbs}
      deck={deck}
    />
  );
}
