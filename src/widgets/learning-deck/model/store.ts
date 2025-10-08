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
};

type Actions = {
  openStep(step: Step): void;
  reset(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: DEFAULT_STEP,
  isPlaying: false,
  stepAnimation: "forward",
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
    });
  },
}));
