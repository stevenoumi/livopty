import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPlus } from "lucide-react-native";
import LanguageSelector from "~/components/custom/LanguageSelector";
import Laguages from "~/lib/data/languageData";
import { signUpWithEmail } from "~/lib/services/supabase/authService";

const RegisterPage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(Laguages[0]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      Alert.alert("Champs requis", "Merci de remplir tous les champs.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Mot de passe trop court", "8 caractères minimum.");
      return;
    }

    if (!/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      Alert.alert(
        "Mot de passe faible",
        "Inclure au moins une lettre et un chiffre."
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const { success, error } = await signUpWithEmail(
      name.trim(),
      email.trim(),
      password
    );
    setLoading(false);

    if (!success) {
      Alert.alert("Erreur", error || "Erreur inconnue.");
      return;
    }

    Alert.alert("Succès", "Inscription réussie. Vérifiez vos e-mails.");
    router.push("/loginPage");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingBottom: insets.bottom }}
    >
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
              <LanguageSelector
                selectedLang={selectedLang}
                onSelect={setSelectedLang}
              />
            </View>

            {/* Logo */}
            <View className="items-center mt-2">
              <Image
                source={require("~/assets/images/logo-livopty.png")}
                className="w-44 h-44"
                resizeMode="contain"
                accessibilityLabel="Logo LivOpty"
              />
              <Text className="text-3xl font-bold text-center mt-4 text-zinc-900">
                Créez votre compte
              </Text>
              <Text className="text-sm text-zinc-500 text-center mt-2 px-6">
                Rejoignez LivOpty et commencez à organiser votre vie partagée
              </Text>
            </View>

            {/* Form */}
            <View className="mt-5 gap-4">
              <TextInput
                placeholder="Nom complet"
                placeholderTextColor="#a1a1aa"
                value={name}
                onChangeText={setName}
                className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 ${
                  attemptedSubmit && !name.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                accessibilityLabel="Nom complet"
                autoComplete="name"
                returnKeyType="next"
              />
              {attemptedSubmit && !name.trim() && (
                <Text className="text-red-500 text-sm ml-2">Nom requis</Text>
              )}

              <TextInput
                placeholder="Adresse e-mail"
                placeholderTextColor="#a1a1aa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 ${
                  attemptedSubmit && !email.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                accessibilityLabel="Adresse e-mail"
                autoComplete="email"
                returnKeyType="next"
              />
              {attemptedSubmit && !email.trim() && (
                <Text className="text-red-500 text-sm ml-2">Email requis</Text>
              )}

              <View className="relative">
                <TextInput
                  placeholder="Mot de passe"
                  placeholderTextColor="#a1a1aa"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 pr-10 ${
                    attemptedSubmit && !password.trim()
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  accessibilityLabel="Mot de passe"
                  autoComplete="password"
                  returnKeyType="next"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#a1a1aa"
                  />
                </Pressable>
              </View>
              {attemptedSubmit && !password.trim() && (
                <Text className="text-red-500 text-sm ml-2">
                  Mot de passe requis
                </Text>
              )}

              <TextInput
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#a1a1aa"
                secureTextEntry={!showPassword}
                value={confirm}
                onChangeText={setConfirm}
                className={`border rounded-xl px-4 py-3 text-base bg-white text-zinc-900 ${
                  attemptedSubmit && !confirm.trim()
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                accessibilityLabel="Confirmer le mot de passe"
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
              {attemptedSubmit && !confirm.trim() && (
                <Text className="text-red-500 text-sm ml-2">
                  Confirmation requise
                </Text>
              )}
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className={`w-full py-4 rounded-xl flex-row items-center justify-center mt-8 ${
                loading ? "bg-purple-400" : "bg-purple-700"
              } shadow-lg`}
              accessibilityRole="button"
              accessibilityLabel="Créer un compte"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <UserPlus size={20} color="#fff" />
                  <Text className="text-white font-semibold text-base ml-2">
                    Créer un compte
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="my-4">
              <Text className="text-sm text-zinc-400 text-center">
                Ou connectez-vous avec
              </Text>
            </View>

            {/* Social Auth */}
            <View className="flex-row justify-center gap-6 mb-4">
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
                  accessibilityRole="button"
                  accessibilityLabel={`Se connecter avec ${name}`}
                >
                  <Image
                    source={typeof icon === "string" ? { uri: icon } : icon}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </View>

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
                onPress={() =>
                  Alert.alert("Politique de confidentialité", "À venir...")
                }
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
