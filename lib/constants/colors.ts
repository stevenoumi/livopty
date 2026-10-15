// Raw values for props that cannot take a class name (icons, ActivityIndicator,
// placeholderTextColor, tab bar tints, SVG charts). Keep in sync with the light
// tokens in global.css.
export const COLORS = {
  primary: "#8928bd",
  primaryForeground: "#ffffff",
  primarySoft: "#f7eefc",
  foreground: "#19161d",
  mutedForeground: "#6b6572",
  muted: "#f7f5f9",
  secondary: "#f2f0f5",
  border: "#e6e2e9",
  background: "#ffffff",
  destructive: "#dc2828",
  success: "#16833e",
  // Chevrons and inactive tab icons.
  faint: "#a39eaa",
} as const;

// Categories (budget envelopes, list folders, calendars) need hues that tell
// each other apart, which one brand colour cannot do. Used for icon tiles and
// chart segments only, never for text.
export const CATEGORY_COLORS = {
  brand: "#8928bd",
  blue: "#3f83db",
  green: "#3e9a52",
  orange: "#d9692a",
  red: "#e0455a",
  teal: "#2f9aaa",
  yellow: "#d99a1c",
  grey: "#8a8592",
} as const;

export type CategoryColor = keyof typeof CATEGORY_COLORS;
