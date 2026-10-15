import { router } from "expo-router";
import { Users } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  AvatarStack,
  catColor,
  LargeHeader,
  ProgressBar,
  Row,
  Screen,
  SearchField,
  SectionHeader,
  Tile,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { COLORS, ROUTES } from "~/lib/constants";
import { folders, pinnedLists } from "~/lib/data/household";

export default function Grocery() {
  const [query, setQuery] = React.useState("");
  const shown = folders.filter((f) =>
    f.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <Screen>
      <LargeHeader title="Listes" onAdd={() => {}}>
        <SearchField
          placeholder="Rechercher des listes"
          value={query}
          onChangeText={setQuery}
        />
      </LargeHeader>
      <ScrollView
        contentContainerClassName="pb-6 pt-[18px]"
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Épinglées" action="Modifier" />
        <View className="mt-1.5 flex-row gap-2.5 px-4">
          {pinnedLists.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => router.push(ROUTES.GROCERY_LIST(p.id))}
              accessibilityRole="button"
              className="flex-1 gap-2.5 rounded-2xl bg-primary-soft p-3.5"
            >
              <View className="flex-row items-center justify-between">
                <Tile icon={p.icon} color={p.color} size={28} radius={8} />
                <AvatarStack ids={p.with} size={22} />
              </View>
              <View>
                <Text className="font-semibold" numberOfLines={2}>
                  {p.title}
                </Text>
                <Text variant="caption" tone="muted" className="mt-0.5">
                  {p.detail}
                </Text>
              </View>
              <ProgressBar
                value={p.progress}
                color={catColor(p.color)}
                onCard
              />
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Dossiers" action="Trier" className="mt-6" />
        {shown.map((f, i) => (
          <Row
            key={f.id}
            leading={
              <Tile icon={f.icon} color={f.color} size={40} radius={10} />
            }
            title={f.name}
            last={i === shown.length - 1}
            chevron
            onPress={() => router.push(ROUTES.GROCERY_FOLDER(f.id))}
          >
            <View className="mt-px flex-row items-center gap-1">
              {f.shared ? (
                <Users size={13} color={COLORS.mutedForeground} />
              ) : null}
              <Text variant="caption" tone="muted">
                {f.count} {f.count > 1 ? "listes" : "liste"}
                {f.shared ? " · partagé" : ""}
              </Text>
            </View>
          </Row>
        ))}
      </ScrollView>
    </Screen>
  );
}
