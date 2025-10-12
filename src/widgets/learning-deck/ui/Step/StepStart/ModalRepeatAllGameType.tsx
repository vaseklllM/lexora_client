import { startReviewAllCardsDeckSession } from "@/api/deck/start-review-all-cards-deck-session";
import { ModalChooseGame } from "@/entities/modal-choose-game";
import { GameType } from "@/shared/types/Game";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";

interface Props {
  deckId: string;
}

export const ModalRepeatAllGameType = (props: Props): ReactElement => {
  const isOpen = useLearningDeckStore(
    (state) => state.isVisibleModalRepeatAllGameType,
  );

  const closeModalRepeatAllGameType = useLearningDeckStore(
    (state) => state.closeModalRepeatAllGameType,
  );
  const startReviewSession = useLearningDeckStore(
    (state) => state.startReviewSession,
  );

  const onChooseGameTypeHandler = useCallback(
    async (gameType: GameType) => {
      const result = await startReviewAllCardsDeckSession({
        deckId: props.deckId,
      });
      if (result.ok) {
        startReviewSession(gameType, result.data.cards);
      }
    },
    [startReviewSession, props.deckId],
  );

  return (
    <ModalChooseGame
      isOpen={isOpen}
      onClose={closeModalRepeatAllGameType}
      onChooseGameType={onChooseGameTypeHandler}
    />
  );
};
