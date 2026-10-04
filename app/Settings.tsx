import * as React from "react";
import { ScrollView, View } from "react-native";
import ProfileSettings from "~/components/custom/settings/ProfileSettings";
import SettingsGroup from "~/components/custom/settings/SettingsGroup";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/context/AuthContext";
import { LogOut } from "~/lib/icons/LogOut";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <ScrollView
      className="flex-1 bg-zinc-100"
      bounces={false}
      showsVerticalScrollIndicator={true}
    >
      <View className="p-4 gap-4 flex-col">
        <Text className="text-4xl font-bold text-black">Paramètres</Text>
        <ProfileSettings />
        <SettingsGroup
          items={[{ Icon: LogOut, title: "Déconnexion", onPress: signOut }]}
        />
      </View>
    </ScrollView>
  );
}
