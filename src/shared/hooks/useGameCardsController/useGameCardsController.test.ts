import { ICard } from "@/api/schemas/card.schema";
import { card1, card2, card3, card4, card5 } from "@/shared/test/cards";
import { act, renderHook } from "@testing-library/react";
import { useGameCardsController } from "./useGameCardsController";

jest.mock("@/shared/utils/mixArray", () => ({
  mixArray: jest.fn((arr) => arr),
}));

describe("useGameCardsController", () => {
  it("should throw error when cards array is empty", () => {
    expect(() => {
      renderHook(() => useGameCardsController({ cards: [] }));
    }).toThrow("Cards are not set");
  });

  it("should return the first card", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(card1);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: true,
        card: card1,
      },
      {
        id: card2.id,
        isActive: false,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
  });

  it("should return the second card if the first card is not guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: true,
        card: card1,
      },
      {
        id: card2.id,
        isActive: false,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: false,
        status: "mistake",
        card: card1,
      },
      {
        id: card2.id,
        isActive: true,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
  });

  it("should return the second card if the first card is guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: true,
        card: card1,
      },
      {
        id: card2.id,
        isActive: false,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        status: "finished",
        isActive: false,
        card: card1,
      },
      {
        id: card2.id,
        isActive: true,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
  });

  it("should return the third card if the second card is not guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: true,
        card: card1,
      },
      {
        id: card2.id,
        isActive: false,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: false,
        status: "mistake",
        card: card1,
      },
      {
        id: card2.id,
        isActive: true,
        card: card2,
      },
      {
        id: card3.id,
        isActive: false,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[2]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: false,
        status: "mistake",
        card: card1,
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
        card: card2,
      },
      {
        id: card3.id,
        isActive: true,
        card: card3,
      },
      {
        id: card4.id,
        isActive: false,
        card: card4,
      },
      {
        id: card5.id,
        isActive: false,
        card: card5,
      },
    ]);
  });

  it("should return the third card if the second card is guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        isActive: true,
        card: card1,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[2]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
  });

  it("should return the all cards if the all cards are not guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[2]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[3]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(3);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: true,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[4]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "mistake",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(5);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "mistake",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "mistake",
      },
    ]);
  });

  it("should return the all cards if the all cards are guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));

    expect(result.current.active).toEqual(cards[0]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[1]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[2]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[3]);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(3);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "finished",
      },
      {
        id: card4.id,
        card: card4,
        isActive: true,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[4]);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "finished",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cards[4]);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "finished",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
        status: "finished",
      },
    ]);
  });

  it("should call onFinish if the all cards are guessed", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const mockCallback = jest.fn();

    const { result } = renderHook(() =>
      useGameCardsController({ cards, onFinish: mockCallback }),
    );
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    cards.forEach(() => {
      act(() => {
        result.current.next(true);
      });
    });
    expect(mockCallback).toHaveBeenCalled();
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(cards.length - 1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "finished",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
        status: "finished",
      },
    ]);
  });

  it("should return the first card if the all cards are not guessed", () => {
    const mockCallback = jest.fn();

    const cards: ICard[] = [card1, card2, card3, card4, card5];

    const { result } = renderHook(() =>
      useGameCardsController({
        cards,
        onFinish: mockCallback,
      }),
    );
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);

    cards.forEach(() => {
      act(() => {
        result.current.next(false);
      });
    });

    expect(result.current.isLastCard).toBeFalsy();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.active).toEqual(card1);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(cards.length);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
        status: "mistake",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "mistake",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "mistake",
      },
    ]);
  });

  it("should return the mixed cards", () => {
    const mockCallback = jest.fn();
    const cards: ICard[] = [card1, card2, card3, card4, card5];

    const { result } = renderHook(() =>
      useGameCardsController({ cards, onFinish: mockCallback }),
    );
    expect(result.current.active).toEqual(card1);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card2);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card4);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(3);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: true,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card5);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card2);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(5);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.idx).toBe(6);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.idx).toBe(7);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
        status: "mistake",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(result.current.idx).toBe(7);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
        status: "finished",
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);
  });

  it("should return the mixed cards and make mistakes", () => {
    const mockCallback = jest.fn();

    const cards = [card1, card2, card3, card4, card5];

    const { result } = renderHook(() =>
      useGameCardsController({ cards, onFinish: mockCallback }),
    );

    // 1 card
    expect(result.current.active).toEqual(card1);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: true,
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);

    // 2 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card2);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
      },
      {
        id: card3.id,
        card: card3,
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);

    // 3 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);

    // 4 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card4);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(3);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: true,
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
      },
    ]);
    // 5 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card5);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
      },
    ]);

    // 2 card
    act(() => {
      result.current.makeMistake();
    });
    expect(result.current.isMadeMistake).toBeTruthy();
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card2);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(5);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: true,
        status: "mistake",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "mistake",
      },
    ]);

    // 3 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(6);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "mistake",
      },
    ]);

    // 5 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(card5);
    expect(result.current.isLastCard).toBeFalsy();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(7);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: true,
        status: "mistake",
      },
    ]);

    // 3 card
    act(() => {
      result.current.next(true);
    });
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(8);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        status: "mistake",
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);

    // 5 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(card3);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(8);
    expect(result.current.cardsMap).toEqual([
      {
        id: card1.id,
        card: card1,
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        card: card2,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        card: card3,
        status: "finished",
        isActive: true,
      },
      {
        id: card4.id,
        card: card4,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        card: card5,
        isActive: false,
        status: "finished",
      },
    ]);
  });
});
