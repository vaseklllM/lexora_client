import { startReviewDeckSession } from "@/api/deck/start-review-deck-session";
import { ModalRepeatCardsType } from "@/entities/modal-repeat-cards-type";
import { GameType } from "@/shared/types/GameType";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";

interface Props {
  deckId: string;
}

export const ModalReviewType = (props: Props): ReactElement => {
  const isOpen = useLearningDeckStore(
    (state) => state.isVisibleModalChooseReviewType,
  );

  const closeModalChooseReviewType = useLearningDeckStore(
    (state) => state.closeModalChooseReviewType,
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
    <ModalRepeatCardsType
      isOpen={isOpen}
      onClose={closeModalChooseReviewType}
      onChooseGameType={onChooseGameTypeHandler}
    />
  );
};
