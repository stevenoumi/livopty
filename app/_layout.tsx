// app/layout.tsx
import { Stack } from "expo-router";
import ChatHeader from "~/components/custom/ChatHeader";
import { ChatProvider } from "~/lib/context/ChatContext";
import { AuthProvider } from "~/lib/context/AuthContext";
import { LanguageProvider } from "~/lib/context/LanguageContext";
import { ArrowBigLeft, ChevronLeft } from "lucide-react-native";
import "~/lib/i18n";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <ChatProvider>
          <Stack>
            <Stack.Screen name="welcomePage" options={{ headerShown: false }} />
            <Stack.Screen name="loginPage" options={{ headerShown: false }} />
            <Stack.Screen
              name="registerPage"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verifyOtpPage"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="chatList"
              options={{ header: () => <ChatHeader /> }}
            />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
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
          </Stack>
        </ChatProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
