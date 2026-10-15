import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react-native";
import * as React from "react";
import { Pressable, TextInput, View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";

/** White page under the status bar. Tabs handle the bottom inset. */
export function Screen({
  children,
  edges = ["top"],
}: {
  children: React.ReactNode;
  edges?: Edge[];
}) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      {children}
    </SafeAreaView>
  );
}

/** Outlined "+" at the top right of each tab. */
export function AddButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Ajouter"
      className="h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-primary"
    >
      <Plus size={20} color={COLORS.primary} strokeWidth={2.4} />
    </Pressable>
  );
}

/** Large iOS title, the + button above it, an optional accessory on the right. */
export function LargeHeader({
  title,
  onAdd,
  accessory,
  children,
}: {
  title: string;
  onAdd?: () => void;
  accessory?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <View className="px-4">
      <View className="h-[38px] items-end justify-center">
        {onAdd ? <AddButton onPress={onAdd} /> : null}
      </View>
      <View className="flex-row items-end justify-between">
        <Text variant="display">{title}</Text>
        {accessory ? <View className="mb-1.5">{accessory}</View> : null}
      </View>
      {children}
    </View>
  );
}

export function SearchField({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View className="mt-2.5 h-[38px] flex-row items-center gap-2 rounded-[10px] bg-secondary px-2.5">
      <Search size={19} color={COLORS.primary} strokeWidth={2.2} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={placeholder}
        className="flex-1 py-0 font-sans text-base text-foreground"
      />
    </View>
  );
}

/** Bar of pushed screens: back label on the left, title or actions. */
export function NavBar({
  back,
  title,
  left,
  right,
}: {
  back?: string;
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <View className="h-11 flex-row items-center justify-between px-4">
      <View className="flex-1 items-start">
        {left ??
          (back !== undefined ? (
            <Pressable
              onPress={() => router.back()}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={back || "Retour"}
              className="-ml-2 flex-row items-center"
            >
              <ChevronLeft size={28} color={COLORS.primary} strokeWidth={2.2} />
              <Text tone="primary" className="text-[17px]">
                {back}
              </Text>
            </Pressable>
          ) : null)}
      </View>
      {title ? <Text variant="heading">{title}</Text> : null}
      <View className="flex-1 flex-row items-center justify-end gap-[18px]">
        {right}
      </View>
    </View>
  );
}

export function NavText({
  label,
  onPress,
  bold,
}: {
  label: string;
  onPress?: () => void;
  bold?: boolean;
}) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="button">
      <Text
        tone="primary"
        className={cn("text-[17px]", bold && "font-semibold")}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  className,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "mb-1.5 flex-row items-center justify-between px-4",
        className,
      )}
    >
      <Text variant="title" className="text-xl">
        {title}
      </Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button">
          <Text variant="label" tone="primary">
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Small uppercase caption above a bordered group. */
export function Caption({ children }: { children: string }) {
  return (
    <Text variant="caption" tone="muted" className="mb-1.5 px-8 uppercase">
      {children}
    </Text>
  );
}

/**
 * Full-width row with an inset hairline under the text, iOS style.
 * `leading` is the avatar or icon, `trailing` sits before the chevron.
 */
export function Row({
  leading,
  title,
  subtitle,
  subtitleClassName,
  trailing,
  chevron,
  onPress,
  last,
  children,
}: {
  leading?: React.ReactNode;
  title?: string;
  subtitle?: string;
  subtitleClassName?: string;
  trailing?: React.ReactNode;
  chevron?: boolean;
  onPress?: () => void;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center gap-3 pl-4 active:bg-muted"
    >
      {leading}
      <View
        className={cn(
          "min-h-[50px] flex-1 flex-row items-center gap-2 py-[11px] pr-4",
          !last && "border-b border-border",
        )}
      >
        <View className="min-w-0 flex-1">
          {title ? (
            <Text numberOfLines={1} className="text-[16.5px]">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              tone="muted"
              numberOfLines={1}
              className={cn("mt-px text-sm leading-5", subtitleClassName)}
            >
              {subtitle}
            </Text>
          ) : null}
          {children}
        </View>
        {trailing}
        {chevron ? (
          <ChevronRight size={18} color={COLORS.faint} strokeWidth={2.4} />
        ) : null}
      </View>
    </Pressable>
  );
}

/** Bordered group of rows (settings, forms). */
export function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "mx-4 overflow-hidden rounded-[14px] border border-border",
        className,
      )}
    >
      {children}
    </View>
  );
}

/** Light card for home widgets and summaries. */
export function Card({
  children,
  className,
  onPress,
}: {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={cn("rounded-2xl bg-muted p-4", className)}
    >
      {children}
    </Pressable>
  );
}
