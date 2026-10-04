import { ScrollView, TouchableOpacity, Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";

export default function StoriesFriendList() {
  const randomImages = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    uri: `https://picsum.photos/seed/${i + 3}/300/300`,
    userprofile: `https://api.samplefaces.com/face?width=150&n=12`,
  }));
  return (
    <>
      <View className="flex-row items-center justify-between px-4 w-full">
        <Text className="text-2xl font-bold text-black">Stories</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full mt-2 p-1"
        contentContainerStyle={{ gap: 4 }}
      >
        {randomImages.map((photo) => (
          <View key={photo.id} className="flex-col items-center space-y-4">
            <TouchableOpacity className="rounded-3xl overflow-hidden  mb-2">
              <Image
                source={{ uri: photo.uri }}
                className="w-36 h-48 rounded-3xl"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 p-2 rounded-b-3xl flex-row items-center justify-between overflow-hidden">
                <View className="absolute inset-0">
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.25)",
                    }}
                  />
                </View>
                <Text className="text-lg font-bold text-white z-10">
                  {`User ${photo.id}`}
                </Text>
              </View>
              <Avatar alt="Test" className="h-8 w-8 absolute bottom-7 right-2">
                <AvatarImage source={{ uri: photo.userprofile }} />
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
