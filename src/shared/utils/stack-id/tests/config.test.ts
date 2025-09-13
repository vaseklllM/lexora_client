import { StackID } from "../index";

describe("class StackID test config", () => {
  it("check for use empty config", function () {
    expect(new StackID({}).list).toEqual([]);
  });

  it("should add empty ids", function () {
    expect(new StackID({ ids: [] }).list).toEqual([]);
  });

  it("should add ids", function () {
    expect(new StackID({ ids: [4, 1] }).list).toEqual([4, 1]);
    expect(new StackID({ ids: [3, 5, 0, 7, 3] }).list).toEqual([3, 5, 0, 7]);
  });

  it("should add ids if isReverse: false", function () {
    expect(new StackID({ ids: [4, -1], isReverse: false }).list).toEqual([4]);
    expect(
      new StackID({ ids: [3, -5, 0, 7, -3], isReverse: false }).list,
    ).toEqual([3, 0, 7]);
  });

  it("should add ids if isReverse: true", function () {
    expect(
      new StackID({ ids: [3, -5, 0, 7, -3], isReverse: true }).list,
    ).toEqual([-5, -3]);
  });

  it("should add next ids if isReverse: false", function () {
    const stack = new StackID({ ids: [3, -5, 0, 7, -3], isReverse: false });

    expect(stack.list).toEqual([3, 0, 7]);
    expect(stack.next()).toBe(1);
    expect(stack.next()).toBe(2);
    expect(stack.next()).toBe(4);
  });

  it("should add next ids if isReverse: true", function () {
    const stackOne = new StackID({ ids: [3, -5, 0, 7, -3], isReverse: true });

    expect(stackOne.list).toEqual([-5, -3]);
    expect(stackOne.next()).toBe(-1);
    expect(stackOne.next()).toBe(-2);
    expect(stackOne.next()).toBe(-4);
    expect(stackOne.list).toEqual([-5, -3, -1, -2, -4]);
    stackOne.remove(-3);
    expect(stackOne.list).toEqual([-5, -1, -2, -4]);

    const stackTwo = new StackID({ isReverse: true });

    expect(stackTwo.list).toEqual([]);
    expect(stackTwo.next()).toBe(-1);
    expect(stackTwo.next()).toBe(-2);
    expect(stackTwo.next()).toBe(-3);
    stackTwo.remove(-3);
    expect(stackTwo.next()).toBe(-3);
  });
});
