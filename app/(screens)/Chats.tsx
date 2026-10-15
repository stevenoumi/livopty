import * as React from "react";
import { FlatList } from "react-native";
import ChatItem from "~/components/custom/chat/ChatItem";
import { LargeHeader, Screen, SearchField } from "~/components/lv";
import chats from "~/lib/data/ChatData";

export default function Chats() {
  const [query, setQuery] = React.useState("");
  const shown = chats.userlist.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Screen>
      <LargeHeader title="Discussions" onAdd={() => {}}>
        <SearchField placeholder="Rechercher" value={query} onChangeText={setQuery} />
      </LargeHeader>
      <FlatList
        data={shown}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <ChatItem item={item} last={index === shown.length - 1} />}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
