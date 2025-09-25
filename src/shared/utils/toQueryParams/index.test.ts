import { toQueryParams } from "./index";

describe("toQueryParams", () => {
  it("returns an empty string for an empty object", () => {
    expect(toQueryParams({})).toBe("");
  });

  it("converts simple key-value pairs", () => {
    expect(toQueryParams({ search: "react", page: 2 })).toBe(
      "?search=react&page=2",
    );
  });

  it("ignores undefined and null values", () => {
    expect(toQueryParams({ a: undefined, b: null, c: "ok" })).toBe("?c=ok");
  });

  it("supports arrays (repeated keys)", () => {
    const q = toQueryParams({ tags: ["js", "ts"] });
    expect(q).toBe("?tags=js&tags=ts");
  });

  it("skips undefined/null inside arrays", () => {
    const q = toQueryParams({ tags: ["js", undefined, null, "ts"] });
    expect(q).toBe("?tags=js&tags=ts");
  });

  it("converts numbers and booleans to strings", () => {
    const q = toQueryParams({ n: 0, ok: false, yes: true });
    expect(q).toBe("?n=0&ok=false&yes=true");
  });

  it("handles empty strings correctly", () => {
    expect(toQueryParams({ q: "" })).toBe("?q=");
  });

  // it("encodes special characters correctly", () => {
  //   const q = toQueryParams({ q: "a b+c&d=e/ф" });
  //   expect(q).toBe("?q=a%20b%2Bc%26d%3De%2F%D1%84");
  // });

  it("combines various types correctly", () => {
    const q = toQueryParams({
      search: "react",
      page: 2,
      tags: ["js", "ts"],
      active: true,
      empty: undefined,
    });
    expect(q).toBe("?search=react&page=2&tags=js&tags=ts&active=true");
  });
});
