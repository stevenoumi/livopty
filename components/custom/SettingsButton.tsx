import { router } from "expo-router";
import { Settings } from "lucide-react-native";
import * as React from "react";
import { Pressable } from "react-native";
import { COLORS, ROUTES } from "~/lib/constants";

export default function SettingsButton() {
  return (
    <Pressable
      onPress={() => router.push(ROUTES.SETTINGS)}
      className="p-2 ml-2"
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Paramètres"
    >
      <Settings color={COLORS.foreground} size={24} strokeWidth={1.75} />
    </Pressable>
  );
}
