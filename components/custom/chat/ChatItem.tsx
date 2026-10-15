import { router } from "expo-router";
import { CheckCheck, House, School } from "lucide-react-native";
import * as React from "react";
import { Image, Pressable, View } from "react-native";
import { Badge } from "~/components/screen";
import { Text } from "~/components/ui/text";
import { CATEGORY_COLORS, COLORS, ROUTES } from "~/lib/constants";
import { useChat } from "~/lib/context/ChatContext";
import type { Conversation } from "~/lib/data/ChatData";
import { cn } from "~/lib/utils";

const groupIcons = {
  house: { Icon: House, bg: CATEGORY_COLORS.brand },
  school: { Icon: School, bg: CATEGORY_COLORS.blue },
};

/** One conversation: big avatar, inset separator, unread badge. */
export default function ChatItem({
  item,
  last,
}: {
  item: Conversation;
  last?: boolean;
}) {
  const { setChatInfo } = useChat();
  const unread = item.unreadMessages > 0;
  const group = item.group ? groupIcons[item.group] : null;

  const onPress = () => {
    setChatInfo({
      name: item.name,
      image: item.image,
      isOnline: item.isOnline,
    });
    router.push(ROUTES.CHAT_LIST);
  };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className="flex-row items-center gap-3 pl-4 active:bg-muted"
    >
      <View>
        {group ? (
          <View
            className="h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: group.bg }}
          >
            <group.Icon size={26} color={COLORS.primaryForeground} />
          </View>
        ) : (
          <Image
            source={{ uri: item.image }}
            className="h-14 w-14 rounded-full"
            accessibilityIgnoresInvertColors
          />
        )}
        {item.isOnline ? (
          <View className="absolute bottom-0.5 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-success" />
        ) : null}
      </View>
      <View
        className={cn(
          "flex-1 py-[11px] pr-4",
          !last && "border-b border-border",
        )}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-[17px] font-semibold">{item.name}</Text>
          <Text tone={unread ? "primary" : "muted"} className="text-sm">
            {item.time}
          </Text>
        </View>
        <View className="mt-0.5 flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center gap-[5px]">
            {item.lastSentRead !== undefined ? (
              <CheckCheck
                size={17}
                color={item.lastSentRead ? COLORS.primary : COLORS.faint}
                strokeWidth={1.75}
              />
            ) : null}
            <Text tone="muted" numberOfLines={1} className="flex-1 text-[15px]">
              {item.lastMessage}
            </Text>
          </View>
          {unread ? <Badge value={item.unreadMessages} /> : null}
        </View>
      </View>
    </Pressable>
  );
}
