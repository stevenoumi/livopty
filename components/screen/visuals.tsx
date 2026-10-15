import type { LucideIcon } from "lucide-react-native";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { Text } from "~/components/ui/text";
import { avatarUrl, type MemberId } from "~/lib/data/household";
import { CATEGORY_COLORS, COLORS, type CategoryColor } from "~/lib/constants";
import { cn } from "~/lib/utils";

export const catColor = (c: CategoryColor) => CATEGORY_COLORS[c];

export function MemberAvatar({
  id,
  size = 40,
  ring = false,
  overlap = 0,
}: {
  id: MemberId;
  size?: number;
  ring?: boolean;
  overlap?: number;
}) {
  return (
    <Image
      source={{ uri: avatarUrl(id) }}
      accessibilityIgnoresInvertColors
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginLeft: -overlap,
        },
        ring && { borderWidth: 2, borderColor: COLORS.background },
      ]}
    />
  );
}

export function AvatarStack({
  ids,
  size = 24,
}: {
  ids: MemberId[];
  size?: number;
}) {
  return (
    <View className="flex-row">
      {ids.map((id, i) => (
        <MemberAvatar
          key={id}
          id={id}
          size={size}
          ring
          overlap={i === 0 ? 0 : size / 3}
        />
      ))}
    </View>
  );
}

/** Rounded square with a white icon, iOS Settings style. */
export function Tile({
  icon: Icon,
  color,
  size = 36,
  radius,
}: {
  icon: LucideIcon;
  color: CategoryColor;
  size?: number;
  radius?: number;
}) {
  return (
    <View
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: radius ?? size / 4,
        backgroundColor: catColor(color),
      }}
    >
      <Icon size={size * 0.55} color={COLORS.background} strokeWidth={2} />
    </View>
  );
}

/** Round icon button on the soft brand background (copy, show, invite…). */
export function SoftIconButton({
  icon: Icon,
  onPress,
  label,
}: {
  icon: LucideIcon;
  onPress?: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="h-8 w-8 items-center justify-center rounded-full bg-primary-soft"
    >
      <Icon size={16} color={COLORS.primary} strokeWidth={2.2} />
    </Pressable>
  );
}

export function Chip({
  label,
  count,
  active,
  icon: Icon,
  onPress,
}: {
  label: string;
  count?: number;
  active?: boolean;
  icon?: LucideIcon;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      className={cn(
        "h-8 flex-row items-center gap-1.5 rounded-full px-3",
        active ? "bg-foreground" : "bg-secondary",
      )}
    >
      {Icon ? (
        <Icon
          size={15}
          color={active ? COLORS.background : COLORS.foreground}
        />
      ) : null}
      <Text
        variant="label"
        className={active ? "text-background" : "text-foreground"}
      >
        {label}
      </Text>
      {count !== undefined ? (
        <Text
          variant="label"
          className={active ? "text-background/60" : "text-muted-foreground"}
        >
          {count}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View className="flex-row rounded-[9px] bg-secondary p-0.5">
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            className={cn(
              "h-[30px] flex-1 items-center justify-center rounded-[7px]",
              on && "bg-background shadow-sm",
            )}
          >
            <Text variant="label" className={on ? "font-semibold" : undefined}>
              {o}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProgressBar({
  value,
  color = COLORS.primary,
  onCard = false,
  height = 6,
}: {
  value: number;
  color?: string;
  /** White track, for bars drawn on a tinted card. */
  onCard?: boolean;
  height?: number;
}) {
  return (
    <View
      className={cn(
        "overflow-hidden rounded-full",
        onCard ? "bg-background" : "bg-secondary",
      )}
      style={{ height }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${Math.min(1, Math.max(0, value)) * 100}%`,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/** Progress ring (budget widget, one-time code timer). */
export function Ring({
  value,
  size = 50,
  stroke = 7,
  color = CATEGORY_COLORS.green,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={COLORS.secondary}
        strokeWidth={stroke}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${c * value} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

/** Donut with rounded, separated segments. */
export function Donut({
  parts,
  size = 168,
  stroke = 22,
  gap = 14,
  children,
}: {
  parts: { value: number; color: string }[];
  size?: number;
  stroke?: number;
  gap?: number;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = parts.reduce((s, p) => s + p.value, 0);
  // Round caps add `stroke` of length to each segment: reserve it with the gap.
  const usable = c - parts.length * (gap + stroke);
  const lengths = parts.map((p) => Math.max(1, (p.value / total) * usable));
  // Each segment starts where the previous one ended, plus its cap and gap.
  const starts = lengths.map((_, i) =>
    lengths.slice(0, i).reduce((s, len) => s + len + gap + stroke, 0),
  );
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {parts.map((p, i) => (
            <Circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={p.color}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${lengths[i]} ${c}`}
              strokeDashoffset={-(starts[i] + stroke / 2 + gap / 2)}
            />
          ))}
        </G>
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        {children}
      </View>
    </View>
  );
}

export function Badge({ value }: { value: number }) {
  return (
    <View className="h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5">
      <Text variant="caption" tone="inverse" className="font-semibold">
        {value}
      </Text>
    </View>
  );
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={() => onChange?.(!on)}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: on }}
      className={cn(
        "h-[31px] w-[51px] rounded-full p-0.5",
        on ? "items-end bg-primary" : "items-start bg-input",
      )}
    >
      <View className="h-[27px] w-[27px] rounded-full bg-background shadow-sm" />
    </Pressable>
  );
}
