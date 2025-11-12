import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import SearchBar from "./SearchBar";

interface inferredProps {
  title?: string;
  placeholder?: string;
}

export default function PagesHeader(props: inferredProps) {
  return (
    <View className="flex-col justify-center  gap-6 bg-white w-full px-4 py-4 ">
      <Text className="text-4xl font-bold text-black">{props.title}</Text>
      <SearchBar placeholder={props.placeholder || "Search"} />
    </View>
  );
}
