// app/layout.tsx
import { Stack } from "expo-router";
import ChatHeader from "~/components/custom/ChatHeader";
import { ChatProvider } from "~/lib/context/ChatContext";
import { AuthProvider } from "~/lib/context/AuthContext";
import { ArrowBigLeft, ChevronLeft } from "lucide-react-native";

export default function Layout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Stack>
          <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
          <Stack.Screen name="loginPage" options={{ headerShown: false }} />
          <Stack.Screen name="registerPage" options={{ headerShown: false }} />
          <Stack.Screen name="verifyOtpPage" options={{ headerShown: false }} />
          <Stack.Screen
            name="chatList"
            options={{ header: () => <ChatHeader /> }}
          />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="groceryList" options={{  
            headerShown: false,
            headerTitle: () => <></>,
            headerShadowVisible: false,
            headerLeft: () => (
              <ChevronLeft
                className="text-foreground pb-2"
                size={25}
                strokeWidth={1.75}
              />
            ),
          }} />
        </Stack>
      </ChatProvider>
    </AuthProvider>
  );
}
