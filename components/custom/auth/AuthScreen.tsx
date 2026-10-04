import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import * as React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSelector from "~/components/custom/auth/LanguageSelector";
import { COLORS } from "~/lib/constants";

type AuthScreenProps = {
  title: string;
  subtitle?: React.ReactNode;
  // Rendered above the scroll view, e.g. the screen's Toast.
  overlay?: React.ReactNode;
  children: React.ReactNode;
};

// Shared frame of the authentication screens: back button, language picker,
// logo, then a centred title and subtitle above the form.
export function AuthScreen({
  title,
  subtitle,
  overlay,
  children,
}: AuthScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      {overlay}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="px-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <View className="mt-2 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2"
              accessibilityRole="button"
              accessibilityLabel="Retour"
            >
              <ChevronLeft size={26} color={COLORS.foreground} />
            </TouchableOpacity>
            <LanguageSelector />
          </View>

          <View className="mt-2 items-center">
            <Image
              source={require("~/assets/images/logo-livopty.png")}
              className="h-36 w-36"
              resizeMode="contain"
              accessibilityLabel="Logo LivOpty"
            />
            <Text className="mt-4 text-center text-3xl font-bold text-foreground">
              {title}
            </Text>
            {subtitle ? (
              <Text className="mt-3 px-4 text-center text-base text-muted-foreground">
                {subtitle}
              </Text>
            ) : null}
          </View>

          <View className="mb-8 mt-8">{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
