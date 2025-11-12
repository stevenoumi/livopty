import * as React from "react";
import { View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Text } from "../ui/text";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { CheckCheck } from "~/lib/icons/CheckCheck";
import { useChat } from "~/lib/context/ChatContext";

export default function ChatItem(props: {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  image: string;
  isOnline: boolean;
  unreadMessages: number;
}) {
  const { setChatInfo } = useChat();

  const onPress = () => {
    setChatInfo({
      name: props.name,
      image: props.image,
      isOnline: props.isOnline,
    });

    router.push("/chatList"); // ou autre page, selon ton routing
  };

  return (
    <TouchableOpacity
      className="flex-row px-4 justify-start items-center gap-4 bg-white w-full"
      onPress={onPress}
    >
      <View className="relative">
        <Avatar alt="Test" className="h-16 w-16">
          <AvatarImage source={{ uri: props.image }} />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>

        {props.isOnline && (
          <View className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white" />
        )}
      </View>
      <View className="flex-col justify-center items-start flex-1 gap-1 border-b border-gray-200 py-2">
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-xl font-bold text-black">{props.name}</Text>
          <Text className="text-base text-gray-500">{props.time}</Text>
        </View>
        <View className="flex-row justify-between items-center w-full">
          <View className="flex-row justify-center items-center gap-2">
            <CheckCheck
              size={18}
              className="text-gray-500 bold"
              strokeWidth={1.25}
            />
            <Text className="text-lg text-gray-500">
              {props.lastMessage.length > 40
                ? props.lastMessage.slice(0, 28) + "..."
                : props.lastMessage}
            </Text>
          </View>
          {props.unreadMessages > 0 && (
            <View className="mt-1 bg-violet-500 h-6 w-6 rounded-full justify-center items-center border-2 border-white">
              <Text className="text-white text-xs font-bold">
                {props.unreadMessages}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
