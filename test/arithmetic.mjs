import assert from "node:assert";
import {parse, simplify, stringify} from "../arithmetic.mjs";

describe("arithmetic", () => {
  describe("parse", () => {
  });

  describe("simplify", () => {
  });

  describe("stringify", () => {
    for(const [input, expected] of [
      [["+", 1, -2, 3], "1+-2+3"],
      [["+", 1, ["*", 2, 3], 4], "1+2*3+4"],
      [["*", 1, ["+", 2, 3]], "1*(2+3)"],
    ]) {
      it(`should stringify ${JSON.stringify(input)} to "${expected}"`, () => {
        assert.strictEqual(stringify(input), expected);
      });
    }
  });
});
