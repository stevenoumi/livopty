import type { LucideIcon } from "lucide-react-native";
import * as React from "react";
import { Image, Pressable, View, type ViewStyle } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { avatarUrl, type MemberId } from "~/lib/data/household";
import { colors, type CategoryColor } from "~/lib/theme";
import { Txt } from "./Txt";

export const catColor = (c: CategoryColor) => (c === "brand" ? colors.brand : colors[c]);

export function Avatar({ id, size = 40, ring = false, style }: { id: MemberId; size?: number; ring?: boolean; style?: ViewStyle }) {
  return (
    <Image
      source={{ uri: avatarUrl(id) }}
      style={[{ width: size, height: size, borderRadius: size / 2 }, ring && { borderWidth: 2, borderColor: colors.white }, style as object]}
    />
  );
}

export function AvatarStack({ ids, size = 24 }: { ids: MemberId[]; size?: number }) {
  return (
    <View className="flex-row">
      {ids.map((id, i) => (
        <Avatar key={id} id={id} size={size} ring style={{ marginLeft: i === 0 ? 0 : -size / 3 }} />
      ))}
    </View>
  );
}

/** Rounded square with a white Lucide icon, iOS Settings style. */
export function Tile({ icon: Icon, color, size = 36, radius }: { icon: LucideIcon; color: CategoryColor; size?: number; radius?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius ?? size / 4, backgroundColor: catColor(color), alignItems: "center", justifyContent: "center" }}>
      <Icon size={size * 0.55} color={colors.white} strokeWidth={2} />
    </View>
  );
}

/** Round icon button on a light brand background (copy, show, invite…). */
export function SoftIconButton({ icon: Icon, onPress, size = 32 }: { icon: LucideIcon; onPress?: () => void; size?: number }) {
  return (
    <Pressable onPress={onPress} hitSlop={6} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" }}>
      <Icon size={size / 2} color={colors.brand} strokeWidth={2.2} />
    </Pressable>
  );
}

export function Chip({ label, count, active, icon: Icon, onPress }: { label: string; count?: number; active?: boolean; icon?: LucideIcon; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ height: 32, paddingHorizontal: 12, borderRadius: 16, backgroundColor: active ? colors.ink : "#F3F3F5", flexDirection: "row", alignItems: "center", gap: 6 }}
    >
      {Icon ? <Icon size={15} color={active ? colors.white : colors.ink} /> : null}
      <Txt size={14} weight="medium" tone={active ? "white" : "ink"}>{label}</Txt>
      {count !== undefined ? <Txt size={13} weight="medium" color={active ? "rgba(255,255,255,.6)" : colors.faint}>{count}</Txt> : null}
    </Pressable>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: colors.fill, borderRadius: 9, padding: 2 }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={[{ flex: 1, height: 30, borderRadius: 7, alignItems: "center", justifyContent: "center" }, on && { backgroundColor: colors.white, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 1 }]}
          >
            <Txt size={14} weight={on ? "semibold" : "medium"}>{o}</Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ProgressBar({ value, color = colors.brand, track = colors.fill, height = 6 }: { value: number; color?: string; track?: string; height?: number }) {
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: track, overflow: "hidden" }}>
      <View style={{ width: `${Math.min(1, Math.max(0, value)) * 100}%`, height: "100%", borderRadius: height / 2, backgroundColor: color }} />
    </View>
  );
}

/** Horizontal bar split by category, with a grey remainder. */
export function SplitBar({ parts, total, height = 8 }: { parts: { value: number; color: string }[]; total: number; height?: number }) {
  const used = parts.reduce((s, p) => s + p.value, 0);
  return (
    <View style={{ flexDirection: "row", gap: 3, height, borderRadius: height / 2, overflow: "hidden" }}>
      {parts.map((p, i) => (
        <View key={i} style={{ flex: p.value / total, backgroundColor: p.color }} />
      ))}
      <View style={{ flex: Math.max(0, total - used) / total, backgroundColor: "#ECECF0" }} />
    </View>
  );
}

/** Progress ring (budget widget, OTP timer). */
export function Ring({ value, size = 50, stroke = 7, color = colors.green }: { value: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.fill} strokeWidth={stroke} fill="none" />
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

/** Donut with rounded, separated segments (Paylix style). */
export function Donut({ parts, size = 168, stroke = 22, gap = 14, children }: { parts: { value: number; color: string }[]; size?: number; stroke?: number; gap?: number; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = parts.reduce((s, p) => s + p.value, 0);
  // Round caps eat `stroke` of length; keep a visible gap between segments.
  const usable = c - parts.length * (gap + stroke);
  let offset = 0;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {parts.map((p, i) => {
            const len = Math.max(1, (p.value / total) * usable);
            const el = (
              <Circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={p.color}
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${len} ${c}`}
                strokeDashoffset={-(offset + stroke / 2 + gap / 2)}
              />
            );
            offset += len + gap + stroke;
            return el;
          })}
        </G>
      </Svg>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>{children}</View>
    </View>
  );
}

export function Badge({ value }: { value: number }) {
  return (
    <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: colors.brand, paddingHorizontal: 6, alignItems: "center", justifyContent: "center" }}>
      <Txt size={12} weight="semibold" tone="white">{value}</Txt>
    </View>
  );
}

export function Toggle({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <Pressable onPress={() => onChange?.(!on)} style={{ width: 51, height: 31, borderRadius: 16, backgroundColor: on ? colors.brand : "#E5E5EA", padding: 2, alignItems: on ? "flex-end" : "flex-start" }}>
      <View style={{ width: 27, height: 27, borderRadius: 14, backgroundColor: colors.white, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2 }} />
    </Pressable>
  );
}
