import { create } from "zustand";

type State = {
  draggingDeckId?: string;
  movedDeckIds: string[];
};

type Actions = {
  setDraggingDeckId: (id: string | undefined) => void;
  addMovedDeckId: (id: string) => void;
  clearMovedDeckIds: () => void;
};

type Store = State & Actions;

export const useSectionStore = create<Store>((set) => ({
  draggingDeckId: undefined,
  movedDeckIds: [],
  setDraggingDeckId: (id) => {
    set({ draggingDeckId: id });
  },
  addMovedDeckId: (id) => {
    set((store) => ({ movedDeckIds: [...store.movedDeckIds, id] }));
  },
  clearMovedDeckIds: () => {
    set({ movedDeckIds: [] });
  },
}));
