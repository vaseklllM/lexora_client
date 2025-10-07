import { ICard } from "@/api/schemas/card.schema";
import { useTypeItGameStore } from "../model/store";

export function useActiveCard(): ICard;
export function useActiveCard<T>(selector: (card: ICard) => T): T;
export function useActiveCard<T>(selector?: (card: ICard) => T): T | ICard {
  return useTypeItGameStore((store) => {
    return selector ? selector(store.card) : store.card;
  })!;
}
