import { create } from "zustand";

export enum Step {
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
  resetStep(): void;
};

type Store = State & Actions;

export const useLearningDeckStore = create<Store>((set) => ({
  activeStep: Step.PREVIEW,
  openStep(step: Step) {
    set({ activeStep: step });
  },
  resetStep() {
    set({ activeStep: Step.PREVIEW });
  },
}));
