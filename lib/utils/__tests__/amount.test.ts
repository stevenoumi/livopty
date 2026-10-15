import { pressAmountKey, splitAmount } from "../amount";

const type = (keys: string[], start = "") =>
  keys.reduce((amount, key) => pressAmountKey(amount, key), start);

describe("pressAmountKey", () => {
  it("appends digits", () => {
    expect(type(["1", "4"])).toBe("14");
  });

  it("replaces a lone zero instead of writing a leading zero", () => {
    expect(type(["0", "7"])).toBe("7");
  });

  it("keeps a single comma", () => {
    expect(type(["3", ",", ",", "5"])).toBe("3,5");
  });

  it("starts with 0 when the comma comes first", () => {
    expect(type([","])).toBe("0,");
  });

  it("stops at two decimals", () => {
    expect(type(["9", ",", "9", "9", "9"])).toBe("9,99");
  });

  it("deletes the last character", () => {
    expect(type(["del"], "12,5")).toBe("12,");
    expect(type(["del"], "")).toBe("");
  });
});

describe("splitAmount", () => {
  it("pads the decimals to two digits", () => {
    expect(splitAmount("14")).toEqual({ int: "14", dec: "00" });
    expect(splitAmount("14,5")).toEqual({ int: "14", dec: "50" });
  });

  it("shows 0 for an empty amount", () => {
    expect(splitAmount("")).toEqual({ int: "0", dec: "00" });
  });
});
