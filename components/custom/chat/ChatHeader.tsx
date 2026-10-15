import { useNavigation } from "expo-router";
import { ChevronLeft, House, Phone, Video } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Txt } from "~/components/lv";
import { useChat } from "~/lib/context/ChatContext";
import { colors } from "~/lib/theme";

export default function ChatHeader() {
  const navigation = useNavigation();
  const { chatInfo } = useChat();

  if (!chatInfo) return null;

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.line }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <ChevronLeft size={28} color={colors.ink} strokeWidth={2.2} />
        </TouchableOpacity>
        {chatInfo.image ? (
          <Image source={{ uri: chatInfo.image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
        ) : (
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" }}>
            <House size={20} color={colors.white} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Txt size={17} weight="semibold">{chatInfo.name}</Txt>
          <Txt size={13} tone="mute">{chatInfo.isOnline ? "en ligne" : "hors ligne"}</Txt>
        </View>
        <Video size={25} color={colors.ink} strokeWidth={1.75} />
        <Phone size={23} color={colors.ink} strokeWidth={1.75} style={{ marginLeft: 10 }} />
      </View>
    </SafeAreaView>
  );
}
