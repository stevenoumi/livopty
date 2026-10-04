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
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import Toast from "~/components/custom/Toast";
import { Button } from "~/components/ui/button";
import { FormField, PasswordField } from "~/components/ui/form-field";
import { Text as UIText } from "~/components/ui/text";
import { useToast } from "~/lib/hooks/useToast";
import { useRouter } from "expo-router";
import { ChevronLeft, UserPlus } from "lucide-react-native";
import LanguageSelector from "~/components/custom/auth/LanguageSelector";
import { SocialAuthButtons } from "~/components/custom/auth/SocialAuthButtons";
import { signUpWithEmail } from "~/lib/services/supabase/authService";
import { COLORS, ROUTES } from "~/lib/constants";
import { useLanguage } from "~/lib/context/LanguageContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormData,
} from "~/lib/schemas/auth.schema";

const RegisterPage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, error, info } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    const {
      success: isSuccess,
      error: authError,
      hasSession,
    } = await signUpWithEmail({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (!isSuccess) {
      error(authError || t("errors.unknownError"));
      return;
    }

    // Without a session, Supabase is waiting for the emailed code; with one,
    // the root layout already moves the user into the app.
    if (!hasSession) {
      router.push({
        pathname: ROUTES.VERIFY_OTP,
        params: { email: data.email },
      });
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      style={{ paddingBottom: insets.bottom }}
    >
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mt-2">
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

            {/* Logo */}
            <View className="items-center mt-2">
              <Image
                source={require("~/assets/images/logo-livopty.png")}
                className="w-44 h-44"
                resizeMode="contain"
                accessibilityLabel="Logo LivOpty"
              />
              <Text className="text-3xl font-bold text-center mt-4 text-foreground">
                {t("auth.register.title")}
              </Text>
              <Text className="text-sm text-muted-foreground text-center mt-2 px-6">
                {t("auth.register.subtitle")}
              </Text>
            </View>

            {/* Form */}
            <View className="mt-5 gap-5">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    placeholder={t("auth.register.namePlaceholder")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.name?.message}
                    autoCapitalize="words"
                    textContentType="name"
                    autoComplete="name"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormField
                    placeholder={t("auth.register.emailPlaceholder")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoCorrect={false}
                    returnKeyType="next"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordField
                    placeholder={t("auth.register.passwordPlaceholder")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    textContentType="newPassword"
                    autoComplete="new-password"
                    returnKeyType="next"
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordField
                    placeholder={t("auth.register.confirmPasswordPlaceholder")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.confirmPassword?.message}
                    textContentType="newPassword"
                    autoComplete="new-password"
                    returnKeyType="done"
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                )}
              />
            </View>

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              className="mt-8 mb-6"
            >
              <UserPlus
                size={20}
                color={COLORS.primaryForeground}
                strokeWidth={2.5}
              />
              <UIText>{t("auth.register.registerButton")}</UIText>
            </Button>

            <View className="mb-6">
              <SocialAuthButtons mode="signUp" onError={error} />
            </View>

            {/* Already have account */}
            <View className="flex-row justify-center">
              <Text className="text-sm text-muted-foreground">
                {t("auth.register.haveAccount")}{" "}
              </Text>
              <Pressable
                onPress={() => router.push(ROUTES.LOGIN)}
                accessibilityRole="button"
              >
                <Text className="text-sm text-primary font-medium">
                  {t("auth.register.loginLink")}
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <Text className="text-sm text-center text-muted-foreground px-6 mt-6 mb-4">
              {t("auth.login.privacyText")}{" "}
              <Text
                onPress={() => info(t("alerts.comingSoon"))}
                className="text-primary underline"
                accessibilityRole="link"
              >
                {t("auth.login.privacyLink")}
              </Text>
              .
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterPage;
