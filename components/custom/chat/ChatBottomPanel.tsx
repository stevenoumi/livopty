import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Camera, Images, CircleUser, File } from "lucide-react-native";
import { Text } from "~/components/ui/text";
// import * as MediaLibrary from "expo-media-library";

const ChatBottomPanel = () => {
  const randomImages = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    uri: `https://picsum.photos/seed/${i}/300/300`,
  }));

  const BottomList = [
    {
      id: 1,
      icon: <Images size={40} strokeWidth={2} color="#34B7F1" />, // Galerie
      title: "Galerie",
    },
    {
      id: 2,
      icon: <Camera size={40} strokeWidth={2} color="#FBC02D" />, // Appareil photo
      title: "Caméra",
    },
    {
      id: 3,
      icon: <CircleUser size={40} strokeWidth={2} color="#25D366" />, // Contact
      title: "Contact",
    },
    {
      id: 4,
      icon: <File size={40} strokeWidth={2} color="#7E57C2" />, // Document
      title: "Document",
    },
  ];

  return (
    <View className="mt-2 shadow-lg items-center w-full justify-center p-4 rounded-lg">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full mt-2"
        contentContainerStyle={{ gap: 12 }}
      >
        {randomImages.map((photo) => (
          <TouchableOpacity
            key={photo.id}
            className="rounded-lg overflow-hidden border border-zinc-200 mr-2"
          >
            <Image
              source={{ uri: photo.uri }}
              className="h-40 rounded-lg"
              style={{ aspectRatio: 1 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="flex-row flex-wrap w-full justify-start items-start mt-4">
        {BottomList.map((item) => (
          <View key={item.id} className="w-1/4 items-center mb-4">
            <TouchableOpacity className="bg-white rounded-full items-center p-4 mb-2bg-zinc-100 mb-2 shadow-md active:opacity-80 shadow-purple-200 border border-zinc-100">
              {item.icon}
            </TouchableOpacity>
            <Text className="text-xs text-center text-zinc-700 font-medium">
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChatBottomPanel;
