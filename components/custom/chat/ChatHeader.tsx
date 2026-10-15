import { useNavigation } from "expo-router";
import { ChevronLeft, House, Phone, Video } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { useChat } from "~/lib/context/ChatContext";

export default function ChatHeader() {
  const navigation = useNavigation();
  const { chatInfo } = useChat();

  if (!chatInfo) return null;

  return (
    <SafeAreaView
      edges={["top"]}
      className="border-b border-border bg-background"
    >
      <View className="flex-row items-center gap-3 px-4 py-2">
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
          <ChevronLeft size={28} color={COLORS.foreground} strokeWidth={2.2} />
        </Pressable>
        {chatInfo.image ? (
          <Image
            source={{ uri: chatInfo.image }}
            className="h-10 w-10 rounded-full"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary">
            <House size={20} color={COLORS.primaryForeground} />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-[17px] font-semibold">{chatInfo.name}</Text>
          <Text variant="caption" tone="muted" className="text-[13px]">
            {chatInfo.isOnline ? "en ligne" : "hors ligne"}
          </Text>
        </View>
        <Video size={25} color={COLORS.foreground} strokeWidth={1.75} />
        <Phone
          size={23}
          color={COLORS.foreground}
          strokeWidth={1.75}
          style={{ marginLeft: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}
