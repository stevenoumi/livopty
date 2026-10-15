import {
  Check,
  CircleCheck,
  Ellipsis,
  History,
  Mic,
  Plus,
  ScanBarcode,
  Store,
  UserRoundPlus,
} from "lucide-react-native";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import {
  AvatarStack,
  catColor,
  Chip,
  MemberAvatar,
  NavBar,
  ProgressBar,
  Screen,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { CATEGORY_COLORS, COLORS } from "~/lib/constants";
import {
  ME,
  weeklyGroceries,
  type Aisle,
  type GroceryItem,
} from "~/lib/data/household";
import { cn } from "~/lib/utils";

const price = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";

function ItemRow({
  item,
  onToggle,
  last,
}: {
  item: GroceryItem;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: item.done }}
      accessibilityLabel={item.name}
      className={cn(
        "flex-row items-center gap-2.5 py-[9px]",
        !last && "border-b border-border",
      )}
    >
      <View
        className={cn(
          "h-6 w-6 items-center justify-center rounded-full border-[1.75px]",
          item.done ? "border-primary bg-primary" : "border-input",
        )}
      >
        {item.done ? (
          <Check size={15} color={COLORS.primaryForeground} strokeWidth={3} />
        ) : null}
      </View>
      <View className="min-w-0 flex-1">
        <Text
          numberOfLines={1}
          tone={item.done ? "muted" : "default"}
          className={cn("text-[16.5px]", item.done && "line-through")}
        >
          {item.name}
        </Text>
        {item.note && !item.done ? (
          <Text
            variant="caption"
            tone={item.urgent ? "destructive" : "muted"}
            className="text-[13px]"
          >
            {item.note}
          </Text>
        ) : null}
      </View>
      {item.qty && !item.done ? (
        <View className="rounded-lg bg-secondary px-[7px] py-0.5">
          <Text variant="label" tone="muted">
            {item.qty}
          </Text>
        </View>
      ) : null}
      {item.by && !item.done ? (
        <MemberAvatar id={item.by} size={22} />
      ) : (
        <View className="w-[22px]" />
      )}
      <Text tone="muted" className="w-[62px] text-right text-sm">
        {price(item.price)}
      </Text>
    </Pressable>
  );
}

function AisleTitle({
  icon: Icon,
  color,
  title,
  count,
}: {
  icon: React.ComponentType<{
    size: number;
    color: string;
    strokeWidth: number;
  }>;
  color: string;
  title: string;
  count?: number;
}) {
  return (
    <View className="mb-1 flex-row items-center gap-2.5">
      <View
        className="h-[26px] w-[26px] items-center justify-center rounded-lg"
        style={{ backgroundColor: color }}
      >
        <Icon size={15} color={COLORS.primaryForeground} strokeWidth={2.2} />
      </View>
      <Text className="text-[15px] font-semibold">{title}</Text>
      {count !== undefined ? (
        <Text variant="label" tone="muted" className="ml-auto">
          {count}
        </Text>
      ) : null}
    </View>
  );
}

export default function WeeklyGroceries() {
  const [aisles, setAisles] = React.useState<Aisle[]>(weeklyGroceries.aisles);
  const [filter, setFilter] = React.useState("all");
  const [draft, setDraft] = React.useState("");

  const all = aisles.flatMap((a) => a.items);
  const done = all.filter((i) => i.done).length;
  const estimate = all.reduce((s, i) => s + i.price, 0);
  const visible =
    filter === "all" ? aisles : aisles.filter((a) => a.id === filter);

  const toggle = (aisleId: string, itemId: string) =>
    setAisles((prev) =>
      prev.map((a) =>
        a.id !== aisleId
          ? a
          : {
              ...a,
              items: a.items.map((i) =>
                i.id === itemId ? { ...i, done: !i.done } : i,
              ),
            },
      ),
    );

  // New items land in the grocery aisle until the list sorts them itself.
  const add = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setAisles((prev) =>
      prev.map((a) =>
        a.id !== "grocery"
          ? a
          : {
              ...a,
              items: [
                {
                  id: `new-${Date.now()}`,
                  name: clean,
                  price: 0,
                  by: ME,
                  done: false,
                },
                ...a.items,
              ],
            },
      ),
    );
    setDraft("");
  };

  return (
    <Screen edges={["top", "bottom"]}>
      <NavBar
        back="Listes"
        right={
          <>
            <UserRoundPlus size={23} color={COLORS.primary} />
            <Ellipsis size={23} color={COLORS.primary} />
          </>
        }
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="gap-[18px] pb-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4">
            <Text variant="display" className="text-[28px] leading-9">
              {weeklyGroceries.title}
            </Text>
            <View className="mt-1.5 flex-row items-center gap-2">
              <AvatarStack ids={["alex", "camille", "jade"]} size={22} />
              <Text tone="muted" className="text-sm">
                Camille modifie
              </Text>
              <View className="ml-auto flex-row items-center gap-1">
                <CircleCheck size={14} color={COLORS.success} />
                <Text variant="caption" tone="success" className="text-[13px]">
                  À jour
                </Text>
              </View>
            </View>
            <View className="mt-4 rounded-2xl bg-primary-soft p-4">
              <View className="flex-row items-end justify-between">
                <View>
                  <Text tone="muted" className="text-[13px]">
                    Dans le panier
                  </Text>
                  <Text variant="title">
                    {done}{" "}
                    <Text
                      variant="title"
                      tone="muted"
                      className="font-semibold"
                    >
                      / {all.length}
                    </Text>
                  </Text>
                </View>
                <View className="items-end">
                  <Text tone="muted" className="text-[13px]">
                    Estimé
                  </Text>
                  <Text variant="heading">≈ {Math.round(estimate)} €</Text>
                </View>
              </View>
              <View className="mt-2.5">
                <ProgressBar value={done / all.length} onCard />
              </View>
              <View className="mt-2.5 flex-row items-center gap-1.5">
                <Store size={15} color={COLORS.mutedForeground} />
                <Text tone="muted" className="text-[13px]">
                  {weeklyGroceries.store}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2 px-4"
          >
            <Chip
              label="Tous"
              count={all.length}
              active={filter === "all"}
              onPress={() => setFilter("all")}
            />
            {aisles.map((a) => (
              <Chip
                key={a.id}
                label={a.short}
                count={a.items.length}
                active={filter === a.id}
                onPress={() => setFilter(a.id)}
              />
            ))}
          </ScrollView>

          {visible.map((a) => {
            // Ticked items sink to the bottom of their aisle.
            const sorted = [...a.items].sort(
              (x, y) => Number(x.done) - Number(y.done),
            );
            return (
              <View key={a.id} className="px-4">
                <AisleTitle
                  icon={a.icon}
                  color={catColor(a.color)}
                  title={a.name}
                  count={a.items.length}
                />
                {sorted.map((i, idx) => (
                  <ItemRow
                    key={i.id}
                    item={i}
                    last={idx === sorted.length - 1}
                    onToggle={() => toggle(a.id, i.id)}
                  />
                ))}
              </View>
            );
          })}

          <View className="px-4">
            <AisleTitle
              icon={History}
              color={CATEGORY_COLORS.grey}
              title="Souvent achetés"
            />
            <View className="mt-2.5 flex-row flex-wrap gap-2">
              {weeklyGroceries.frequent.map((f) => (
                <Chip key={f} label={f} icon={Plus} onPress={() => add(f)} />
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center gap-3 border-t border-border px-4 py-2">
          <View className="h-10 flex-1 flex-row items-center gap-2 rounded-xl bg-secondary px-3">
            <Plus size={20} color={COLORS.primary} />
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => add(draft)}
              placeholder="Ajouter un article"
              placeholderTextColor={COLORS.mutedForeground}
              returnKeyType="done"
              accessibilityLabel="Ajouter un article"
              className="flex-1 py-0 font-sans text-base text-foreground"
            />
          </View>
          <ScanBarcode size={24} color={COLORS.primary} />
          <Mic size={24} color={COLORS.primary} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
