import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
} from "react-native";

import LanguageSelector from "~/components/custom/auth/LanguageSelector";
import Toast from "~/components/custom/Toast";
import { Button } from "~/components/ui/button";
import { FormField, PasswordField } from "~/components/ui/form-field";
import { Text as UIText } from "~/components/ui/text";
import { useToast } from "~/lib/hooks/useToast";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, LogIn } from "lucide-react-native";
import { signInWithEmail } from "~/lib/services/supabase/authService";
import { COLORS, ROUTES } from "~/lib/constants";
import { useLanguage } from "~/lib/context/LanguageContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "~/lib/schemas/auth.schema";

const LoginPage = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, error, info } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const { success: isSuccess, error: authError } =
      await signInWithEmail(data);
    setLoading(false);

    if (!isSuccess) {
      error(authError || t("auth.login.loginError"));
      return;
    }

    // Navigation happens in the root layout once the session is set.
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 px-5"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mt-2">
            <TouchableOpacity
              onPress={() => router.push(ROUTES.WELCOME)}
              className="p-2"
              accessibilityRole="button"
              accessibilityLabel="Retour"
            >
              <ChevronLeft size={26} color={COLORS.foreground} />
            </TouchableOpacity>
            <LanguageSelector />
          </View>

          {/* Logo & Title */}
          <View className="items-center mt-5">
            <Image
              source={require("~/assets/images/logo-livopty.png")}
              className="w-44 h-44"
              resizeMode="contain"
              accessibilityLabel="Logo LivOpty"
            />
            <Text className="text-3xl font-bold text-center mt-4 text-foreground">
              {t("auth.login.title", { appName: "" })}
              <Text className="text-primary">LivOpty</Text>
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-4">
              {t("auth.login.subtitle")}
            </Text>
          </View>

          {/* Form */}
          <View className="mt-8 gap-5">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder={t("auth.login.emailPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  autoComplete="email"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordField
                  placeholder={t("auth.login.passwordPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  textContentType="password"
                  autoComplete="current-password"
                />
              )}
            />
          </View>
          <View className="flex-row justify-end mt-3 mb-6">
            <Pressable
              onPress={() => router.push(ROUTES.FORGOT_PASSWORD)}
              className="py-1"
              accessibilityRole="button"
            >
              <Text className="text-sm text-primary font-medium">
                {t("auth.login.forgotPassword")}
              </Text>
            </Pressable>
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            className="mb-6"
          >
            <LogIn
              size={20}
              color={COLORS.primaryForeground}
              strokeWidth={2.5}
            />
            <UIText>{t("auth.login.loginButton")}</UIText>
          </Button>

          {/* Create Account */}
          <View className="mt-2 flex-row justify-center">
            <Text className="text-sm text-muted-foreground">
              {t("auth.login.noAccount")}{" "}
            </Text>
            <Pressable
              onPress={() => router.push(ROUTES.REGISTER)}
              accessibilityRole="button"
            >
              <Text className="text-sm text-primary font-medium">
                {t("auth.login.createAccount")}
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <Text className="text-sm text-center text-muted-foreground px-6 mt-6 mb-4">
            {t("auth.login.privacyText")}{" "}
            <Text
              onPress={() => info(t("alerts.comingSoon"))}
              className="text-primary underline"
            >
              {t("auth.login.privacyLink")}
            </Text>
            .
          </Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginPage;
