import { Tabs } from "expo-router";
import {
  CalendarSync,
  House,
  MessageSquareText,
  ScrollText,
  Wallet,
  type LucideIcon,
} from "lucide-react-native";
import type { ColorValue } from "react-native";
import { COLORS } from "~/lib/constants";

function tabIcon(Icon: LucideIcon) {
  return function TabIcon({ color }: { color: ColorValue }) {
    return <Icon color={color as string} size={26} strokeWidth={1.7} />;
  };
}

// Each screen draws its own large title, so the native headers are hidden.
export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.faint,
        tabBarLabelStyle: { fontFamily: "Outfit_500Medium", fontSize: 10.5 },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tabs.Screen
        name="Grocery"
        options={{ title: "Listes", tabBarIcon: tabIcon(ScrollText) }}
      />
      <Tabs.Screen
        name="Chats"
        options={{
          title: "Discussions",
          tabBarIcon: tabIcon(MessageSquareText),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{ title: "Accueil", tabBarIcon: tabIcon(House) }}
      />
      <Tabs.Screen
        name="Agenda"
        options={{ title: "Agenda", tabBarIcon: tabIcon(CalendarSync) }}
      />
      <Tabs.Screen
        name="Finance"
        options={{ title: "Budget", tabBarIcon: tabIcon(Wallet) }}
      />
    </Tabs>
  );
}
