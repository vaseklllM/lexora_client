"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { mixArray } from "@/shared/utils/mixArray";
import { sleep } from "@/shared/utils/sleep";
import { ComponentType, createContext, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { TypeItGameProps } from "../ui/TypeItGame";
import { toClearWord } from "./toClearWord";

export const UNRIGHT_ANSWER_ANIMATION_DURATION = 700;

type ViewVariant = "default" | "unrightAnswer";

type State = {
  cards: ICard[];
  finishedCards: string[];
  activeCardId: string;
  translationInput: string;
  isDisabledButtonHelp: boolean;
  isDisabledButtonCheck: boolean;
  isDisabledButtonTryAgain: boolean;
  isDisabledButtonRight: boolean;
  unrightAnswerAnimation: boolean;
  viewVariant: ViewVariant;
};

type Actions = {
  setTranslationInput: (translationInput: string) => void;
  clearTranslationInput: () => void;
  checkTranslation: () => Promise<void>;
  nextCard: () => void;
  addFinishedCard: (cardId: string) => void;
  playUnrightAnswerAnimation: () => Promise<void>;
  setIsDisabledButtonHelp: (isDisabled: boolean) => void;
  setIsDisabledButtonCheck: (isDisabled: boolean) => void;
  setIsDisabledButtonTryAgain: (isDisabled: boolean) => void;
  setIsDisabledButtonRight: (isDisabled: boolean) => void;
  setViewVariant: (buttonsVariant: ViewVariant) => void;
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
      isDisabledButtonHelp: false,
      isDisabledButtonCheck: false,
      isDisabledButtonTryAgain: false,
      isDisabledButtonRight: false,
      unrightAnswerAnimation: false,
      viewVariant: "default",
      setTranslationInput(translationInput) {
        set({ translationInput });
      },
      clearTranslationInput() {
        set({ translationInput: "" });
      },
      addFinishedCard(cardId) {
        set((store) => ({
          finishedCards: store.finishedCards.some((id) => id === cardId)
            ? store.finishedCards
            : [...store.finishedCards, cardId],
        }));
      },
      setIsDisabledButtonHelp(isDisabledButtonHelp) {
        set({ isDisabledButtonHelp });
      },
      setIsDisabledButtonCheck(isDisabledButtonCheck) {
        set({ isDisabledButtonCheck });
      },
      setIsDisabledButtonTryAgain(isDisabledButtonTryAgain) {
        set({ isDisabledButtonTryAgain });
      },
      setIsDisabledButtonRight(isDisabledButtonRight) {
        set({ isDisabledButtonRight });
      },
      async playUnrightAnswerAnimation() {
        set({ unrightAnswerAnimation: true });
        await sleep(UNRIGHT_ANSWER_ANIMATION_DURATION);
        set({ unrightAnswerAnimation: false });
      },
      setViewVariant(buttonsVariant) {
        set({ viewVariant: buttonsVariant });
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
        store.setIsDisabledButtonHelp(true);
        store.setIsDisabledButtonCheck(true);

        const activeCard = store.cards.find(
          (card) => card.id === store.activeCardId,
        );

        if (toClearWord(store.translationInput) === "" || !activeCard) {
          store.setIsDisabledButtonHelp(false);
          store.setIsDisabledButtonCheck(false);
          return;
        }

        const wordsList = activeCard.textInLearningLanguage.split(",");

        if (
          wordsList.some(
            (word) => toClearWord(word) === toClearWord(store.translationInput),
          )
        ) {
          await player.playAsync(activeCard.soundUrls[0]);
          store.addFinishedCard(activeCard.id);
          store.clearTranslationInput();
          store.nextCard();
        } else {
          await store.playUnrightAnswerAnimation();
          store.setViewVariant("unrightAnswer");
          await player.playAsync(activeCard.soundUrls[0]);
        }
        store.setIsDisabledButtonHelp(false);
        store.setIsDisabledButtonCheck(false);
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
