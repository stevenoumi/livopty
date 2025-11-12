import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../ui/text";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

type GroceryFolderProps = {
  id: string;
  name: string;
  icon?: string;
  listCount: number;
};

export default function GroceryFolders({ id, name, icon = "📁", listCount }: GroceryFolderProps) {
  const onPress = () => {
    router.push(`/groceryList/folder/${id}`);
  };

  return (
    <TouchableOpacity
      className="flex-row px-4 justify-start items-center gap-6 bg-white w-[94%] rounded-2xl shadow-sm shadow-gray-200"
      onPress={onPress}
    >
      <View className="bg-violet-100 rounded-3xl p-4">
        <Text className="text-xl">{icon}</Text>
      </View>
      <View className="flex-1 py-4">
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-xl font-bold text-black">{name}</Text>
          <ChevronRight color="#6b7280" size={24} strokeWidth={1.75} />
        </View>
        <Text className="text-base text-gray-500">{listCount} listes</Text>
      </View>
    </TouchableOpacity>
  );
}
