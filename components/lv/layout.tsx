import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Mic, Plus, Search } from "lucide-react-native";
import * as React from "react";
import { Pressable, TextInput, View, type ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { colors, fonts } from "~/lib/theme";
import { Txt } from "./Txt";

/** White screen under the status bar. Tabs handle the bottom inset. */
export function Screen({ children, edges = ["top"], style }: { children: React.ReactNode; edges?: Edge[]; style?: ViewStyle }) {
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor: colors.white }, style]}>
      {children}
    </SafeAreaView>
  );
}

/** Outlined circle "+" used at the top right of every tab, as in the app. */
export function AddButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityLabel="Ajouter" style={{ width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: colors.brand, alignItems: "center", justifyContent: "center" }}>
      <Plus size={20} color={colors.brand} strokeWidth={2.4} />
    </Pressable>
  );
}

/** Large iOS title with the + button above it and an optional accessory on the right. */
export function LargeHeader({ title, onAdd, accessory, children }: { title: string; onAdd?: () => void; accessory?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{ height: 38, alignItems: "flex-end", justifyContent: "center" }}>{onAdd ? <AddButton onPress={onAdd} /> : null}</View>
      <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
        <Txt size={32} weight="bold" tight>{title}</Txt>
        {accessory ? <View style={{ marginBottom: 6 }}>{accessory}</View> : null}
      </View>
      {children}
    </View>
  );
}

export function SearchField({ placeholder, value, onChangeText, mic }: { placeholder: string; value?: string; onChangeText?: (t: string) => void; mic?: boolean }) {
  return (
    <View style={{ height: 38, borderRadius: 10, backgroundColor: colors.fill, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 10, marginTop: 10 }}>
      <Search size={19} color={colors.brand} strokeWidth={2.2} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.faint}
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, fontFamily: fonts.regular, fontSize: 16, color: colors.ink, paddingVertical: 0 }}
      />
      {mic ? <Mic size={18} color={colors.faint} /> : null}
    </View>
  );
}

/** Navigation bar for pushed screens: back label on the left, title or actions. */
export function NavBar({ back, title, left, right }: { back?: string; title?: string; left?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <View style={{ height: 44, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {left ??
          (back !== undefined ? (
            <Pressable onPress={() => router.back()} hitSlop={8} style={{ flexDirection: "row", alignItems: "center", marginLeft: -8 }}>
              <ChevronLeft size={28} color={colors.brand} strokeWidth={2.2} />
              <Txt size={17} tone="brand">{back}</Txt>
            </Pressable>
          ) : null)}
      </View>
      {title ? <Txt size={17} weight="semibold">{title}</Txt> : null}
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 18 }}>{right}</View>
    </View>
  );
}

export function NavText({ label, onPress, bold }: { label: string; onPress?: () => void; bold?: boolean }) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Txt size={17} tone="brand" weight={bold ? "semibold" : "regular"}>{label}</Txt>
    </Pressable>
  );
}

export function SectionHeader({ title, action, onAction, style }: { title: string; action?: string; onAction?: () => void; style?: ViewStyle }) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginBottom: 6 }, style]}>
      <Txt size={20} weight="bold" tight>{title}</Txt>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Txt size={15} weight="medium" tone="brand">{action}</Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Small uppercase caption above a group. */
export function Caption({ children }: { children: string }) {
  return (
    <Txt size={13} tone="faint" style={{ textTransform: "uppercase", paddingHorizontal: 32, marginBottom: 6, letterSpacing: 0.2 }}>
      {children}
    </Txt>
  );
}

/**
 * Full-width list row with an inset hairline separator under the text, iOS style.
 * `leading` is the avatar/icon, `trailing` sits before the optional chevron.
 */
export function Row({ leading, title, subtitle, subtitleTone, trailing, chevron, onPress, last, children }: {
  leading?: React.ReactNode;
  title?: string;
  subtitle?: string;
  subtitleTone?: "mute" | "faint" | "danger" | "ok" | "brand";
  trailing?: React.ReactNode;
  chevron?: boolean;
  onPress?: () => void;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => [{ flexDirection: "row", alignItems: "center", gap: 12, paddingLeft: 16 }, pressed && { backgroundColor: "#F2F2F7" }]}>
      {leading}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 11, paddingRight: 16, borderBottomWidth: last ? 0 : 0.5, borderBottomColor: "#C6C6C8", minHeight: 50 }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          {title ? <Txt size={16.5} numberOfLines={1}>{title}</Txt> : null}
          {subtitle ? <Txt size={13.5} tone={subtitleTone ?? "mute"} numberOfLines={1} style={{ marginTop: 1 }}>{subtitle}</Txt> : null}
          {children}
        </View>
        {trailing}
        {chevron ? <ChevronRight size={18} color={colors.chevron} strokeWidth={2.4} /> : null}
      </View>
    </Pressable>
  );
}

/** Bordered group of rows (settings, forms). */
export function Box({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[{ marginHorizontal: 16, borderWidth: 1, borderColor: colors.line, borderRadius: 14, overflow: "hidden" }, style]}>{children}</View>;
}

/** Light grey card used for home widgets and summaries. */
export function Card({ children, style, onPress }: { children: React.ReactNode; style?: ViewStyle; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[{ backgroundColor: colors.surface, borderRadius: 16, padding: 16 }, style]}>
      {children}
    </Pressable>
  );
}
