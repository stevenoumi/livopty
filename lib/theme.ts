/**
 * LivOpty design tokens (Paylix palette, flat iOS look).
 * Mirrors the `brand`, `ink`, `mute`… colours in tailwind.config.js, for places
 * that need raw values: Lucide icon props, SVG charts, inline styles.
 */
export const colors = {
  brand: "#9768FE",
  brandSoft: "#F4EFFF",
  ink: "#000000",
  mute: "#666666",
  faint: "#8E8E93",
  chevron: "#C4C4C7",
  line: "#E5E5EA",
  fill: "#EEEEF0",
  surface: "#F6F6F8",
  bubble: "#E9E9EB",
  white: "#FFFFFF",
  ok: "#34C759",
  danger: "#FF3B30",
  blue: "#5B9EF0",
  green: "#6CC27A",
  orange: "#E57B33",
  red: "#FF6B6B",
  teal: "#4FB7C5",
  yellow: "#F5B82E",
  grey: "#8E8E93",
} as const;

export type CategoryColor = "brand" | "blue" | "green" | "orange" | "red" | "teal" | "yellow" | "grey";

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;
