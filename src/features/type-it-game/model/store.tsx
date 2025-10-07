"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { mixArray } from "@/shared/utils/mixArray";
import { sleep } from "@/shared/utils/sleep";
import { ComponentType, createContext, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { TypeItGameProps } from "../ui/TypeItGame";

export const UNRIGHT_ANSWER_ANIMATION_DURATION = 700;

type ButtonsVariant = "default" | "unrightAnswer";

type State = {
  cards: ICard[];
  finishedCards: string[];
  activeCardId: string;
  translationInput: string;
  isDisabledButtons: boolean;
  unrightAnswerAnimation: boolean;
  buttonsVariant: ButtonsVariant;
};

type Actions = {
  setTranslationInput: (translationInput: string) => void;
  checkTranslation: () => Promise<void>;
  nextCard: () => void;
  addFinishedCard: (cardId: string) => void;
  setIsDisabledButtons: (isDisabledButtons: boolean) => void;
  playUnrightAnswerAnimation: () => Promise<void>;
  setButtonsVariant: (buttonsVariant: ButtonsVariant) => Promise<void>;
};

type Store = State & Actions;

const Context = createContext<StoreApi<Store> | undefined>(undefined);

function initStore(props: TypeItGameProps) {
  return createStore<Store>((set, get): Store => {
    const cards = mixArray(props.cards);

    return {
      cards,
      activeCardId: cards[0]!.id,
      translationInput: "",
      finishedCards: [],
      isDisabledButtons: false,
      unrightAnswerAnimation: false,
      buttonsVariant: "default",
      setTranslationInput(translationInput) {
        set({ translationInput });
      },
      addFinishedCard(cardId) {
        set((store) => ({
          finishedCards: store.finishedCards.some((id) => id === cardId)
            ? store.finishedCards
            : [...store.finishedCards, cardId],
        }));
      },
      setIsDisabledButtons(isDisabledButtons) {
        set({ isDisabledButtons });
      },
      async playUnrightAnswerAnimation() {
        set({ unrightAnswerAnimation: true });
        await sleep(UNRIGHT_ANSWER_ANIMATION_DURATION);
        set({ unrightAnswerAnimation: false });
      },
      async setButtonsVariant(buttonsVariant) {
        set({ buttonsVariant });
      },
      nextCard() {
        const store = get();
        const activeCard = store.cards.find(
          (card) => card.id === store.activeCardId,
        );

        if (!activeCard) return;

        const activeCardIdx = store.cards.findIndex(
          (card) => card.id === store.activeCardId,
        );

        if (activeCardIdx === store.cards.length - 1 || activeCardIdx === -1) {
          set({ activeCardId: store.cards[0].id });
        } else {
          set({ activeCardId: store.cards[activeCardIdx + 1].id });
        }
      },
      async checkTranslation() {
        const store = get();
        store.setIsDisabledButtons(true);
        const activeCard = store.cards.find(
          (card) => card.id === store.activeCardId,
        );

        if (!activeCard) {
          store.setIsDisabledButtons(false);
          return;
        }

        const prepareWord = (word: string) => {
          return word
            .toLocaleLowerCase()
            .trim()
            .replaceAll(".", "")
            .replaceAll("?", "")
            .replaceAll(",", "");
        };

        if (prepareWord(store.translationInput) === "") {
          store.setIsDisabledButtons(false);
          return;
        }

        const wordsList = activeCard.textInKnownLanguage.split(",");

        if (
          wordsList.some(
            (word) => prepareWord(word) === prepareWord(store.translationInput),
          )
        ) {
          await player.playAsync(activeCard.soundUrls[0]);
          store.addFinishedCard(activeCard.id);
          store.nextCard();
        } else {
          await store.playUnrightAnswerAnimation();
          store.setButtonsVariant("unrightAnswer");
        }
        store.setIsDisabledButtons(false);
      },
    };
  });
}

export function withStoreProvider(Component: ComponentType<TypeItGameProps>) {
  return function Provider(props: TypeItGameProps) {
    const store = useRef(initStore(props));

    return (
      <Context.Provider value={store.current}>
        <Component {...props} />
      </Context.Provider>
    );
  };
}

export function useTypeItGameStore<T>(selector: (state: Store) => T): T {
  const store = useContext(Context);

  if (!store) {
    throw new Error("useTypeItGameStore must be used within a StoreProvider");
  }

  return useStore(store, selector);
}
