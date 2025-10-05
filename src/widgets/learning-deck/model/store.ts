import { create } from "zustand";

export enum Step {
  START = "start",
  PREVIEW = "preview",
  PAIR_IT = "pairIt",
  GUESS_IT = "guessIt",
  RECALL_IT = "recallIt",
  TYPE_IT = "typeIt",
}

export const DEFAULT_STEP = Step.PAIR_IT;

type State = {
  activeStep: Step;
};

type Actions = {
  openStep(step: Step): void;
  reset(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: DEFAULT_STEP,
  openStep(step: Step) {
    set({ activeStep: step });
  },
  reset() {
    set({ activeStep: DEFAULT_STEP });
  },
}));
