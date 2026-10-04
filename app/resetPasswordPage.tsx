import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyRound } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, View } from "react-native";
import { AuthScreen } from "~/components/custom/auth/AuthScreen";
import Toast from "~/components/custom/Toast";
import { Button } from "~/components/ui/button";
import { PasswordField } from "~/components/ui/form-field";
import { OtpInput } from "~/components/ui/otp-input";
import { Text as UIText } from "~/components/ui/text";
import { COLORS, ROUTES } from "~/lib/constants";
import { useLanguage } from "~/lib/context/LanguageContext";
import { useToast } from "~/lib/hooks/useToast";
import {
  resetPasswordWithCodeSchema,
  type ResetPasswordWithCodeFormData,
} from "~/lib/schemas/auth.schema";
import {
  requestPasswordReset,
  updatePassword,
  verifyRecoveryCode,
} from "~/lib/services/supabase/authService";

// This screen is deliberately outside the auth guards in the root layout:
// verifying the code opens a session, and the screen must stay mounted to
// set the new password afterwards.
export default function ResetPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, success, error } = useToast();
  const { email = "" } = useLocalSearchParams<{ email?: string }>();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  // The code is single use: if the password update fails after a successful
  // verification, a retry must not send the code again.
  const [codeVerified, setCodeVerified] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordWithCodeFormData>({
    resolver: zodResolver(resetPasswordWithCodeSchema),
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordWithCodeFormData) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (!codeVerified) {
        const verification = await verifyRecoveryCode(email, data.otp);
        if (!verification.success) {
          error(verification.error || t("errors.unknownError"));
          return;
        }
        setCodeVerified(true);
      }

      const update = await updatePassword(data.password);
      if (!update.success) {
        error(update.error || t("errors.unknownError"));
        return;
      }

      router.replace(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    const result = await requestPasswordReset(email);
    setResendLoading(false);

    if (result.success) {
      success(t("auth.resetPassword.resendSuccess"));
    } else {
      error(result.error || t("errors.unknownError"));
    }
  };

  return (
    <AuthScreen
      title={t("auth.resetPassword.title")}
      subtitle={
        <>
          {t("auth.resetPassword.subtitle")}{" "}
          <Text className="font-semibold text-foreground">{email}</Text>
        </>
      }
      overlay={
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={hideToast}
        />
      }
    >
      <View className="gap-5">
        {codeVerified ? null : (
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <OtpInput
                value={value}
                onChange={onChange}
                error={errors.otp?.message}
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              placeholder={t("auth.resetPassword.passwordPlaceholder")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              textContentType="newPassword"
              autoComplete="new-password"
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              placeholder={t("auth.resetPassword.confirmPasswordPlaceholder")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              textContentType="newPassword"
              autoComplete="new-password"
              returnKeyType="done"
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
        <KeyRound
          size={20}
          color={COLORS.primaryForeground}
          strokeWidth={2.5}
        />
        <UIText>{t("auth.resetPassword.submitButton")}</UIText>
      </Button>

      {codeVerified ? null : (
        <Button
          variant="link"
          onPress={handleResend}
          loading={resendLoading}
          className="mt-2"
        >
          <UIText>{t("auth.resetPassword.resendCode")}</UIText>
        </Button>
      )}
    </AuthScreen>
  );
}
