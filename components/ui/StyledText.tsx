import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { getTextStyle } from "~/lib/constants/fonts";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodyLarge"
  | "bodySmall"
  | "bodyTiny"
  | "label"
  | "button"
  | "caption";

interface StyledTextProps extends RNTextProps {
  variant?: TextVariant;
}

/**
 * Composant Text avec police globale Outfit
 * Utilise automatiquement la police Outfit pour tous les textes
 */
export const StyledText = ({
  variant = "body",
  style,
  ...props
}: StyledTextProps) => {
  const variantStyle = getTextStyle(variant);

  return <RNText style={[variantStyle as TextStyle, style]} {...props} />;
};

// Composants spécialisés pour faciliter l'utilisation
export const Heading1 = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="h1" {...props} />
);

export const Heading2 = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="h2" {...props} />
);

export const Heading3 = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="h3" {...props} />
);

export const Heading4 = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="h4" {...props} />
);

export const BodyText = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="body" {...props} />
);

export const BodyLarge = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="bodyLarge" {...props} />
);

export const BodySmall = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="bodySmall" {...props} />
);

export const Label = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="label" {...props} />
);

export const ButtonText = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="button" {...props} />
);

export const Caption = (props: Omit<StyledTextProps, "variant">) => (
  <StyledText variant="caption" {...props} />
);
