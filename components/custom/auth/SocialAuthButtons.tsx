import * as AppleAuthentication from "expo-apple-authentication";
import * as React from "react";
import { Text, View } from "react-native";
import { GoogleLogo } from "~/components/custom/auth/GoogleLogo";
import { Button } from "~/components/ui/button";
import { Text as UIText } from "~/components/ui/text";
import { useLanguage } from "~/lib/context/LanguageContext";
import {
  isAppleSignInAvailable,
  isGoogleSignInAvailable,
  signInWithApple,
  signInWithGoogle,
} from "~/lib/services/supabase/socialAuth";
import type { AuthResponse } from "~/lib/types/auth";

type SocialAuthButtonsProps = {
  // Apple shows "Sign up with Apple" or "Continue with Apple" from this.
  mode: "signIn" | "signUp";
  onError: (message: string) => void;
};

export function SocialAuthButtons({ mode, onError }: SocialAuthButtonsProps) {
  const { t } = useLanguage();
  const [appleAvailable, setAppleAvailable] = React.useState(false);
  const [pending, setPending] = React.useState<"apple" | "google" | null>(null);

  React.useEffect(() => {
    isAppleSignInAvailable().then(setAppleAvailable);
  }, []);

  if (!appleAvailable && !isGoogleSignInAvailable) {
    return null;
  }

  // Navigation is left to the root layout, which reacts to the new session.
  const run = async (
    provider: "apple" | "google",
    signIn: () => Promise<AuthResponse>,
  ) => {
    setPending(provider);
    const result = await signIn();
    setPending(null);
    if (!result.success && !result.cancelled) {
      onError(result.error || t("auth.social.error"));
    }
  };

  return (
    <View className="gap-3">
      <View className="my-2 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-border" />
        <Text className="text-sm text-muted-foreground">
          {t("auth.social.or")}
        </Text>
        <View className="h-px flex-1 bg-border" />
      </View>

      {appleAvailable ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            mode === "signUp"
              ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
              : AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={16}
          style={{ height: 56, opacity: pending ? 0.6 : 1 }}
          onPress={() => {
            if (!pending) {
              run("apple", signInWithApple);
            }
          }}
        />
      ) : null}

      {isGoogleSignInAvailable ? (
        <Button
          variant="outline"
          loading={pending === "google"}
          disabled={pending !== null}
          onPress={() => run("google", signInWithGoogle)}
          accessibilityLabel={t("auth.social.continueWithGoogle")}
        >
          <GoogleLogo />
          <UIText>{t("auth.social.continueWithGoogle")}</UIText>
        </Button>
      ) : null}
    </View>
  );
}
