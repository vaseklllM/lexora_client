import {
  card1,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
  card16,
  card17,
  card18,
  card19,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
} from "@/shared/test/cards";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useSliceCards } from "./useSliceCards";

describe("useCardsController", () => {
  it("should return empty array", () => {
    const { result } = renderHook(() => useSliceCards({ cards: [] }));
    expect(result.current.cards).toEqual([]);
    expect(result.current.numberOfCards).toEqual(0);
    expect(result.current.numberOfFinishedCards).toEqual(0);
  });

  it("should return one card", () => {
    const { result } = renderHook(() => useSliceCards({ cards: [card1] }));
    expect(result.current.cards).toEqual([card1]);
    expect(result.current.numberOfCards).toEqual(1);
    expect(result.current.numberOfFinishedCards).toEqual(0);
  });

  it("should return all five cards", () => {
    const { result } = renderHook(() =>
      useSliceCards({ cards: [card1, card2, card3, card4, card5] }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(0);

    act(() => {
      result.current.finishCard(card1);
    });
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(1);

    act(() => {
      result.current.finishCard(card2);
    });
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(2);

    act(() => {
      result.current.finishCard(card3);
    });
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(3);

    act(() => {
      result.current.finishCard(card4);
    });
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(4);

    act(() => {
      result.current.finishCard(card5);
    });
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(5);
    expect(result.current.numberOfFinishedCards).toEqual(5);
  });

  it("should return first five cards", () => {
    const { result } = renderHook(() =>
      useSliceCards({ cards: [card1, card2, card3, card4, card5, card6] }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(6);
    expect(result.current.numberOfFinishedCards).toEqual(0);
  });

  it("should return one card from second part", () => {
    const { result } = renderHook(() =>
      useSliceCards({ cards: [card1, card2, card3, card4, card5, card6] }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(result.current.numberOfCards).toEqual(6);
    expect(result.current.numberOfFinishedCards).toEqual(0);
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card6]);
    expect(result.current.numberOfCards).toEqual(6);
    expect(result.current.numberOfFinishedCards).toEqual(0);
  });

  it("should call onFinish if the all cards are guessed", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useSliceCards({
        cards: [card1, card2, card3, card4, card5, card6],
        onFinish: mockCallback,
      }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card6]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(mockCallback).toHaveBeenCalled();
    expect(result.current.cards).toEqual([card6]);
  });

  it("should return all cards from the third part", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useSliceCards({
        cards: [
          card1,
          card2,
          card3,
          card4,
          card5,
          card6,
          card7,
          card8,
          card9,
          card10,
          card11,
          card12,
          card13,
          card14,
          card15,
          card16,
          card17,
          card18,
          card19,
        ],
        onFinish: mockCallback,
      }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3, card4, card5]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card6, card7, card8, card9, card10]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([
      card11,
      card12,
      card13,
      card14,
      card15,
    ]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card16, card17, card18, card19]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card16, card17, card18, card19]);
    expect(mockCallback).toHaveBeenCalled();
  });

  it("should return cards when cardsPerPart is 2", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useSliceCards({
        cards: [card1, card2, card3, card4, card5, card6],
        cardsPerPart: 2,
        onFinish: mockCallback,
      }),
    );
    expect(result.current.cards).toEqual([card1, card2]);
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card3, card4]);
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card5, card6]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(mockCallback).toHaveBeenCalled();
  });

  it("should return cards when cardsPerPart is 3", () => {
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useSliceCards({
        cards: [card1, card2, card3, card4, card5],
        cardsPerPart: 3,
        onFinish: mockCallback,
      }),
    );
    expect(result.current.cards).toEqual([card1, card2, card3]);
    act(() => {
      result.current.nextPart();
    });
    expect(result.current.cards).toEqual([card4, card5]);
    expect(mockCallback).not.toHaveBeenCalled();
    act(() => {
      result.current.nextPart();
    });
    expect(mockCallback).toHaveBeenCalled();
  });
});
