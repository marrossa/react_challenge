import { getBreakpoints } from "./utils";

describe("utils", () => {
  it("should remove any character", () => {
    expect(getBreakpoints("4, 6, a, 10")).toStrictEqual([4, 6, 10]);
  });

  it("should remove any value greater than the hanging breakpoint", () => {
    expect(getBreakpoints("4, 6, 10, 50, 70, 100, 140")).toStrictEqual([4, 6, 10, 50, 70]);
  });

  it("should order the breakpoints", () => {
    expect(getBreakpoints("10, 3, 20, 14")).toStrictEqual([3, 10, 14, 20]);
  });
});
