import { card1, card2, card3, card4, card5, card6 } from "@/shared/test/cards";
import { renderHook } from "@testing-library/react";
import { useCardsController } from "./useCardsController";

jest.mock("@/shared/utils/mixArray", () => ({
  mixArray: jest.fn((arr) => arr),
}));

describe("useCardsController", () => {
  it("should return empty array", () => {
    const { result } = renderHook(() => useCardsController([]));
    expect(result.current.cards).toEqual([]);
  });

  it("should return one card", () => {
    const { result } = renderHook(() => useCardsController([card1]));
    expect(result.current.cards).toEqual([card1]);
  });

  it("should return all five cards", () => {
    const { result } = renderHook(() =>
      useCardsController([card1, card2, card3, card4, card5]),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
  });

  it("should return first five cards", () => {
    const { result } = renderHook(() =>
      useCardsController([card1, card2, card3, card4, card5, card6]),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
  });
});
