import { ICard } from "@/api/schemas/card.schema";
import { create } from "zustand";

export enum Step {
  START = "start",
  PREVIEW = "preview",
  PAIR_IT = "pairIt",
  GUESS_IT = "guessIt",
  RECALL_IT = "recallIt",
  TYPE_IT = "typeIt",
}

export const DEFAULT_STEP = Step.START;
type ReviewType = "pairIt" | "guessIt" | "recallIt" | "typeIt";

type State = {
  activeStep: Step;
  stepAnimation: "forward" | "backward";
  isPlaying: boolean;
  cardsToLearn: ICard[];
  isVisibleModalChooseReviewType: boolean;
  review?: {
    cards: ICard[];
    type: ReviewType;
  };
};

type Actions = {
  openStep(step: Step): void;
  reset(): void;
  setCardsToLearn(cards: ICard[]): void;
  startReviewSession(type: ReviewType, cards: ICard[]): void;
  openModalChooseReviewType(): void;
  closeModalChooseReviewType(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: DEFAULT_STEP,
  isPlaying: false,
  stepAnimation: "forward",
  cardsToLearn: [],
  isVisibleModalChooseReviewType: false,
  review: undefined,
  setCardsToLearn(cards: ICard[]) {
    set({ cardsToLearn: cards });
  },
  openStep(step: Step) {
    set(() => {
      return {
        activeStep: step,
        isPlaying: step === Step.START ? false : true,
        stepAnimation: step === Step.START ? "backward" : "forward",
      };
    });
  },
  reset() {
    set({
      activeStep: DEFAULT_STEP,
      isPlaying: false,
      stepAnimation: "backward",
      cardsToLearn: [],
    });
  },
  startReviewSession(type: ReviewType, cards: ICard[]) {
    set({ review: { cards, type } });
  },
  openModalChooseReviewType() {
    set({ isVisibleModalChooseReviewType: true });
  },
  closeModalChooseReviewType() {
    set({ isVisibleModalChooseReviewType: false });
  },
}));
