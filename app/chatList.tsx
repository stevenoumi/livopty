import * as React from "react";
import { FlatList, View } from "react-native";
import ChatTypingArea from "~/components/custom/chat/ChatTypingArea";
import TextChat from "~/components/custom/chat/TextChat";
import chats from "~/lib/data/ChatData";

export default function ChatList() {
  return (
    <View className="w-full flex-1 bg-background">
      <FlatList
        data={chats.messages}
        contentContainerClassName="grow justify-end px-2.5 py-2"
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => (
          <TextChat
            message={item.message}
            isSent={item.isSent}
            time={item.time}
          />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View className="w-full border-t border-border py-2">
        <ChatTypingArea />
      </View>
    </View>
  );
}
