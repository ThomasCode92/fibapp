import { describe, expect, test } from "vitest";
import { fib } from "./fib";

describe("fib function", () => {
  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
    [10, 55],
  ])(
    "should calculate the correct fibonnaci number for %i",
    (input, expected) => {
      expect(fib(input)).toBe(expected);
    },
  );
});
