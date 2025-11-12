import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import { CirclePlus } from "~/lib/icons/CirclePlus";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

export default function HeaderAvatar() {

  return (
    <SafeAreaView
      edges={["top", "right"]}
      className="p-2 justify-end items-end fex-1 "
    >
      <TouchableOpacity className="p-2 justify-center items-center">
        <Avatar alt="Test" className="h-16 w-16">
          <AvatarImage source={{ uri: "https://i.pravatar.cc/300" }} />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
