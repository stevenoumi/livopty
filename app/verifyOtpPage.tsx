import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const VerifyOtpPage = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // Empêche la saisie non numérique
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      (inputsRef.current[index + 1] as any)?.focus();
    }

    if (index === 5 && text) {
      Keyboard.dismiss();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6 || code.includes("")) {
      Alert.alert("Code incomplet", "Veuillez entrer les 6 chiffres du code.");
      return;
    }

    // Ex. : Remplacer par vérification backend
    if (code === "123456") {
      Alert.alert("Succès", "Code vérifié !");
      router.push("/(screens)/Chats");
    } else {
      Alert.alert("Erreur", "Le code est incorrect.");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleResend = () => {
    Alert.alert("Nouveau code", "Un nouveau code a été envoyé par SMS.");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <Text className="text-3xl font-bold text-zinc-900 text-center">
            Vérification du code
          </Text>
          <Text className="text-base text-zinc-500 text-center px-2">
            Saisissez le code à 6 chiffres que nous vous avons envoyé par SMS.
          </Text>

          {/* OTP input */}
          <View className="flex-row justify-center mt-4">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                returnKeyType="done"
                style={{ marginHorizontal: 4 , textAlignVertical: "center" }}
                autoFocus={index === 0}
                className="w-12 h-14 border border-gray-300 rounded-xl text-xl font-bold text-gray-900 bg-white shadow-sm"
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerify}
            className="w-full py-4 mt-4 rounded-2xl bg-purple-700 shadow-lg items-center justify-center"
          >
            <Text className="text-white text-center font-semibold text-base">
              Vérifier le code
            </Text>
          </TouchableOpacity>

          {/* Resend link */}
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-sm text-center text-purple-600 underline mt-2">
              Renvoyer un nouveau code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text className="text-sm text-center text-gray-400 mb-6">
          Un problème ? Contactez notre{" "}
          <Text className="text-purple-600 underline">support</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtpPage;
