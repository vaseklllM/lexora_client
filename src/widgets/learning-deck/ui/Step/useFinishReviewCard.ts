import {
  finishReviewCard,
  FinishReviewCardTypeOfStrategy,
} from "@/api/deck/finish-review-card";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { GameCardsControllerFinishReviewCardHandler } from "@/features/game-cards-controller";
import { useCallback } from "react";
import { StepComponentProps } from ".";
import { useLearningDeckStore } from "../../model/store";

export const useFinishReviewCard = (props: StepComponentProps) => {
  const finishReviewCardHandler = useCallback(
    async (
      typeOfStrategy: FinishReviewCardTypeOfStrategy,
      args: Parameters<GameCardsControllerFinishReviewCardHandler>[0],
    ) => {
      const store = useLearningDeckStore.getState();

      if (store.mode !== "repeat") return;

      await finishReviewCard({
        cardId: args.card.id,
        isCorrectAnswer: args.isGuessed,
        typeOfStrategy,
      });

      await revalidateGetDeck(props.deck.id);
    },
    [props.deck.id],
  );

  const typeItCardHandler =
    useCallback<GameCardsControllerFinishReviewCardHandler>(
      (args) => {
        finishReviewCardHandler("type_it", args);
      },
      [finishReviewCardHandler],
    );

  const recallItCardHandler =
    useCallback<GameCardsControllerFinishReviewCardHandler>(
      (args) => {
        finishReviewCardHandler("recall_it", args);
      },
      [finishReviewCardHandler],
    );

  return {
    typeItCardHandler,
    recallItCardHandler,
  };
};
