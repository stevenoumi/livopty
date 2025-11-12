import * as React from "react";
import { FlatList, View } from "react-native";
import ChatItem from "~/components/custom/ChatItem";
import PagesHeader from "~/components/custom/PagesHeader";
import userlist from "~/lib/data/ChatData";

export default function Chats() {

  return (
    <>
      <PagesHeader title="Discussions" placeholder="Rechercher des discussions" />
      <FlatList
        data={userlist.userlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            {...item}
            lastMessage={
              item.messageList && item.messageList.length > 0
                ? item.messageList[item.messageList.length - 1].message
                : ""
            }
          />
        )}
        showsVerticalScrollIndicator={true}
        bounces={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          backgroundColor: "white",
          paddingVertical: 8,
        }}
      />
    </>
  );
}
