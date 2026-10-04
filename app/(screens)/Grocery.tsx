import * as React from "react";
import { FlatList } from "react-native";
import GroceryFolders from "~/components/custom/grocery/GroceryFolders";
import PagesHeader from "~/components/custom/PagesHeader";
import { groceryFolders, groceryLists } from "~/lib/data/GroceryData";

export default function Grocery() {
  const foldersWithCounts = groceryFolders.map((folder) => {
    const listCount = groceryLists.filter(
      (list) => list.folderId === folder.id,
    ).length;
    return { ...folder, listCount };
  });
  return (
    <>
      <PagesHeader title="Listes" placeholder="Rechercher des listes" />
      <FlatList
        data={foldersWithCounts}
        keyExtractor={(item) => item.id}
        bounces={false}
        renderItem={({ item }) => <GroceryFolders {...item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 12,
          paddingBottom: 100,
          backgroundColor: "white",
          gap: 12,
          alignItems: "center",
        }}
      />
    </>
  );
}
