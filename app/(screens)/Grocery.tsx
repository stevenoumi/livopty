import { router } from "expo-router";
import { Users } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { AvatarStack, catColor, LargeHeader, ProgressBar, Row, Screen, SearchField, SectionHeader, Tile, Txt } from "~/components/lv";
import { folders, pinnedLists } from "~/lib/data/household";
import { colors } from "~/lib/theme";

const pinTint: Record<string, string> = { brand: colors.brandSoft, blue: "#EAF3FD" };

export default function Grocery() {
  const [query, setQuery] = React.useState("");
  const shown = folders.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Screen>
      <LargeHeader title="Listes" onAdd={() => {}}>
        <SearchField placeholder="Rechercher des listes" value={query} onChangeText={setQuery} />
      </LargeHeader>
      <ScrollView contentContainerStyle={{ paddingTop: 18, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Épinglées" action="Modifier" />
        <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 16, marginTop: 6 }}>
          {pinnedLists.map((p) => (
            <Pressable key={p.id} onPress={() => router.push(`/groceryList/${p.id}`)} style={{ flex: 1, borderRadius: 16, padding: 14, gap: 10, backgroundColor: pinTint[p.color] ?? colors.surface }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Tile icon={p.icon} color={p.color} size={28} radius={8} />
                <AvatarStack ids={p.with} size={22} />
              </View>
              <View>
                <Txt size={15.5} weight="semibold" numberOfLines={2}>{p.title}</Txt>
                <Txt size={12.5} tone="mute" style={{ marginTop: 2 }}>{p.detail}</Txt>
              </View>
              <ProgressBar value={p.progress} color={catColor(p.color)} track={colors.white} />
            </Pressable>
          ))}
        </View>

        <SectionHeader title="Dossiers" action="Trier" style={{ marginTop: 24 }} />
        {shown.map((f, i) => (
          <Row
            key={f.id}
            leading={<Tile icon={f.icon} color={f.color} size={40} radius={10} />}
            title={f.name}
            last={i === shown.length - 1}
            chevron
            onPress={() => router.push(`/groceryList/folder/${f.id}`)}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 1 }}>
              {f.shared ? <Users size={13} color={colors.faint} /> : null}
              <Txt size={13} tone="faint">
                {f.count} {f.count > 1 ? "listes" : "liste"}
                {f.shared ? " · partagé" : ""}
              </Txt>
            </View>
          </Row>
        ))}
      </ScrollView>
    </Screen>
  );
}

