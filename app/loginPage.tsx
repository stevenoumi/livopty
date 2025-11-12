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
import { Alert } from "react-native";
import LanguageSelector from "~/components/custom/LanguageSelector";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogIn } from "lucide-react-native";
import Languages from "~/lib/data/languageData";
import { signInWithEmail } from "~/lib/services/supabase/authService";

const LoginPage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLang, setSelectedLang] = useState(Languages[0]);
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    const { success, error } = await signInWithEmail(email.trim(), password);
    setLoading(false);

    if (!success) {
      Alert.alert("Erreur", error || "Échec de la connexion.");
      return;
    }

    Alert.alert("Succès", "Connexion réussie !");
    router.push("/(screens)/Chats");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 px-5"
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mt-2">
            <TouchableOpacity
              onPress={() => router.push("/welcomePage")}
              className="p-2"
            >
              <Ionicons name="chevron-back" size={26} color="#333" />
            </TouchableOpacity>
            <LanguageSelector
              selectedLang={selectedLang}
              onSelect={setSelectedLang}
            />
          </View>

          {/* Logo & Title */}
          <View className="items-center mt-5">
            <Image
              source={require("~/assets/images/logo-livopty.png")}
              className="w-44 h-44"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-center mt-4 text-zinc-900">
              Bienvenue sur <Text className="text-purple-700">LivOpty</Text>
            </Text>
            <Text className="text-sm text-zinc-500 text-center mt-4">
              L'application pour mieux vivre ensemble : gerer vos listes,
              agenda, budget, discussions... en toute simplicité !
            </Text>
          </View>

          {/* Form */}
          <View className="mt-8">
            <View className="mb-4">
              <TextInput
                placeholder="Votre adresse e-mail"
                placeholderTextColor="#a1a1aa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 ${
                  attemptedSubmit && !email
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
            </View>
            <View className="mb-2 relative">
              <TextInput
                placeholder="Votre mot de passe"
                placeholderTextColor="#a1a1aa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 pr-10 ${
                  attemptedSubmit && !password
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#a1a1aa"
                />
              </Pressable>
            </View>
            <View className="flex-row justify-end mb-4">
              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Mot de passe oublié",
                    "Fonctionnalité à venir..."
                  )
                }
              >
                <Text className="text-sm text-purple-600">
                  Mot de passe oublié ?
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center mt-4 ${
              loading ? "bg-purple-400" : "bg-purple-700"
            } shadow-lg`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <LogIn size={20} color="#fff" />
                <Text className="text-white font-semibold text-base ml-2">
                  Se connecter
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-6">
            <Text className="text-sm text-zinc-400 text-center">
              Ou connectez-vous avec
            </Text>
          </View>

          {/* Social Auth */}
          <View className="flex-row justify-center gap-6 mb-6">
            {[
              {
                icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
                name: "Google",
              },
              {
                icon: require("~/assets/images/apple.png"),
                name: "Apple",
              },
            ].map(({ icon, name }) => (
              <Pressable
                key={name}
                className="h-14 w-14 bg-white rounded-full items-center justify-center shadow-md border border-gray-200"
                android_ripple={{ color: "#eee", borderless: true }}
                onPress={() =>
                  Alert.alert(`Connexion avec ${name}`, "À venir...")
                }
              >
                <Image
                  source={typeof icon === "string" ? { uri: icon } : icon}
                  className="w-7 h-7"
                  resizeMode="contain"
                />
              </Pressable>
            ))}
          </View>

          {/* Create Account */}
          <View className="mt-2 flex-row justify-center">
            <Text className="text-sm text-zinc-500">
              Pas encore de compte ?{" "}
            </Text>
            <Pressable onPress={() => router.push("/registerPage")}>
              <Text className="text-sm text-purple-600 font-medium">
                Créer un compte
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <Text className="text-sm text-center text-zinc-400 px-6 mt-6 mb-4">
            En continuant, vous acceptez notre{" "}
            <Text
              onPress={() =>
                Alert.alert("Politique de confidentialité", "À venir...")
              }
              className="text-purple-600 underline"
            >
              politique de confidentialité
            </Text>
            .
          </Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginPage;
