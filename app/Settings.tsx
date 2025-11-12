import * as React from "react";
import { ScrollView, View } from "react-native";
import PagesHeader from "~/components/custom/PagesHeader";
import ProfileSettings from "~/components/custom/ProfileSettings";
import SettingsGroup from "~/components/custom/SettingsGroup";
import { GeneralsettingsItems } from "~/lib/data/SettingsData";
import { InfomationSettingsItems } from "~/lib/data/SettingsData";

export default function Settings() {
  return (
    <>
      <PagesHeader title="Paramètres" placeholder="Rechercher des paramètres" />
      <ScrollView
        className="flex-1 bg-zinc-100"
        bounces={false}
        showsVerticalScrollIndicator={true}
      >
        <View className="p-4 gap-4 flex-col">
          <ProfileSettings />
          <SettingsGroup items={GeneralsettingsItems} />
          <SettingsGroup items={InfomationSettingsItems} />
        </View>
      </ScrollView>
    </>
  );
}
