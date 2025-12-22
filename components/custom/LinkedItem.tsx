import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

interface LinkedItemProps {
  Icon: React.ElementType;
  title: string;
  link?: string;
}

export default function LinkedItem({ Icon, title, link }: LinkedItemProps) {
  const handlePress = () => {
    if (link) {
      router.push(link as never);
    }
  };
  return (
    <TouchableOpacity
      className="flex-row justify-between p-4 bg-white border-b border-gray-200"
      onPress={handlePress}
    >
      <View className="flex-row items-start justify-start gap-4">
        <Icon className="text-gray-500" size={20} strokeWidth={2} />
        <Text className="text-xl">{title}</Text>
      </View>
      <View className="flex-row items-center">
        <ChevronRight className="text-gray-500" size={20} strokeWidth={1.25} />
      </View>
    </TouchableOpacity>
  );
}
