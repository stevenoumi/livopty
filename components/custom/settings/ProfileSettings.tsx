import * as React from "react";
import { View } from "react-native";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Text } from "../../ui/text";
import { useAuth } from "~/lib/context/AuthContext";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function ProfileSettings() {
  const { user } = useAuth();
  const name = user?.user_metadata?.name ?? "";
  const email = user?.email ?? "";

  return (
    <View className="rounded-xl shadow-md flex-row p-4 items-center gap-4 bg-white">
      <Avatar alt={name || email} className="h-16 w-16">
        <AvatarFallback>
          <Text>{getInitials(name || email)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex-1">
        {name ? (
          <Text className="text-2xl font-bold text-black">{name}</Text>
        ) : null}
        <Text className="text-lg text-gray-500">{email}</Text>
      </View>
    </View>
  );
}
