import { TextStyle } from "react-native";

/**
 * Configuration globale des polices pour l'application
 * Polices modernes et élégantes pour une ambiance amoureuse et sophistiquée
 */

export const FONT_FAMILIES = {
  // Police principale : Outfit - Moderne, arrondie, élégante
  outfit: {
    regular: "Outfit_400Regular",
    medium: "Outfit_500Medium",
    semibold: "Outfit_600SemiBold",
    bold: "Outfit_700Bold",
  },
  // Police secondaire : Inter - Lisible, professionnelle
  inter: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
  },
} as const;

export const FONT_WEIGHTS = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/**
 * Styles de texte prédéfinis avec la police Outfit
 */
export const TEXT_STYLES = {
  // Titres avec Outfit (plus doux et moderne)
  h1: {
    fontFamily: FONT_FAMILIES.outfit.bold,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: FONT_WEIGHTS.bold,
  },
  h2: {
    fontFamily: FONT_FAMILIES.outfit.bold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: FONT_WEIGHTS.bold,
  },
  h3: {
    fontFamily: FONT_FAMILIES.outfit.semibold,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  h4: {
    fontFamily: FONT_FAMILIES.outfit.semibold,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  h5: {
    fontFamily: FONT_FAMILIES.outfit.medium,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.medium,
  },
  h6: {
    fontFamily: FONT_FAMILIES.outfit.medium,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: FONT_WEIGHTS.medium,
  },

  // Corps de texte avec Outfit (cohérence visuelle)
  body: {
    fontFamily: FONT_FAMILIES.outfit.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILIES.outfit.regular,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodySmall: {
    fontFamily: FONT_FAMILIES.outfit.regular,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodyTiny: {
    fontFamily: FONT_FAMILIES.outfit.regular,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: FONT_WEIGHTS.regular,
  },

  // Labels et boutons avec Outfit Medium
  label: {
    fontFamily: FONT_FAMILIES.outfit.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: FONT_WEIGHTS.medium,
  },
  button: {
    fontFamily: FONT_FAMILIES.outfit.semibold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  // Caption et texte secondaire
  caption: {
    fontFamily: FONT_FAMILIES.outfit.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: FONT_WEIGHTS.regular,
  },
} as const;

/**
 * Classe utilitaire pour faciliter l'application des styles de texte
 */
export const getTextStyle = (variant: keyof typeof TEXT_STYLES): TextStyle => {
  return TEXT_STYLES[variant] as TextStyle;
};

/**
 * Obtenir le nom de la police selon le poids
 */
export const getOutfitFont = (
  weight: keyof typeof FONT_FAMILIES.outfit = "regular"
): string => {
  return FONT_FAMILIES.outfit[weight];
};

export const getInterFont = (
  weight: keyof typeof FONT_FAMILIES.inter = "regular"
): string => {
  return FONT_FAMILIES.inter[weight];
};
