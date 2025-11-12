import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const StoriesSelectors = () => {
  return (
    <>
      <View className="flex-row items-center justify-between px-2 py-4 w-full">
        <Text className="text-3xl font-bold text-black">Decouvertes </Text>
      </View>
      <TouchableOpacity className="rounded-xl overflow-hidden">
        <Image
          source={{ uri: "https://picsum.photos/seed/998/300/300" }}
          style={{
            aspectRatio: 1,
          }}
          className="w-full rounded-2xl py-1"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </>
  );
};

export default StoriesSelectors;
