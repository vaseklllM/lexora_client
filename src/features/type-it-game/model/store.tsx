"use client";

import { ICard } from "@/api/schemas/card.schema";
import { mixArray } from "@/shared/utils/mixArray";
import { ComponentType, createContext, useContext, useRef } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { TypeItGameProps } from "../ui/TypeItGame";

type State = {
  cards: ICard[];
  activeCardId: string;
  translationInput: string;
};

type Actions = {
  setTranslationInput: (translationInput: string) => void;
};

type Store = State & Actions;

const Context = createContext<StoreApi<Store> | undefined>(undefined);

function initStore(props: TypeItGameProps) {
  return createStore<Store>((set) => {
    const cards = mixArray(props.cards);

    return {
      cards,
      activeCardId: cards[0]!.id,
      translationInput: "",
      setTranslationInput(translationInput) {
        set({ translationInput });
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
