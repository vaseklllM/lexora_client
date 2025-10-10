import { card1 } from "@/shared/test/cards";
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
});
