import { getDeck } from "@/api/deck/get-deck";
import { ReactElement } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function DeckPage(props: Props): Promise<ReactElement> {
  const params = await props.params;
  const deck = await getDeck(params.id);

  return (
    <div>
      <pre>{JSON.stringify(deck, null, 2)}</pre>
    </div>
  );
}
