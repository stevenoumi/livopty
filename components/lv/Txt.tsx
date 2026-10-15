import * as React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";
import { colors, fonts } from "~/lib/theme";

type Weight = keyof typeof fonts;
type Tone = "ink" | "mute" | "faint" | "brand" | "ok" | "danger" | "white";

export interface TxtProps extends TextProps {
  size?: number;
  weight?: Weight;
  tone?: Tone;
  color?: string;
  center?: boolean;
  /** Tight letter spacing for large titles. */
  tight?: boolean;
}

const tones: Record<Tone, string> = {
  ink: colors.ink,
  mute: colors.mute,
  faint: colors.faint,
  brand: colors.brand,
  ok: colors.ok,
  danger: colors.danger,
  white: colors.white,
};

/** Inter text with an explicit weight, size and tone. */
export function Txt({ size = 16, weight = "regular", tone = "ink", color, center, tight, style, ...props }: TxtProps) {
  const base: TextStyle = {
    fontFamily: fonts[weight],
    fontSize: size,
    color: color ?? tones[tone],
    letterSpacing: tight ? -size * 0.03 : -size * 0.01,
    textAlign: center ? "center" : undefined,
  };
  return <Text style={[base, style]} {...props} />;
}
