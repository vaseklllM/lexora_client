import { StackID } from "../";

describe("class StackID default mode", function () {
  it("should create first id", function () {
    expect(new StackID().next()).toBe(0);
  });

  it("should create two ids", function () {
    const stack = new StackID();

    expect(stack.next()).toBe(0);
    expect(stack.next()).toBe(1);
  });

  it("should create list ids", function () {
    const stack = new StackID();

    expect(stack.next()).toBe(0);
    expect(stack.next()).toBe(1);
    expect(stack.next()).toBe(2);
    stack.remove(0);
    expect(stack.next()).toBe(0);
    expect(stack.next()).toBe(3);
    expect(stack.next()).toBe(4);
    stack.remove(1);
    expect(stack.next()).toBe(1);
    expect(stack.next()).toBe(5);
    stack.remove(20);
    stack.remove(2);
    stack.remove(4);
    stack.remove(5);
    expect(stack.next()).toBe(2);
    expect(stack.next()).toBe(4);
    expect(stack.next()).toBe(5);
  });

  it("should apply default stack", function () {
    const stack = new StackID([1, 2, -4, 2]);

    expect(stack.list).toEqual([1, 2, -4]);
    expect(stack.next()).toBe(0);
  });
});
