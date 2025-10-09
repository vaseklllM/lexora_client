import { ICard } from "@/api/schemas/card.schema";
import { ModalRepeatCardsType } from "@/entities/modal-repeat-cards-type";
import { GameType } from "@/shared/types/Game";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";

interface Props {
  deckId: string;
  deckCards: ICard[];
}

export const ModalRepeatGameType = (props: Props): ReactElement => {
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
      startReviewSession(gameType, props.deckCards);
    },
    [props.deckCards, startReviewSession],
  );

  return (
    <ModalRepeatCardsType
      isOpen={isOpen}
      onClose={closeModalRepeatAllGameType}
      onChooseGameType={onChooseGameTypeHandler}
    />
  );
};
