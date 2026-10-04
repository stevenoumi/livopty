import React, { useState } from "react";
import { View, Text, Animated, PanResponder, Dimensions } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { navigate } from "expo-router/build/global-state/routing";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 48; 
const BUTTON_SIZE = 48; 
const SLIDE_RANGE = SLIDER_WIDTH - BUTTON_SIZE - 16; 

export default function SlideToStart() {
  const [translateX] = useState(() => new Animated.Value(0));
  const [confirmed, setConfirmed] = useState(false);

  const [panResponder] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < SLIDE_RANGE) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SLIDE_RANGE * 0.7) {
          Animated.timing(translateX, {
            toValue: SLIDE_RANGE,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setConfirmed(true);
            // router.push("/loginPage");
            navigate("/loginPage");
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  );

  return (
    <View className="absolute bottom-0 px-3 py-3 w-full flex-row items-center rounded-full bg-zinc-300/70">
      <Animated.View
        className="p-3 rounded-full flex items-center justify-center shadow-lg bg-purple-700"
        style={{
          transform: [{ translateX }],
          shadowOpacity: confirmed ? 0.2 : 0.4,
        }}
        {...panResponder.panHandlers}
      >
        <ArrowRight size={28} strokeWidth={2} color="white" />
      </Animated.View>
      {!confirmed && (
        <Text className="text-right text-purple-700 font-bold text-lg tracking-wider ml-5">
          Glisser pour commencer
        </Text>
      )}
    </View>
  );
}
