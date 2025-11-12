import * as React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import GroceryFolders from "~/components/custom/GroceryFolders";
import PagesHeader from "~/components/custom/PagesHeader";
import { groceryFolders, groceryLists } from "~/lib/data/GroceryData";
import { router } from "expo-router";

export default function Grocery() {
  const foldersWithCounts = groceryFolders.map((folder) => {
    const listCount = groceryLists.filter(
      (list) => list.folderId === folder.id
    ).length;
    return { ...folder, listCount };
  });

  const quickLists = groceryLists.filter((list) => !list.folderId);

  return (
    <>
      <PagesHeader title="Listes" placeholder="Rechercher des listes" />
      <FlatList
        data={foldersWithCounts}
        keyExtractor={(item) => item.id}
        bounces={false}
        renderItem={({ item }) => <GroceryFolders {...item} />}
        // ListHeaderComponent={
        //   <View className="w-full px-4 mt-4">
        //     <Text className="text-bas font-semibold text-gray-500 mb-2">
        //       Listes recentes
        //     </Text>
        //     {quickLists.map((list) => (
        //       <TouchableOpacity
        //         key={list.id}
        //         onPress={() => router.push(`/groceryList/${list.id}`)}
        //         className="bg-gray-100 rounded-xl p-4 mb-2 w-full shadow-sm shadow-gray-200 flex-row items-center justify-between"
        //       >
        //         <Text className="text-base font-medium text-black">
        //           {list.title}
        //         </Text>
        //         <Text className="text-sm text-gray-500">
        //           {list.content.split("\n").length - 1} éléments
        //         </Text>
        //       </TouchableOpacity>
        //     ))}
        //     <Text className="text-bas font-semibold text-gray-500 mt-4 ">
        //       Mes dossiers
        //     </Text>
        //   </View>
        // }
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
