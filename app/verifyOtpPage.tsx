import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Toast from "~/components/custom/Toast";
import { Button } from "~/components/ui/button";
import { OtpInput } from "~/components/ui/otp-input";
import { Text as UIText } from "~/components/ui/text";
import { useToast } from "~/lib/hooks/useToast";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "~/lib/context/LanguageContext";
import { supabase } from "~/lib/services/supabase/supabase";
import { COLORS, ROUTES } from "~/lib/constants";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "~/lib/schemas/auth.schema";

const VerifyOtpPage = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, success, error } = useToast();
  const params = useLocalSearchParams<{ email?: string }>();
  const email = params.email || "";

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const otpComplete = watch("otp").length === 6;

  const onSubmit = async (data: VerifyOtpFormData) => {
    if (!email) {
      error("Email manquant");
      return;
    }

    setLoading(true);
    try {
      const { error: otpError } = await supabase.auth.verifyOtp({
        email,
        token: data.otp,
        type: "email",
      });

      if (otpError) {
        error(otpError.message);
        return;
      }

      // The root layout navigates into the app once the session is set.
    } catch {
      error(t("errors.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      error("Email manquant");
      return;
    }

    setResendLoading(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) {
        error(resendError.message);
      } else {
        success(t("auth.verifyOtp.resendSuccess"));
      }
    } catch {
      error(t("errors.unknownError"));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-1"
            accessibilityRole="button"
            accessibilityLabel="Retour"
          >
            <ChevronLeft size={28} color={COLORS.foreground} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 justify-start gap-6 mt-10">
          <Image
            source={require("~/assets/images/logo-livopty.png")}
            className="w-auto h-48 self-center"
            resizeMode="contain"
            accessibilityLabel="Logo LivOpty"
          />
          <Text className="text-3xl font-bold text-foreground text-center">
            {t("auth.verifyOtp.title")}
          </Text>
          <Text className="text-base text-muted-foreground text-center px-4">
            {t("auth.verifyOtp.subtitle")}{" "}
            <Text className="font-semibold text-foreground">{email}</Text>
          </Text>

          <View className="mt-4">
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
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={!otpComplete}
            className="mt-4"
          >
            <UIText>{t("auth.verifyOtp.verifyButton")}</UIText>
          </Button>

          <Button variant="link" onPress={handleResend} loading={resendLoading}>
            <UIText>{t("auth.verifyOtp.resendCode")}</UIText>
          </Button>
        </View>

        {/* Footer */}
        <TouchableOpacity
          onPress={() => router.push(ROUTES.LOGIN)}
          accessibilityRole="button"
        >
          <Text className="text-sm text-center text-muted-foreground mb-6">
            {t("auth.verifyOtp.wrongEmail")}{" "}
            <Text className="text-primary font-medium">
              {t("auth.verifyOtp.changeEmail")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtpPage;
