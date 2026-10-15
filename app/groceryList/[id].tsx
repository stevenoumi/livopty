import { Check, CircleCheck, Ellipsis, History, Mic, Plus, ScanBarcode, Store, UserRoundPlus } from "lucide-react-native";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import { Avatar, AvatarStack, catColor, Chip, NavBar, ProgressBar, Screen, Txt } from "~/components/lv";
import { weeklyGroceries, type Aisle, type GroceryItem } from "~/lib/data/household";
import { colors, fonts } from "~/lib/theme";

const price = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";

function ItemRow({ item, onToggle, last }: { item: GroceryItem; onToggle: () => void; last: boolean }) {
  return (
    <Pressable onPress={onToggle} style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.line }}>
      <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1.75, borderColor: item.done ? colors.brand : "#C7C7CC", backgroundColor: item.done ? colors.brand : "transparent", alignItems: "center", justifyContent: "center" }}>
        {item.done ? <Check size={15} color={colors.white} strokeWidth={3} /> : null}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Txt size={16.5} tone={item.done ? "faint" : "ink"} style={item.done ? { textDecorationLine: "line-through" } : undefined} numberOfLines={1}>
          {item.name}
        </Txt>
        {item.note && !item.done ? <Txt size={13} tone={item.urgent ? "danger" : "faint"}>{item.note}</Txt> : null}
      </View>
      {item.qty && !item.done ? (
        <View style={{ backgroundColor: "#F3F3F5", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 }}>
          <Txt size={13} weight="medium" tone="mute">{item.qty}</Txt>
        </View>
      ) : null}
      {item.by && !item.done ? <Avatar id={item.by} size={22} /> : <View style={{ width: 22 }} />}
      <Txt size={14} tone="mute" style={{ width: 62, textAlign: "right" }}>{price(item.price)}</Txt>
    </Pressable>
  );
}

export default function WeeklyGroceries() {
  const [aisles, setAisles] = React.useState<Aisle[]>(weeklyGroceries.aisles);
  const [filter, setFilter] = React.useState<string>("all");
  const [draft, setDraft] = React.useState("");

  const all = aisles.flatMap((a) => a.items);
  const done = all.filter((i) => i.done).length;
  const estimate = all.reduce((s, i) => s + i.price, 0);

  const toggle = (aisleId: string, itemId: string) =>
    setAisles((prev) => prev.map((a) => (a.id !== aisleId ? a : { ...a, items: a.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) })));

  const add = (name: string, aisleId = "grocery") => {
    const clean = name.trim();
    if (!clean) return;
    setAisles((prev) => prev.map((a) => (a.id !== aisleId ? a : { ...a, items: [{ id: `n${Date.now()}`, name: clean, price: 0, by: "alex", done: false }, ...a.items] })));
    setDraft("");
  };

  const visible = filter === "all" ? aisles : aisles.filter((a) => a.id === filter);

  return (
    <Screen edges={["top", "bottom"]}>
      <NavBar back="Listes" right={<><UserRoundPlus size={23} color={colors.brand} /><Ellipsis size={23} color={colors.brand} /></>} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24, gap: 18 }} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 16 }}>
            <Txt size={28} weight="bold" tight>{weeklyGroceries.title}</Txt>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 }}>
              <AvatarStack ids={["alex", "camille", "jade"]} size={22} />
              <Txt size={14} tone="mute">Camille modifie</Txt>
              <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 4 }}>
                <CircleCheck size={14} color={colors.ok} />
                <Txt size={13} tone="ok">À jour</Txt>
              </View>
            </View>
            <View style={{ marginTop: 16, backgroundColor: colors.brandSoft, borderRadius: 16, padding: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                <View>
                  <Txt size={13} tone="mute">Dans le panier</Txt>
                  <Txt size={24} weight="bold" tight>
                    {done} <Txt size={24} weight="semibold" tone="faint">/ {all.length}</Txt>
                  </Txt>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Txt size={13} tone="mute">Estimé</Txt>
                  <Txt size={18} weight="bold">≈ {Math.round(estimate)} €</Txt>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <ProgressBar value={done / all.length} track={colors.white} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 }}>
                <Store size={15} color={colors.mute} />
                <Txt size={13} tone="mute">{weeklyGroceries.store}</Txt>
              </View>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
            <Chip label="Tous" count={all.length} active={filter === "all"} onPress={() => setFilter("all")} />
            {aisles.map((a) => (
              <Chip key={a.id} label={a.short} count={a.items.length} active={filter === a.id} onPress={() => setFilter(a.id)} />
            ))}
          </ScrollView>

          {visible.map((a) => {
            const Icon = a.icon;
            // Ticked items sink to the bottom of their aisle.
            const sorted = [...a.items].sort((x, y) => Number(x.done) - Number(y.done));
            return (
              <View key={a.id} style={{ paddingHorizontal: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: catColor(a.color), alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color={colors.white} strokeWidth={2.2} />
                  </View>
                  <Txt size={15} weight="semibold">{a.name}</Txt>
                  <Txt size={13} weight="medium" tone="faint" style={{ marginLeft: "auto" }}>{a.items.length}</Txt>
                </View>
                {sorted.map((i, idx) => (
                  <ItemRow key={i.id} item={i} last={idx === sorted.length - 1} onToggle={() => toggle(a.id, i.id)} />
                ))}
              </View>
            );
          })}

          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 26, height: 26, borderRadius: 8, backgroundColor: colors.grey, alignItems: "center", justifyContent: "center" }}>
                <History size={15} color={colors.white} strokeWidth={2.2} />
              </View>
              <Txt size={15} weight="semibold">Souvent achetés</Txt>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {weeklyGroceries.frequent.map((f) => (
                <Chip key={f} label={f} icon={Plus} onPress={() => add(f)} />
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 8, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: "#FBFBFD" }}>
          <View style={{ flex: 1, height: 40, borderRadius: 12, backgroundColor: "#F0F0F3", flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12 }}>
            <Plus size={20} color={colors.brand} />
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => add(draft)}
              placeholder="Ajouter un article"
              placeholderTextColor={colors.faint}
              returnKeyType="done"
              style={{ flex: 1, fontFamily: fonts.regular, fontSize: 16, color: colors.ink, paddingVertical: 0 }}
            />
          </View>
          <ScanBarcode size={24} color={colors.brand} />
          <Mic size={24} color={colors.brand} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
