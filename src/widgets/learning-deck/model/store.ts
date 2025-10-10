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
  finishStep(step: Step): void;
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
  finishStep(step: Step) {
    set((store) => {
      if (step !== store.activeStep) {
        return store;
      }

      switch (store.mode) {
        case "repeat": {
          return {
            ...store,
            activeStep: DEFAULT_STEP,
            stepAnimation: "backward",
            isPlaying: false,
            mode: undefined,
            cards: [],
          };
        }

        case "learning": {
          switch (store.activeStep) {
            case Step.TYPE_IT: {
              return {
                ...store,
                activeStep: Step.START,
                stepAnimation: "backward",
                isPlaying: false,
                mode: undefined,
              };
            }

            case Step.START:
            case Step.PREVIEW:
            case Step.PAIR_IT:
            case Step.GUESS_IT:
            case Step.RECALL_IT: {
              const nextStepMap = {
                [Step.START]: Step.PREVIEW,
                [Step.PREVIEW]: Step.PAIR_IT,
                [Step.PAIR_IT]: Step.GUESS_IT,
                [Step.GUESS_IT]: Step.RECALL_IT,
                [Step.RECALL_IT]: Step.TYPE_IT,
              };
              return {
                ...store,
                activeStep: nextStepMap[store.activeStep],
                stepAnimation: "forward",
                isPlaying: true,
                mode: "learning",
              };
            }

            default: {
              const _check: never = store.activeStep;
              throw new Error(`Unhandled activeStep type: ${_check}`);
            }
          }
        }

        default: {
          return store;
        }
      }
    });
  },
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
