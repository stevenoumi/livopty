import * as React from "react";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Text } from "../ui/text";
import { TouchableOpacity } from "react-native";
import { QrCode } from "~/lib/icons/QrCode";
import LinkedItem from "./LinkedItem";
import { UserRound } from "~/lib/icons/UserRound"; // ou un autre icône

export default function ProfileSettings() {
  return (
    <View className="rounded-xl shadow-md flex-col bg-zinc-100 overflow-hidden">
      <TouchableOpacity className="flex-row p-4 justify-start items-center gap-4 bg-white border-b border-gray-200 rounded-t-lg">
        <View className="relative">
          <Avatar alt="Test" className="h-16 w-16">
            <AvatarImage
              source={{ uri: "https://api.samplefaces.com/face?width=150&n=1" }}
            />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
        </View>
        <View className="flex-row justify-center flex-1 items-start gap-1">
          <View className="flex-col justify-start items-start w-[85%]">
            <Text className="text-2xl font-bold text-black">James Smith</Text>
            <Text className="text-lg text-gray-500">
              Born to succeed, not to fail
            </Text>
          </View>
          <View className="flex-row justify-center items-center bg-gray-200 rounded-full h-10 w-10">
            <TouchableOpacity>
              <QrCode className="text-gray-500" size={20} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <LinkedItem Icon={UserRound} title="Mon profil" />
    </View>
  );
}
