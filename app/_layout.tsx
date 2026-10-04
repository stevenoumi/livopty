// app/layout.tsx
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ChevronLeft } from "lucide-react-native";
import { useEffect } from "react";
import ChatHeader from "~/components/custom/chat/ChatHeader";
import { AuthProvider, useAuth } from "~/lib/context/AuthContext";
import { ChatProvider } from "~/lib/context/ChatContext";
import { LanguageProvider } from "~/lib/context/LanguageContext";
import "~/lib/i18n";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <ChatProvider>
          <RootNavigator />
        </ChatProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

// Routing is driven solely by the session: when `user` changes, Expo Router
// leaves the screens whose guard turned false, so screens never navigate
// after sign in or sign out themselves.
function RootNavigator() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Protected guard={!user}>
        <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
        <Stack.Screen name="loginPage" options={{ headerShown: false }} />
        <Stack.Screen name="registerPage" options={{ headerShown: false }} />
        <Stack.Screen name="verifyOtpPage" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen
          name="chatList"
          options={{ header: () => <ChatHeader /> }}
        />
        <Stack.Screen
          name="groceryList"
          options={{
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
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen name="draft" />
      </Stack.Protected>
    </Stack>
  );
}
