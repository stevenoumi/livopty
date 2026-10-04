import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  Pressable,
} from "react-native";

import LanguageSelector from "~/components/custom/auth/LanguageSelector";
import Toast from "~/components/custom/Toast";
import { useToast } from "~/lib/hooks/useToast";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogIn } from "lucide-react-native";
import { signInWithEmail } from "~/lib/services/supabase/authService";
import { ROUTES } from "~/lib/constants";
import { useLanguage } from "~/lib/context/LanguageContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "~/lib/schemas/auth.schema";

const LoginPage = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { toast, hideToast, error, info } = useToast();
  const [showPassword, setShowPassword] = useState(false);
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
    <SafeAreaView className="flex-1 bg-white">
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
            >
              <Ionicons name="chevron-back" size={26} color="#333" />
            </TouchableOpacity>
            <LanguageSelector />
          </View>

          {/* Logo & Title */}
          <View className="items-center mt-5">
            <Image
              source={require("~/assets/images/logo-livopty.png")}
              className="w-44 h-44"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-center mt-4 text-zinc-900">
              {t("auth.login.title", { appName: "" })}
              <Text className="text-purple-700">LivOpty</Text>
            </Text>
            <Text className="text-sm text-zinc-500 text-center mt-4">
              {t("auth.login.subtitle")}
            </Text>
          </View>

          {/* Form */}
          <View className="mt-8">
            <View className="mb-5">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`bg-gray-50 rounded-2xl overflow-hidden ${
                        errors.email
                          ? "border-2 border-red-400"
                          : value
                            ? "border-2 border-purple-500"
                            : "border border-gray-200"
                      }`}
                    >
                      <TextInput
                        placeholder={t("auth.login.emailPlaceholder")}
                        placeholderTextColor="#9ca3af"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                        textContentType="emailAddress"
                        style={{
                          lineHeight: 22,
                          paddingVertical: 16,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          fontFamily: "Outfit_400Regular",
                        }}
                        className="bg-transparent text-zinc-900"
                      />
                    </View>
                    {errors.email && (
                      <View className="flex-row items-center mt-1.5 ml-1">
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color="#ef4444"
                        />
                        <Text className="text-red-500 text-xs ml-1 ">
                          {errors.email.message}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              />
            </View>
            <View className="mb-5">
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`bg-gray-50 rounded-2xl overflow-hidden ${
                        errors.password
                          ? "border-2 border-red-400"
                          : value
                            ? "border-2 border-purple-500"
                            : "border border-gray-200"
                      }`}
                    >
                      <View className="flex-row items-center">
                        <TextInput
                          placeholder={t("auth.login.passwordPlaceholder")}
                          placeholderTextColor="#9ca3af"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                          textContentType="password"
                          autoCorrect={false}
                          style={{
                            lineHeight: 22,
                            paddingVertical: 16,
                            paddingLeft: 16,
                            paddingRight: 50,
                            fontSize: 16,
                            fontFamily: "Outfit_400Regular",
                            flex: 1,
                          }}
                          className="bg-transparent text-zinc-900"
                        />
                        <Pressable
                          onPress={() => setShowPassword(!showPassword)}
                          className="absolute right-4"
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Ionicons
                            name={
                              showPassword ? "eye-off-outline" : "eye-outline"
                            }
                            size={22}
                            color="#6b7280"
                          />
                        </Pressable>
                      </View>
                    </View>
                    {errors.password && (
                      <View className="flex-row items-center mt-1.5 ml-1">
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color="#ef4444"
                        />
                        <Text className="text-red-500 text-xs ml-1 ">
                          {errors.password.message}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              />
            </View>
            <View className="flex-row justify-end mb-6">
              <Pressable
                onPress={() => info(t("alerts.comingSoon"))}
                className="py-1"
              >
                <Text className="text-sm text-purple-600  font-medium">
                  {t("auth.login.forgotPassword")}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            activeOpacity={0.8}
            className={`w-full py-4 mb-6 rounded-2xl flex-row items-center justify-center ${
              loading ? "bg-purple-400" : "bg-purple-600"
            } shadow-lg shadow-purple-500/30`}
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
              <>
                <LogIn size={20} color="#fff" strokeWidth={2.5} />
                <Text className="text-white  font-semibold text-base ml-2">
                  {t("auth.login.loginButton")}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Create Account */}
          <View className="mt-2 flex-row justify-center">
            <Text className="text-sm text-zinc-500">
              {t("auth.login.noAccount")}{" "}
            </Text>
            <Pressable onPress={() => router.push("/registerPage")}>
              <Text className="text-sm text-purple-600 font-medium">
                {t("auth.login.createAccount")}
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <Text className="text-sm text-center text-zinc-400 px-6 mt-6 mb-4">
            {t("auth.login.privacyText")}{" "}
            <Text
              onPress={() => info(t("alerts.comingSoon"))}
              className="text-purple-600 underline"
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
