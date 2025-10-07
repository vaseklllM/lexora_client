import { ICard } from "@/api/schemas/card.schema";
import { useTypeItGameStore } from "../model/store";

export function useActiveCard(): ICard;
export function useActiveCard<T>(selector: (card: ICard) => T): T;
export function useActiveCard<T>(selector?: (card: ICard) => T): T | ICard {
  return useTypeItGameStore((store) => {
    const card = store.cards.find((card) => card.id === store.activeCardId)!;
    return selector ? selector(card) : card;
  })!;
}
