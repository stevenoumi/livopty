import { Tabs } from "expo-router";
import { CalendarSync, HomeIcon, ScrollText, Wallet } from "lucide-react-native";
import New from "~/components/custom/New";
import SettingsButton from "~/components/custom/SettingsButton";
import { MessageSquareText } from "~/lib/icons/MessageSquareText";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7c3aed",
        headerLeft: () => <SettingsButton />,
        tabBarStyle: { backgroundColor: "white" },
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="Grocery"
        options={{
          title: "Listes",
          headerShadowVisible: false,
          headerRight: () => <New />,
          headerTitle: () => <></>,
          tabBarIcon: ({ color }) => (
            <ScrollText color={color} size={25} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chats"
        options={{
          title: "Discussions",
          headerTitle: () => <></>,
          headerShadowVisible: false,
          headerRight: () => <New />,
          tabBarIcon: ({ color }) => (
            <MessageSquareText color={color} size={25} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Accueil",
          headerTitle: () => <></>,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} size={25} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="Agenda"
        options={{
          title: "Agenda",
          // Hidden until the agenda exists, an empty tab reads as a bug.
          href: null,
          headerShadowVisible: false,
          headerRight: () => <New />,
          headerTitle: () => <></>,
          tabBarIcon: ({ color }) => (
            <CalendarSync color={color} size={25} strokeWidth={1.75} />
          ),
        }}
      />
      <Tabs.Screen
        name="Finance"
        options={{
          title: "Budget",
          headerShadowVisible: false,
          headerRight: () => <New />,
          headerTitle: () => <></>,
          tabBarIcon: ({ color }) => (
            <Wallet color={color} size={25} strokeWidth={1.75} />
          ),
        }}
      />
    </Tabs>
  );
}
