"use client";

import { ICard } from "@/api/schemas/card.schema";
import { player } from "@/shared/hooks/usePlayer";
import { sleep } from "@/shared/utils/sleep";
import { ComponentType, createContext, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { TypeItGameProps } from "../ui/TypeItGame";
import { toClearWord } from "./toClearWord";

export const UNRIGHT_ANSWER_ANIMATION_DURATION = 700;

type ViewVariant = "default" | "unrightAnswer" | "help";

type State = {
  card: ICard;
  finishedCards: string[];
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
  addFinishedCard: (cardId: string) => void;
  playUnrightAnswerAnimation: () => Promise<void>;
  setIsDisabledButtonHelp: (isDisabled: boolean) => void;
  setIsDisabledButtonCheck: (isDisabled: boolean) => void;
  setIsDisabledButtonTryAgain: (isDisabled: boolean) => void;
  setIsDisabledButtonRight: (isDisabled: boolean) => void;
  setViewVariant: (buttonsVariant: ViewVariant) => void;
  help: () => void;
  tryAgain: () => void;
};

type Store = State & Actions;

const Context = createContext<StoreApi<Store> | undefined>(undefined);

function initStore(props: TypeItGameProps) {
  return createStore<Store>((set, get): Store => {
    return {
      card: props.card,
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
      setViewVariant(viewVariant) {
        set({ viewVariant });
      },

      async checkTranslation() {
        const store = get();
        store.setIsDisabledButtonHelp(true);
        store.setIsDisabledButtonCheck(true);

        if (toClearWord(store.translationInput) === "") {
          store.setIsDisabledButtonHelp(false);
          store.setIsDisabledButtonCheck(false);
          return;
        }

        const wordsList = store.card.textInLearningLanguage.split(",");

        if (
          wordsList.some(
            (word) => toClearWord(word) === toClearWord(store.translationInput),
          )
        ) {
          await player.playAsync(store.card.soundUrls[0]);
          store.addFinishedCard(store.card.id);
          store.clearTranslationInput();
          props.onNextCard?.();
        } else {
          await store.playUnrightAnswerAnimation();
          store.setViewVariant("unrightAnswer");
          await player.playAsync(store.card.soundUrls[0]);
        }
        store.setIsDisabledButtonHelp(false);
        store.setIsDisabledButtonCheck(false);
      },
      async help() {
        const store = get();
        store.setViewVariant("help");
        setTimeout(() => {
          store.clearTranslationInput();
        }, 300);
        await player.playAsync(store.card.soundUrls[0]);
      },
      tryAgain() {
        const store = get();
        store.setViewVariant("default");
        setTimeout(() => {
          store.clearTranslationInput();
        }, 300);
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
