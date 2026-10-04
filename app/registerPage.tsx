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
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "~/components/custom/Toast";
import { useToast } from "~/lib/hooks/useToast";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPlus } from "lucide-react-native";
import LanguageSelector from "~/components/custom/auth/LanguageSelector";
import { signUpWithEmail } from "~/lib/services/supabase/authService";
import { ROUTES } from "~/lib/constants";
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
  const [showPassword, setShowPassword] = useState(false);
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
      className="flex-1 bg-white"
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
                <Ionicons name="chevron-back" size={26} color="#333" />
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
              <Text className="text-3xl  font-bold text-center mt-4 text-zinc-900">
                {t("auth.register.title")}
              </Text>
              <Text className="text-sm  text-zinc-500 text-center mt-2 px-6">
                {t("auth.register.subtitle")}
              </Text>
            </View>

            {/* Form */}
            <View className="mt-5 gap-5">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`bg-gray-50 rounded-2xl overflow-hidden ${
                        errors.name
                          ? "border-2 border-red-400"
                          : value
                          ? "border-2 border-purple-500"
                          : "border border-gray-200"
                      }`}
                    >
                      <TextInput
                        placeholder={t("auth.register.namePlaceholder")}
                        placeholderTextColor="#9ca3af"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="words"
                        textContentType="name"
                        autoCorrect={false}
                        returnKeyType="next"
                        style={{
                          lineHeight: 22,
                          paddingVertical: 16,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          fontFamily: "Outfit_400Regular",
                        }}
                        className="bg-transparent text-zinc-900"
                        accessibilityLabel="Nom complet"
                      />
                    </View>
                    {errors.name && (
                      <View className="flex-row items-center mt-1.5 ml-1">
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color="#ef4444"
                        />
                        <Text className="text-red-500 text-xs ml-1 ">
                          {errors.name.message}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              />

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
                        placeholder={t("auth.register.emailPlaceholder")}
                        placeholderTextColor="#9ca3af"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoCorrect={false}
                        returnKeyType="next"
                        style={{
                          lineHeight: 22,
                          paddingVertical: 16,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          fontFamily: "Outfit_400Regular",
                        }}
                        className="bg-transparent text-zinc-900"
                        accessibilityLabel="Adresse e-mail"
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
                          placeholder={t("auth.register.passwordPlaceholder")}
                          placeholderTextColor="#9ca3af"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          secureTextEntry={!showPassword}
                          textContentType="newPassword"
                          autoCorrect={false}
                          returnKeyType="next"
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
                          accessibilityLabel="Mot de passe"
                        />
                        <Pressable
                          onPress={() => setShowPassword(!showPassword)}
                          className="absolute right-4"
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          accessibilityRole="button"
                          accessibilityLabel={
                            showPassword
                              ? "Masquer le mot de passe"
                              : "Afficher le mot de passe"
                          }
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

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View
                      className={`bg-gray-50 rounded-2xl overflow-hidden ${
                        errors.confirmPassword
                          ? "border-2 border-red-400"
                          : value
                          ? "border-2 border-purple-500"
                          : "border border-gray-200"
                      }`}
                    >
                      <TextInput
                        placeholder={t(
                          "auth.register.confirmPasswordPlaceholder"
                        )}
                        placeholderTextColor="#9ca3af"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        textContentType="newPassword"
                        autoCorrect={false}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                        }}
                        style={{
                          lineHeight: 22,
                          paddingVertical: 16,
                          paddingHorizontal: 16,
                          fontSize: 16,
                          fontFamily: "Outfit_400Regular",
                        }}
                        className="bg-transparent text-zinc-900"
                        accessibilityLabel="Confirmer le mot de passe"
                      />
                    </View>
                    {errors.confirmPassword && (
                      <View className="flex-row items-center mt-1.5 ml-1">
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color="#ef4444"
                        />
                        <Text className="text-red-500 text-xs ml-1 ">
                          {errors.confirmPassword.message}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              activeOpacity={0.8}
              className={`w-full py-4 rounded-2xl flex-row items-center justify-center mt-8 mb-6 ${
                loading ? "bg-purple-400" : "bg-purple-600"
              } shadow-lg shadow-purple-500/30`}
              style={{
                shadowColor: "#7c3aed",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
              accessibilityRole="button"
              accessibilityLabel="Créer un compte"
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <UserPlus size={20} color="#fff" strokeWidth={2.5} />
                  <Text className="text-white  font-semibold text-base ml-2">
                    {t("auth.register.registerButton")}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Already have account */}
            <View className="flex-row justify-center">
              <Text className="text-sm text-zinc-500">Déjà un compte ? </Text>
              <Pressable
                onPress={() => router.push("/loginPage")}
                accessibilityRole="button"
                accessibilityLabel="Aller à la page de connexion"
              >
                <Text className="text-sm text-purple-600 font-medium">
                  Se connecter
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <Text className="text-sm text-center text-zinc-400 px-6 mt-6 mb-4">
              En vous inscrivant, vous acceptez notre{" "}
              <Text
                onPress={() => info("À venir...")}
                className="text-purple-600 underline"
                accessibilityRole="link"
              >
                politique de confidentialité
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
