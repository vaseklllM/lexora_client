import { CefrEnum, ICard } from "@/api/schemas/card.schema";
import { act, renderHook } from "@testing-library/react";
import { useGameCardsController } from "./useGameCardsController";

jest.mock("@/shared/utils/mixArray", () => ({
  mixArray: jest.fn((arr) => arr),
}));

const cardCurious: ICard = {
  id: "3d561af1-2a06-43f0-8f92-287c888de875",
  textInKnownLanguage: "допитливий, цікавий, любопитний, допитний",
  textInLearningLanguage: "curious",
  createdAt: new Date("2025-10-01T10:13:13.174Z"),
  masteryScore: 0,
  isNew: true,
  descriptionInKnownLanguage: "Дитина була допитлива щодо нової іграшки.",
  descriptionInLearningLanguage: "The child was curious about the new toy.",
  soundUrls: [
    "http://localhost:4000/public/tts/20ef885c5d925dc3b2c40103cdfbd941657d2cc92d77769f4760aee8790ca853.mp3",
    "http://localhost:4000/public/tts/deb92f0e62b9ea884268bb45a1b804369c699f427d3acb4e5e43ddeeb4e622f9.mp3",
  ],
  cefr: CefrEnum.A2,
};

const cardWalkInThePark: ICard = {
  id: "5c4b0957-d91e-4f58-8503-7b419fdb08f8",
  textInKnownLanguage: "гуляти в парку, прогулюватися в парку, ходити в парку",
  textInLearningLanguage: "To walk in the park",
  createdAt: new Date("2025-10-01T10:47:43.161Z"),
  masteryScore: 0,
  isNew: true,
  descriptionInKnownLanguage: "Мені подобається гуляти в парку на вихідних.",
  descriptionInLearningLanguage: "I like to walk in the park on weekends.",
  soundUrls: [
    "http://localhost:4000/public/tts/1039dcd1b7b5bfcb5f21f39e51db783a52abe57903cf831844112e3516d9c090.mp3",
    "http://localhost:4000/public/tts/84b6b040d4c2e6e45efdcb82532c9f96505cdb3abcfd369ffce5efb9c63354b0.mp3",
  ],
  cefr: CefrEnum.A1,
};

const cardAcross: ICard = {
  id: "021eaed9-5ee1-4a2a-af68-bc814f1fd76a",
  textInKnownLanguage: "через, поперек, навпроти",
  textInLearningLanguage: "Across",
  createdAt: new Date("2025-10-01T21:08:57.589Z"),
  masteryScore: 0,
  isNew: true,
  descriptionInKnownLanguage: "Він перейшов вулицю.",
  descriptionInLearningLanguage: "He walked across the street.",
  soundUrls: [
    "http://localhost:4000/public/tts/6084b8655256f658c43479c5a08c307a5c4727a3052ace0142529e51bfaa54f7.mp3",
    "http://localhost:4000/public/tts/8dae21906ec5fc0e96cd70b427019f0780c6b964b867ceadae0960b353aea065.mp3",
  ],
  cefr: CefrEnum.A1,
};

const cardDisappointed: ICard = {
  id: "52fbeb4e-b9dd-4eee-b19f-c1d8710e7f54",
  textInKnownLanguage: "розчарований, засмучений, невдоволений",
  textInLearningLanguage: "disappointed",
  createdAt: new Date("2025-10-02T08:49:02.211Z"),
  masteryScore: 0,
  isNew: true,
  descriptionInKnownLanguage:
    "Вона була розчарована своїми результатами іспиту.",
  descriptionInLearningLanguage: "She was disappointed with her exam results.",
  soundUrls: [
    "http://localhost:4000/public/tts/318df14c7e49968e963cac33a9e14e86d477623d6318053cf573af97f7f54800.mp3",
    "http://localhost:4000/public/tts/08b783d2b1953e1c5eb9c0a03d3022c7bd489cba34a89fce7068849ca136f011.mp3",
  ],
  cefr: CefrEnum.A1,
};

const cardSmart: ICard = {
  id: "33e54230-6d1e-4188-9f6d-4e7ba111a0dc",
  textInKnownLanguage: "розумний, кмітливий, елегантний",
  textInLearningLanguage: "Smart",
  createdAt: new Date("2025-10-01T16:37:16.243Z"),
  masteryScore: 0,
  isNew: true,
  descriptionInKnownLanguage: "Вона дуже розумна студентка.",
  descriptionInLearningLanguage: "She is a very smart student.",
  soundUrls: [
    "http://localhost:4000/public/tts/00f460a801345554e25472b3f6ac4b5f2ebc6ff8fcc8c35bf915fadd8c741b3c.mp3",
    "http://localhost:4000/public/tts/238b8f9d8939eba2667222a27bcd89f2114a70389a2caa94f644b9c319921146.mp3",
  ],
  cefr: CefrEnum.B1,
};

const cards: ICard[] = [
  cardCurious,
  cardWalkInThePark,
  cardAcross,
  cardDisappointed,
  cardSmart,
];

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
    const { result } = renderHook(() => useGameCardsController({ cards }));
    expect(result.current.active).toEqual(cards[0]);
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

    const cards = [
      cardCurious,
      cardWalkInThePark,
      cardAcross,
      cardDisappointed,
      cardSmart,
    ];

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
    expect(result.current.active).toEqual(cardCurious);
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

    const cards = [
      cardCurious,
      cardWalkInThePark,
      cardAcross,
      cardDisappointed,
      cardSmart,
    ];

    const { result } = renderHook(() =>
      useGameCardsController({ cards, onFinish: mockCallback }),
    );
    expect(result.current.active).toEqual(cardCurious);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(0);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: true,
      },
      {
        id: cardWalkInThePark.id,
        isActive: false,
      },
      {
        id: cardAcross.id,
        isActive: false,
      },
      {
        id: cardDisappointed.id,
        isActive: false,
      },
      {
        id: cardSmart.id,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardWalkInThePark);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(1);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: true,
      },
      {
        id: cardAcross.id,
        isActive: false,
      },
      {
        id: cardDisappointed.id,
        isActive: false,
      },
      {
        id: cardSmart.id,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(2);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardAcross.id,
        isActive: true,
      },
      {
        id: cardDisappointed.id,
        isActive: false,
      },
      {
        id: cardSmart.id,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardDisappointed);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(3);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardAcross.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardDisappointed.id,
        isActive: true,
      },
      {
        id: cardSmart.id,
        isActive: false,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardSmart);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(4);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardAcross.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardDisappointed.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardSmart.id,
        isActive: true,
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardWalkInThePark);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(5);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: cardAcross.id,
        isActive: false,
        status: "mistake",
      },
      {
        id: cardDisappointed.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardSmart.id,
        isActive: false,
        status: "finished",
      },
    ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.idx).toBe(6);
    expect(result.current.cardsMap).toEqual([
      {
        id: cardCurious.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardWalkInThePark.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardAcross.id,
        isActive: true,
        status: "mistake",
      },
      {
        id: cardDisappointed.id,
        isActive: false,
        status: "finished",
      },
      {
        id: cardSmart.id,
        isActive: false,
        status: "finished",
      },
    ]);
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.idx).toBe(7);
    // expect(result.current.cardsMap).toEqual([
    //   {
    //     id: cardCurious.id,
    //     isActive: false,
    //     status: "finished",
    //   },
    //   {
    //     id: cardWalkInThePark.id,
    //     isActive: false,
    //     status: "finished",
    //   },
    //   {
    //     id: cardAcross.id,
    //     isActive: true,
    //     status: "mistake",
    //   },
    //   {
    //     id: cardDisappointed.id,
    //     isActive: false,
    //     status: "finished",
    //   },
    //   {
    //     id: cardSmart.id,
    //     isActive: false,
    //     status: "finished",
    //   },
    // ]);
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(result.current.idx).toBe(7);
  });

  it("should return the mixed cards and make mistakes", () => {
    const mockCallback = jest.fn();

    const cards = [
      cardCurious,
      cardWalkInThePark,
      cardAcross,
      cardDisappointed,
      cardSmart,
    ];

    const { result } = renderHook(() =>
      useGameCardsController({ cards, onFinish: mockCallback }),
    );

    // 1 card
    expect(result.current.active).toEqual(cardCurious);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(0);

    // 2 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardWalkInThePark);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(1);

    // 3 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(2);

    // 4 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardDisappointed);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(3);
    // 5 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardSmart);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(4);

    // 2 card
    act(() => {
      result.current.makeMistake();
    });
    expect(result.current.isMadeMistake).toBeTruthy();
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardWalkInThePark);
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.idx).toBe(5);

    // 3 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeFalsy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(6);

    // 5 card
    act(() => {
      result.current.next(false);
    });
    expect(result.current.active).toEqual(cardSmart);
    expect(result.current.isLastCard).toBeFalsy();
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(7);

    // 3 card
    act(() => {
      result.current.next(true);
    });
    expect(mockCallback).toHaveBeenCalledTimes(0);
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeTruthy();
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(8);

    // 5 card
    act(() => {
      result.current.next(true);
    });
    expect(result.current.active).toEqual(cardAcross);
    expect(result.current.isLastCard).toBeTruthy();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(result.current.isMadeMistake).toBeFalsy();
    expect(result.current.idx).toBe(8);
  });
});
