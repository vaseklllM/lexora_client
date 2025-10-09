import {
  finishReviewCard,
  FinishReviewCardTypeOfStrategy,
} from "@/api/deck/finish-review-card";
import { revalidateGetDeck } from "@/api/deck/get-deck";
import { GameCardsControllerFinishReviewCardHandler } from "@/features/game-cards-controller";
import { useCallback } from "react";
import { StepComponentProps } from ".";

export const useFinishReviewCard = (props: StepComponentProps) => {
  const finishReviewCardHandler = useCallback(
    async (
      typeOfStrategy: FinishReviewCardTypeOfStrategy,
      args: Parameters<GameCardsControllerFinishReviewCardHandler>[0],
    ) => {
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

  return {
    typeItCardHandler,
  };
};
