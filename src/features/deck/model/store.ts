import { create } from "zustand";

type Deck = {
  id: string;
  name: string;
};

type State = {
  modalDeleteDeck: {
    isOpen: boolean;
    deck?: Deck;
  };

  modalRenameDeck: {
    isOpen: boolean;
    deck?: Deck;
  };
};

type Actions = {
  openModalDeleteDeck: (deck: Deck) => void;
  closeModalDeleteDeck: () => void;
  openModalRenameDeck: (deck: Deck) => void;
  closeModalRenameDeck: () => void;
};

type Store = State & Actions;

export const useDeckStore = create<Store>((set) => ({
  modalDeleteDeck: {
    isOpen: false,
  },
  modalRenameDeck: {
    isOpen: false,
  },
  openModalDeleteDeck: (deck: Deck) => {
    set((store) => ({
      modalDeleteDeck: { ...store.modalDeleteDeck, isOpen: true, deck },
    }));
  },
  closeModalDeleteDeck: () => {
    set((store) => ({
      modalDeleteDeck: {
        ...store.modalDeleteDeck,
        isOpen: false,
      },
    }));
  },
  openModalRenameDeck: (deck: Deck) => {
    set((store) => ({
      modalRenameDeck: { ...store.modalRenameDeck, isOpen: true, deck },
    }));
  },
  closeModalRenameDeck: () => {
    set((store) => ({
      modalRenameDeck: { ...store.modalRenameDeck, isOpen: false },
    }));
  },
}));
