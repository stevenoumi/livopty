import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { groceryFolders, groceryLists } from "~/lib/data/GroceryData";
import { Text } from "~/components/ui/text";
import PagesHeader from "~/components/custom/PagesHeader";

export default function FolderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const folder = groceryFolders.find((f) => f.id === id);
  const listsInFolder = groceryLists.filter((list) => list.folderId === id);

  if (!folder) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-lg">Dossier introuvable</Text>
      </View>
    );
  }

  return (
    <>
      <PagesHeader
        title={`${folder.icon} ${folder.name}`}
        placeholder="Rechercher une liste"
      />
      <ScrollView className="bg-white px-4 pt-4 pb-16">
        <View className="gap-4">
          {listsInFolder.map((list) => (
            <TouchableOpacity
              key={list.id}
              onPress={() => router.push(`/groceryList/${list.id}`)}
              className="bg-gray-100 border border-violet-100 rounded-2xl p-4 shadow-sm"
              activeOpacity={0.9}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1 gap-2">
                  <Text className="text-xl font-semibold text-black">
                    {list.title}
                  </Text>
                  <Text numberOfLines={1} className="text-base text-gray-500">
                    {list.content.split("\n")[0]}
                  </Text>
                </View>
                <Text className="text-sm text-gray-400 pl-2">
                  {new Date(list.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {listsInFolder.length === 0 && (
            <Text className="text-gray-400 text-center mt-8">
              Aucune liste dans ce dossier.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}
