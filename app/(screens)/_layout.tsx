import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import { CalendarSync, House, MessageSquareText, ScrollText, Wallet, type LucideIcon } from "lucide-react-native";
import { colors, fonts } from "~/lib/theme";

const icon =
  (Icon: LucideIcon) =>
  ({ color }: { color: ColorValue }) => <Icon size={26} color={color as string} strokeWidth={1.7} />;

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: "#999999",
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 10 },
        tabBarStyle: { backgroundColor: "rgba(251,251,253,0.97)", borderTopColor: colors.line },
      }}
    >
      <Tabs.Screen name="Grocery" options={{ title: "Listes", tabBarIcon: icon(ScrollText) }} />
      <Tabs.Screen name="Chats" options={{ title: "Discussions", tabBarIcon: icon(MessageSquareText) }} />
      <Tabs.Screen name="Home" options={{ title: "Accueil", tabBarIcon: icon(House) }} />
      <Tabs.Screen name="Agenda" options={{ title: "Agenda", tabBarIcon: icon(CalendarSync) }} />
      <Tabs.Screen name="Finance" options={{ title: "Budget", tabBarIcon: icon(Wallet) }} />
    </Tabs>
  );
}
