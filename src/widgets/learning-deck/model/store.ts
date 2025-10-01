import { create } from "zustand";

export enum Step {
  START,
  PREVIEW,
  PAIR_IT,
  GUESS_IT,
  RECALL_IT,
  TYPE_IT,
}

type State = {
  activeStep: Step;
};

type Actions = {
  openStep(step: Step): void;
  reset(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: Step.START,
  openStep(step: Step) {
    set({ activeStep: step });
  },
  reset() {
    set({ activeStep: Step.START });
  },
}));
