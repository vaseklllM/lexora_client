import { startReviewDeckSession } from "@/api/deck/start-review-deck-session";
import { ModalChooseGame } from "@/entities/modal-choose-game";
import { GameType } from "@/shared/types/Game";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";

interface Props {
  deckId: string;
}

export const ModalRepeatAllGameType = (props: Props): ReactElement => {
  const isOpen = useLearningDeckStore(
    (state) => state.isVisibleModalRepeatGameType,
  );

  const closeModalRepeatGameType = useLearningDeckStore(
    (state) => state.closeModalRepeatGameType,
  );
  const startReviewSession = useLearningDeckStore(
    (state) => state.startReviewSession,
  );

  const onChooseGameTypeHandler = useCallback(
    async (gameType: GameType) => {
      const result = await startReviewDeckSession({
        deckId: props.deckId,
      });
      if (result.ok) {
        startReviewSession(gameType, result.data.cards);
      }
    },
    [props.deckId, startReviewSession],
  );

  return (
    <ModalChooseGame
      isOpen={isOpen}
      onClose={closeModalRepeatGameType}
      onChooseGameType={onChooseGameTypeHandler}
    />
  );
};
