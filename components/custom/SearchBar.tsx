import * as React from "react";
import { View } from "react-native";
import { Search } from "~/lib/icons/Search";
import { Input } from "~/components/ui/input";

type SearchBarProps = {
  placeholder?: string;
};

export default function SearchBar({ placeholder = "Search" }: SearchBarProps) {
  return (
    <View className="w-full bg-violet-50 flex-row items-center px-4 py-0 rounded-2xl shadow-sm shadow-gray-200">
      <Search className="text-gray-700" size={25} strokeWidth={2} />
      <Input
        className="flex-1 bg-violet-50 text-base text-gray-800 rounded-full px-4 py-2"
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
      />
    </View>
  );
}
