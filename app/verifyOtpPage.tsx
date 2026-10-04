import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import Toast from "~/components/custom/Toast";
import { useToast } from "~/lib/hooks/useToast";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "~/lib/context/LanguageContext";
import { supabase } from "~/lib/services/supabase/supabase";
import { ROUTES } from "~/lib/constants";
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

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // Empêche la saisie non numérique
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Mettre à jour la valeur du formulaire
    setValue("otp", newOtp.join(""));

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (index === 5 && text) {
      Keyboard.dismiss();
    }
  };

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
    } catch (err) {
      error(t("errors.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
    } catch (err) {
      error(t("errors.unknownError"));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <View className="flex-1 px-4 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={handleBack} className="p-1">
            <Ionicons name="chevron-back" size={28} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 justify-start gap-6 mt-10">
          <Image
            source={require("~/assets/images/logo-livopty.png")}
            className="w-auto h-48 self-center"
            resizeMode="contain"
          />
          <Text className="text-3xl font-outfit font-bold text-zinc-900 text-center">
            {t("auth.verifyOtp.title")}
          </Text>
          <Text className="text-base font-outfit text-zinc-500 text-center px-4">
            {t("auth.verifyOtp.subtitle")}{" "}
            <Text className="font-outfit font-semibold text-zinc-700">
              {email}
            </Text>
          </Text>

          {/* OTP input */}
          <View className="mt-4">
            <View className="flex-row justify-center gap-2">
              {otp.map((digit, index) => (
                <View
                  key={index}
                  className={`bg-gray-50 rounded-2xl overflow-hidden ${
                    errors.otp
                      ? "border-2 border-red-400"
                      : digit
                        ? "border-2 border-purple-500"
                        : "border border-gray-200"
                  }`}
                >
                  <TextInput
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    returnKeyType="done"
                    autoFocus={index === 0}
                    style={{
                      width: 48,
                      height: 56,
                      lineHeight: 22,
                      fontSize: 24,
                      fontFamily: "Outfit_600SemiBold",
                      textAlign: "center",
                    }}
                    className="bg-transparent text-zinc-900"
                  />
                </View>
              ))}
            </View>
            {errors.otp && (
              <View className="flex-row items-center justify-center mt-2">
                <Ionicons name="alert-circle" size={14} color="#ef4444" />
                <Text className="text-red-500 text-xs ml-1 font-outfit">
                  {errors.otp.message}
                </Text>
              </View>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading || otp.join("").length < 6}
            activeOpacity={0.8}
            className={`w-full py-4 mt-4 rounded-2xl shadow-lg items-center justify-center ${
              loading || otp.join("").length < 6
                ? "bg-purple-400"
                : "bg-purple-600"
            } shadow-purple-500/30`}
            style={{
              shadowColor: "#7c3aed",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white text-center font-outfit font-semibold text-base">
                {t("auth.verifyOtp.verifyButton")}
              </Text>
            )}
          </TouchableOpacity>

          {/* Resend link */}
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendLoading}
            className="py-2"
          >
            {resendLoading ? (
              <ActivityIndicator color="#7c3aed" size="small" />
            ) : (
              <Text className="text-sm text-center font-outfit font-medium text-purple-600">
                {t("auth.verifyOtp.resendCode")}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <TouchableOpacity onPress={() => router.push(ROUTES.LOGIN)}>
          <Text className="text-sm text-center font-outfit text-gray-400 mb-6">
            {t("auth.verifyOtp.wrongEmail")}{" "}
            <Text className="text-purple-600 font-outfit font-medium">
              {t("auth.verifyOtp.changeEmail")}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtpPage;
