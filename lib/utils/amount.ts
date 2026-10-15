/**
 * Applies one keypad press to an amount typed as a French decimal ("14,5").
 * Keeps a single comma and at most two decimals; "del" removes the last
 * character.
 */
export function pressAmountKey(current: string, key: string): string {
  if (key === "del") return current.slice(0, -1);
  if (key === ",") {
    return current.includes(",") ? current : (current || "0") + ",";
  }
  const [, decimals] = current.split(",");
  if (decimals !== undefined && decimals.length >= 2) return current;
  if (current === "0") return key;
  return current + key;
}

/** Splits an amount into its integer part and two-digit decimals for display. */
export function splitAmount(amount: string): { int: string; dec: string } {
  const [int, dec = ""] = amount.split(",");
  return { int: int || "0", dec: dec.padEnd(2, "0") };
}
