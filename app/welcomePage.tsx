import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SlideToStart from "~/components/custom/SlideToStart";

const WelcomePage = () => {
  const insets = useSafeAreaInsets();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageOpacity = useRef(new Animated.Value(10)).current;
  const textOpacity = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    const preloadImage = async () => {
      const imageUri = Image.resolveAssetSource(
        require("~/assets/images/cover.jpg")
      ).uri;

      try {
        await Image.prefetch(imageUri);
      } catch (err) {
        console.warn("Erreur de préchargement :", err);
      } finally {
        setImageLoaded(true);
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }).start();
        });
      }
    };

    preloadImage();
  }, []);

  return (
    <View className="flex-1 w-full h-full">
      {/* Background image fade-in */}
      <Animated.Image
        source={require("~/assets/images/cover.jpg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: imageOpacity,
        }}
        resizeMode="cover"
      />

      {/* Overlay gradient */}
      <LinearGradient
        colors={["transparent", "rgba(128,0,128,0.85)"]}
        className="flex-1 justify-center items-center px-6"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView
          style={{ marginBottom: insets.bottom }}
          className="flex-1 w-full items-center justify-center"
        >
          {/* Text container fade-in */}
          <Animated.View
            style={{ opacity: textOpacity }}
            className="w-full mt-auto mb-16 gap-4 px-2"
          >
            <Text className="text-white text-3xl font-semibold text-left leading-tight">
              Simplifiez votre vie à deux
            </Text>

            <Text className="text-gray-200 text-lg text-justify leading-relaxed">
              Discutez, planifiez et partagez. Tout ce qu’il vous faut pour
              mieux vivre ensemble.
            </Text>
          </Animated.View>

          <SlideToStart />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default WelcomePage;
