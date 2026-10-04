import { useNavigation } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { Video } from "~/lib/icons/Video";
import { Phone } from "~/lib/icons/Phone";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { useChat } from "~/lib/context/ChatContext";

export default function ChatHeader() {
  const navigation = useNavigation();
  const { chatInfo } = useChat();

  if (!chatInfo) return null; // Ou un fallback

  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="flex-row px-4 py-2 items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft className="text-foreground" size={30} strokeWidth={2} />
        </TouchableOpacity>

        <Avatar alt={chatInfo.name} className="h-12 w-12">
          <AvatarImage source={{ uri: chatInfo.image }} />
          <AvatarFallback>
            <Text>{chatInfo.name.slice(0, 2).toUpperCase()}</Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-col justify-center">
          <Text className="text-xl font-bold text-black">{chatInfo.name}</Text>
          <Text className="text-base text-gray-500">
            {chatInfo.isOnline ? "online" : "offline"}
          </Text>
        </View>

        <View className="flex-row gap-6 ml-auto">
          <Video className="text-foreground" size={25} strokeWidth={1.75} />
          <Phone className="text-foreground" size={25} strokeWidth={1.75} />
        </View>
      </View>
    </SafeAreaView>
  );
}
