import { ICard } from "@/api/schemas/card.schema";
import { card1, card2, card3, card4, card5 } from "@/shared/test/cards";
import { act, renderHook } from "@testing-library/react";
import { useGameCardsController } from "./useGameCardsController";

jest.mock("@/shared/utils/mixArray", () => ({
  mixArray: jest.fn((arr) => arr),
}));

describe("useGameCardsController", () => {
  it("should return undefined active card", () => {
    const { result } = renderHook(() => useGameCardsController({ cards: [] }));
    expect(result.current.active).toBeUndefined();
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([]);
  });

  it("should return the first card", () => {
    const cards: ICard[] = [card1, card2, card3, card4, card5];
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(card1);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual(
      cards.map((i, idx) => ({
        id: i.id,
        isActive: idx === 0,
      })),
    );
    expect(result.current.cardsMap).toEqual([
      {
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
        isActive: false,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
        isActive: false,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        status: "finished",
        isActive: false,
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
        isActive: false,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: true,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
        isActive: false,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: true,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: true,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[3].id,
        isActive: true,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: true,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: true,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[3].id,
        isActive: true,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "finished",
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
      },
      {
        id: cards[1].id,
        isActive: false,
      },
      {
        id: cards[2].id,
        isActive: false,
      },
      {
        id: cards[3].id,
        isActive: false,
      },
      {
        id: cards[4].id,
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
        id: cards[0].id,
        isActive: true,
        status: "mistake",
      },
      {
        id: cards[1].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[2].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[3].id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cards[4].id,
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
        isActive: true,
      },
      {
        id: card2.id,
        isActive: false,
      },
      {
        id: card3.id,
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: true,
      },
      {
        id: card3.id,
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        isActive: true,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        isActive: true,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: card3.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        isActive: true,
        status: "finished",
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: true,
      },
      {
        id: card2.id,
        isActive: false,
      },
      {
        id: card3.id,
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: true,
      },
      {
        id: card3.id,
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        isActive: true,
      },
      {
        id: card4.id,
        isActive: false,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        isActive: true,
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: true,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: false,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        status: "mistake",
        isActive: true,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
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
        isActive: false,
        status: "finished",
      },
      {
        id: card2.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card3.id,
        status: "finished",
        isActive: true,
      },
      {
        id: card4.id,
        isActive: false,
        status: "finished",
      },
      {
        id: card5.id,
        isActive: false,
        status: "finished",
      },
    ]);
  });
});
