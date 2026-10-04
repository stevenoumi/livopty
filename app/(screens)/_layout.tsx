import { Tabs } from "expo-router";
import { CalendarSync, HomeIcon, ScrollText, Wallet } from "lucide-react-native";
import New from "~/components/custom/New";
import { MessageSquareText } from "~/lib/icons/MessageSquareText";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "purple",
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
          tabBarIcon: ({ color, size }) => (
            <ScrollText
              className="text-foreground pb-2"
              size={25}
              strokeWidth={1.75}
            />
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
          tabBarIcon: ({ color, size }) => (
            <MessageSquareText
              className="text-foreground pb-2"
              size={25}
              strokeWidth={1.75}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Accueil",
          headerTitle: () => <></>,
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <HomeIcon
              className="text-foreground pb-2 bg-purple-300 rounded-full"
              size={25}
              strokeWidth={1.75}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="Agenda"
        options={{
          title: "Agenda",
          headerShadowVisible: false,
          headerRight: () => <New />,
          headerTitle: () => <></>,
          tabBarIcon: ({ color, size }) => (
            <CalendarSync
              className="text-foreground pb-2"
              size={25}
              strokeWidth={1.75}
            />
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
          tabBarIcon: ({ color, size }) => (
            <Wallet
              className="text-foreground pb-2"
              size={25}
              strokeWidth={1.75}
            />
          ),
        }}
      />
    </Tabs>
  );
}
