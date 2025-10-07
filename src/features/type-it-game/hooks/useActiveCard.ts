import { ICard } from "@/api/schemas/card.schema";
import { useTypeItGameStore } from "../model/store";

export const useActiveCard = (): ICard => {
  return useTypeItGameStore((store) =>
    store.cards.find((card) => card.id === store.activeCardId),
  )!;
};
