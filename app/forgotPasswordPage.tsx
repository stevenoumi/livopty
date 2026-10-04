import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { ChevronLeft, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "~/components/custom/Toast";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form-field";
import { Text as UIText } from "~/components/ui/text";
import { COLORS, ROUTES } from "~/lib/constants";
import { useLanguage } from "~/lib/context/LanguageContext";
import { useToast } from "~/lib/hooks/useToast";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "~/lib/schemas/auth.schema";
import { requestPasswordReset } from "~/lib/services/supabase/authService";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, error } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    const result = await requestPasswordReset(data.email);
    setLoading(false);

    if (!result.success) {
      error(result.error || t("errors.unknownError"));
      return;
    }

    router.push({
      pathname: ROUTES.RESET_PASSWORD,
      params: { email: data.email },
    });
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
          <View className="mt-2 flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2"
              accessibilityRole="button"
              accessibilityLabel="Retour"
            >
              <ChevronLeft size={26} color={COLORS.foreground} />
            </TouchableOpacity>
          </View>

          <View className="mt-10 gap-4">
            <Text className="text-3xl font-bold text-foreground">
              {t("auth.forgotPassword.title")}
            </Text>
            <Text className="text-base text-muted-foreground">
              {t("auth.forgotPassword.subtitle")}
            </Text>
          </View>

          <View className="mt-8">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder={t("auth.forgotPassword.emailPlaceholder")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  autoCorrect={false}
                  autoFocus
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            className="mt-8"
          >
            <Mail
              size={20}
              color={COLORS.primaryForeground}
              strokeWidth={2.5}
            />
            <UIText>{t("auth.forgotPassword.sendButton")}</UIText>
          </Button>

          <Button variant="link" onPress={() => router.back()} className="mt-2">
            <UIText>{t("auth.forgotPassword.backToLogin")}</UIText>
          </Button>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
