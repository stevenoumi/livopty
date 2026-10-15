import * as React from "react";
import { FlatList, View } from "react-native";
import ChatTypingArea from "~/components/custom/chat/ChatTypingArea";
import TextChat from "~/components/custom/chat/TextChat";
import chats from "~/lib/data/ChatData";
import { colors } from "~/lib/theme";

export default function ChatList() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <FlatList
        data={chats.messages}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", paddingHorizontal: 10, paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => <TextChat message={item.message} isSent={item.isSent} time={item.time} />}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={{ borderTopWidth: 1, borderTopColor: colors.line }}>
        <ChatTypingArea />
      </View>
    </View>
  );
}
