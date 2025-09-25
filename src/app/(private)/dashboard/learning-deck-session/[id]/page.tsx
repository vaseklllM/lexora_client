import { startLearningDeckSession } from "@/api/deck/start-learning-deck-session";

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

  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
