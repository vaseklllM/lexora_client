import { ModalRepeatCardsType } from "@/entities/modal-repeat-cards-type";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement, useCallback } from "react";

interface Props {
  deckId: string;
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

  const onChooseGameTypeHandler = useCallback(async () => {
    // const result = await startReviewDeckSession({
    //   deckId: props.deckId,
    // });
    // if (result.ok) {
    //   startReviewSession(gameType, result.data.cards);
    // }
  }, [props.deckId, startReviewSession]);

  return (
    <ModalRepeatCardsType
      isOpen={isOpen}
      onClose={closeModalRepeatAllGameType}
      onChooseGameType={onChooseGameTypeHandler}
    />
  );
};
