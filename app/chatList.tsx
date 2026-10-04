
import * as React from "react";
import { FlatList, View } from "react-native";
import ChatTypingArea from "~/components/custom/chat/ChatTypingArea";
import TextChat from "~/components/custom/chat/TextChat";
import messages from "~/lib/data/ChatData";


export default function ChatList() {
  return (
    <View className="flex-1 bg-zinc-50 w-full ">
      <FlatList
        data={messages.messages}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 8,
        }}
        showsVerticalScrollIndicator={true}
        bounces={false}
        renderItem={({ item }) => (
          <TextChat message={item.message} isSent={item.isSent} />
        )}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View className="w-full py-2 bg-zinc-50 border-t border-zinc-200">
        <ChatTypingArea />
      </View>
    </View>
  );
}
