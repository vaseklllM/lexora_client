import { getDeck } from "@/api/deck/get-deck";
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

  const { cards, foldersBreadcrumbs, ...deck } = await getDeck(params.id);

  if (deck.numberOfCards <= 0) {
    redirect(routes.dashboard.url());
  }

  return (
    <LearningDeck
      foldersBreadcrumbs={foldersBreadcrumbs}
      deck={deck}
      deckCards={cards}
    />
  );
}
