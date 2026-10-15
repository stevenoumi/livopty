import { router } from "expo-router";
import { CheckCheck, House, School } from "lucide-react-native";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { Badge, Txt } from "~/components/lv";
import { useChat } from "~/lib/context/ChatContext";
import type { Conversation } from "~/lib/data/ChatData";
import { colors } from "~/lib/theme";

const groupIcons = { house: { Icon: House, bg: colors.brand }, school: { Icon: School, bg: colors.blue } };

/** One conversation row, WhatsApp-like: big avatar, inset separator, unread badge. */
export default function ChatItem({ item, last }: { item: Conversation; last?: boolean }) {
  const { setChatInfo } = useChat();
  const unread = item.unreadMessages > 0;
  const group = item.group ? groupIcons[item.group] : null;

  const onPress = () => {
    setChatInfo({ name: item.name, image: item.image, isOnline: item.isOnline });
    router.push("/chatList");
  };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flexDirection: "row", alignItems: "center", gap: 12, paddingLeft: 16 }, pressed && { backgroundColor: "#F2F2F7" }]}>
      <View>
        {group ? (
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: group.bg, alignItems: "center", justifyContent: "center" }}>
            <group.Icon size={26} color={colors.white} />
          </View>
        ) : (
          <Image source={{ uri: item.image }} style={{ width: 56, height: 56, borderRadius: 28 }} />
        )}
        {item.isOnline ? (
          <View style={{ position: "absolute", right: 0, bottom: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.ok, borderWidth: 2, borderColor: colors.white }} />
        ) : null}
      </View>
      <View style={{ flex: 1, paddingVertical: 11, paddingRight: 16, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.line }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Txt size={17} weight="semibold">{item.name}</Txt>
          <Txt size={14} tone={unread ? "brand" : "faint"}>{item.time}</Txt>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 5 }}>
            {item.lastSentRead !== undefined ? <CheckCheck size={17} color={item.lastSentRead ? colors.brand : colors.faint} strokeWidth={1.75} /> : null}
            <Txt size={15} tone="mute" numberOfLines={1} style={{ flex: 1 }}>{item.lastMessage}</Txt>
          </View>
          {unread ? <Badge value={item.unreadMessages} /> : null}
        </View>
      </View>
    </Pressable>
  );
}
