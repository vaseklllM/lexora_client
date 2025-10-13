import { getDeck } from "@/api/deck/get-deck";
import { DeckSection } from "@/widgets/deck-section";
import { ReactElement } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeckPage(props: Props): Promise<ReactElement> {
  const params = await props.params;
  const { cards, foldersBreadcrumbs, ...deck } = await getDeck(params.id);

  return (
    <DeckSection
      foldersBreadcrumbs={foldersBreadcrumbs}
      deck={deck}
      cards={cards}
    />
  );
}
