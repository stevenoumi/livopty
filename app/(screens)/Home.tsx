import { router } from "expo-router";
import { Activity, Bell, CalendarDays, ChevronRight, House, LockKeyhole, MessageCircle, ShoppingCart, Wallet, type LucideIcon } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Avatar, Badge, Card, catColor, Ring, Screen, Txt } from "~/components/lv";
import { activity, budgetMonth, events, ME, members, TODAY, weeklyGroceries } from "~/lib/data/household";
import { colors } from "~/lib/theme";

const WEEK = [
  { d: "LUN", n: 12 },
  { d: "MAR", n: 13 },
  { d: "MER", n: 14 },
  { d: "JEU", n: 15 },
  { d: "VEN", n: 16 },
  { d: "SAM", n: 17 },
  { d: "DIM", n: 18 },
];

function WidgetTitle({ icon: Icon, label, color, action, onAction }: { icon: LucideIcon; label: string; color: string; action?: string; onAction?: () => void }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Icon size={17} color={color} strokeWidth={2.2} />
      <Txt size={15} weight="semibold" color={color}>{label}</Txt>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8} style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}>
          <Txt size={13.5} weight="medium" tone="brand">{action}</Txt>
          <ChevronRight size={15} color={colors.brand} />
        </Pressable>
      ) : null}
    </View>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: "#E8E8EC" }} />;
}

export default function Home() {
  const today = events.filter((e) => e.date === TODAY);
  const daysWithEvents = new Map(events.map((e) => [Number(e.date.slice(8)), catColor(e.color)]));
  const items = weeklyGroceries.aisles.flatMap((a) => a.items);
  const done = items.filter((i) => i.done).length;
  const left = budgetMonth.budget - budgetMonth.spent;

  return (
    <Screen>
      <View style={{ paddingHorizontal: 16, paddingTop: 4, flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ flex: 1 }}>
          <Txt size={13} weight="semibold" tone="faint" style={{ textTransform: "uppercase" }}>Mercredi 14 octobre</Txt>
          <Txt size={32} weight="bold" tight>Bonjour Alex</Txt>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 6 }}>
          <Pressable onPress={() => router.push("/vault")} hitSlop={8} accessibilityLabel="Coffre-fort">
            <LockKeyhole size={23} color={colors.ink} />
          </Pressable>
          <View>
            <Bell size={23} color={colors.ink} />
            <View style={{ position: "absolute", top: 0, right: 1, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger, borderWidth: 1.5, borderColor: colors.white }} />
          </View>
          <Pressable onPress={() => router.push("/household")} accessibilityLabel="Foyer">
            <Avatar id={ME} size={34} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} showsVerticalScrollIndicator={false}>
        {/* Today */}
        <Card>
          <WidgetTitle icon={CalendarDays} label="Aujourd’hui" color={colors.brand} action="Agenda" onAction={() => router.navigate("/(screens)/Agenda")} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            {WEEK.map((w) => {
              const on = w.n === 14;
              const dot = daysWithEvents.get(w.n);
              return (
                <View key={w.n} style={{ width: 38, alignItems: "center", gap: 4 }}>
                  <Txt size={11} weight="semibold" tone="faint">{w.d}</Txt>
                  <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: on ? colors.brand : "transparent" }}>
                    <Txt size={16} weight={on ? "semibold" : "medium"} tone={on ? "white" : "ink"}>{w.n}</Txt>
                  </View>
                  <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: dot ?? "transparent" }} />
                </View>
              );
            })}
          </View>
          <View style={{ marginTop: 10 }}>
            {today.map((e) => (
              <View key={e.id}>
                <Divider />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 }}>
                  <Txt size={13} tone="mute" style={{ width: 40 }}>{e.time}</Txt>
                  <View style={{ width: 4, alignSelf: "stretch", borderRadius: 2, backgroundColor: catColor(e.color) }} />
                  <View style={{ flex: 1 }}>
                    <Txt size={15} weight="semibold">{e.title}</Txt>
                    <Txt size={12.5} tone="mute">{e.detail}</Txt>
                  </View>
                  {e.id === "e2" ? (
                    <View style={{ backgroundColor: colors.white, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }}>
                      <Txt size={12} weight="semibold" tone="brand">Dans 2 h</Txt>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Budget + groceries */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Card style={{ flex: 1 }} onPress={() => router.navigate("/(screens)/Finance")}>
            <WidgetTitle icon={Wallet} label="Budget" color={colors.green} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
              <Ring value={budgetMonth.spent / budgetMonth.budget} />
              <View>
                <Txt size={20} weight="bold" tight>{Math.round(left).toLocaleString("fr-FR")} €</Txt>
                <Txt size={12} tone="mute">restants</Txt>
              </View>
            </View>
            <Txt size={12.5} tone="mute" style={{ marginTop: 10 }}>
              {Math.round((budgetMonth.spent / budgetMonth.budget) * 100)} % de {budgetMonth.budget.toLocaleString("fr-FR")} € utilisés
            </Txt>
          </Card>
          <Card style={{ flex: 1 }} onPress={() => router.push(`/groceryList/${weeklyGroceries.id}`)}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <ShoppingCart size={17} color={colors.orange} strokeWidth={2.2} />
              <Txt size={15} weight="semibold" color={colors.orange}>Courses</Txt>
              <Txt size={13.5} weight="semibold" style={{ marginLeft: "auto" }}>{done}/{items.length}</Txt>
            </View>
            <View style={{ marginTop: 8, gap: 6 }}>
              {[...items.filter((i) => !i.done).slice(0, 3), items.find((i) => i.done)!].map((i) => (
                <View key={i.id} style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                  <View style={{ width: 15, height: 15, borderRadius: 8, borderWidth: 1.5, borderColor: i.done ? colors.brand : "#C7C7CC", backgroundColor: i.done ? colors.brand : "transparent" }} />
                  <Txt size={13.5} tone={i.done ? "faint" : "ink"} numberOfLines={1} style={{ flex: 1 }}>{i.name}</Txt>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Messages */}
        <Card>
          <WidgetTitle icon={MessageCircle} label="Messages" color={colors.blue} action="5 non lus" onAction={() => router.navigate("/(screens)/Chats")} />
          <View style={{ marginTop: 8 }}>
            <Divider />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 }}>
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" }}>
                <House size={19} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Txt size={15} weight="semibold">Foyer Martin</Txt>
                <Txt size={13.5} tone="mute" numberOfLines={1}>Camille : J’ai pris le lait</Txt>
              </View>
              <Badge value={3} />
            </View>
            <Divider />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 }}>
              <Avatar id="camille" size={38} />
              <View style={{ flex: 1 }}>
                <Txt size={15} weight="semibold">Camille</Txt>
                <Txt size={13.5} tone="mute" numberOfLines={1}>Tu passes chercher Jade ce soir ?</Txt>
              </View>
              <Badge value={2} />
            </View>
          </View>
        </Card>

        {/* Activity */}
        <Card>
          <WidgetTitle icon={Activity} label="Activité du foyer" color={colors.mute} />
          <View style={{ marginTop: 8 }}>
            {activity.map((a) => {
              const Icon = a.icon;
              return (
                <View key={a.id}>
                  <Divider />
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 9 }}>
                    <Avatar id={a.who} size={32} />
                    <View style={{ flex: 1 }}>
                      <Txt size={14}>
                        <Txt size={14} weight="semibold">{a.who === ME ? "Vous" : members[a.who].name}</Txt> {a.text}
                      </Txt>
                      <Txt size={12.5} tone="mute">{a.context}</Txt>
                    </View>
                    <Icon size={18} color={colors.brand} />
                  </View>
                </View>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
