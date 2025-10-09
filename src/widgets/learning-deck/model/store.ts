import { ICard } from "@/api/schemas/card.schema";
import { GameType } from "@/shared/types/Game";
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

type State = {
  activeStep: Step;
  stepAnimation: "forward" | "backward";
  isPlaying: boolean;
  mode?: "learning" | "repeat";
  cards: ICard[];
  isVisibleModalRepeatGameType: boolean;
  isVisibleModalRepeatAllGameType: boolean;
};

type Actions = {
  openStep(step: Step): void;
  startLearningSession(cards: ICard[]): void;
  stopSession(): void;
  startReviewSession(type: GameType, cards: ICard[]): void;
  openModalRepeatGameType(): void;
  closeModalRepeatGameType(): void;
  openModalRepeatAllGameType(): void;
  closeModalRepeatAllGameType(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: DEFAULT_STEP,
  isPlaying: false,
  stepAnimation: "forward",
  cards: [],
  isVisibleModalRepeatGameType: false,
  isVisibleModalRepeatAllGameType: false,
  startLearningSession(cards: ICard[]) {
    set({
      cards: cards,
      activeStep: Step.PREVIEW,
      mode: "learning",
      stepAnimation: "forward",
      isPlaying: true,
    });
  },
  stopSession() {
    set((prev) => {
      switch (prev.mode) {
        case "learning":
        case "repeat":
          return {
            isPlaying: false,
            mode: undefined,
            stepAnimation: "backward",
            activeStep: DEFAULT_STEP,
            cards: [],
          };

        default:
          return prev;
      }
    });
  },
  openStep(step: Step) {
    set((prev) => {
      if (prev.activeStep === Step.START && step !== Step.PREVIEW) {
        return prev;
      }

      return {
        activeStep: step,
        isPlaying: step === Step.START ? false : true,
        stepAnimation: step === Step.START ? "backward" : "forward",
      };
    });
  },
  startReviewSession(type: GameType, cards: ICard[]) {
    set({
      cards,
      isPlaying: true,
      mode: "repeat",
      stepAnimation: "forward",
      activeStep: ((): Step => {
        switch (type) {
          case "pairIt":
            return Step.PAIR_IT;

          case "guessIt":
            return Step.GUESS_IT;

          case "recallIt":
            return Step.RECALL_IT;

          case "typeIt":
            return Step.TYPE_IT;
        }
      })(),
    });
  },
  openModalRepeatGameType() {
    set({ isVisibleModalRepeatGameType: true });
  },
  closeModalRepeatGameType() {
    set({ isVisibleModalRepeatGameType: false });
  },
  openModalRepeatAllGameType() {
    set({ isVisibleModalRepeatAllGameType: true });
  },
  closeModalRepeatAllGameType() {
    set({ isVisibleModalRepeatAllGameType: false });
  },
}));
