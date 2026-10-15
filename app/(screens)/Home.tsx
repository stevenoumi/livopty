import { router } from "expo-router";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  House,
  LockKeyhole,
  MessageCircle,
  ShoppingCart,
  Wallet,
  type LucideIcon,
} from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Badge,
  Card,
  catColor,
  MemberAvatar,
  Ring,
  Screen,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { CATEGORY_COLORS, COLORS, ROUTES } from "~/lib/constants";
import {
  activity,
  budgetMonth,
  events,
  ME,
  members,
  TODAY,
  weeklyGroceries,
} from "~/lib/data/household";
import { cn } from "~/lib/utils";

const WEEK = [
  { d: "LUN", n: 12 },
  { d: "MAR", n: 13 },
  { d: "MER", n: 14 },
  { d: "JEU", n: 15 },
  { d: "VEN", n: 16 },
  { d: "SAM", n: 17 },
  { d: "DIM", n: 18 },
];

function WidgetTitle({
  icon: Icon,
  label,
  color,
  action,
  onAction,
}: {
  icon: LucideIcon;
  label: string;
  color: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Icon size={17} color={color} strokeWidth={2.2} />
      <Text className="font-semibold" style={{ color }}>
        {label}
      </Text>
      {action ? (
        <Pressable
          onPress={onAction}
          hitSlop={8}
          accessibilityRole="button"
          className="ml-auto flex-row items-center"
        >
          <Text variant="label" tone="primary">
            {action}
          </Text>
          <ChevronRight size={15} color={COLORS.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

function Divided({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-row items-center gap-2.5 border-t border-border py-2.5">
      {children}
    </View>
  );
}

export default function Home() {
  const today = events.filter((e) => e.date === TODAY);
  const dayDots = new Map(
    events.map((e) => [Number(e.date.slice(8)), catColor(e.color)]),
  );
  const items = weeklyGroceries.aisles.flatMap((a) => a.items);
  const done = items.filter((i) => i.done).length;
  const left = budgetMonth.budget - budgetMonth.spent;
  const preview = [
    ...items.filter((i) => !i.done).slice(0, 3),
    ...items.filter((i) => i.done).slice(0, 1),
  ];

  return (
    <Screen>
      <View className="flex-row items-end px-4 pt-1">
        <View className="flex-1">
          <Text
            variant="caption"
            tone="muted"
            className="font-semibold uppercase"
          >
            Mercredi 14 octobre
          </Text>
          <Text variant="display">Bonjour Alex</Text>
        </View>
        <View className="mb-1.5 flex-row items-center gap-4">
          <Pressable
            onPress={() => router.push(ROUTES.VAULT)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Coffre-fort"
          >
            <LockKeyhole size={23} color={COLORS.foreground} />
          </Pressable>
          <View accessibilityLabel="Notifications">
            <Bell size={23} color={COLORS.foreground} />
            <View className="absolute right-px top-0 h-2 w-2 rounded-full border border-background bg-destructive" />
          </View>
          <Pressable
            onPress={() => router.push(ROUTES.SETTINGS)}
            accessibilityRole="button"
            accessibilityLabel="Paramètres du foyer"
          >
            <MemberAvatar id={ME} size={34} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="gap-3 p-4"
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <WidgetTitle
            icon={CalendarDays}
            label="Aujourd’hui"
            color={COLORS.primary}
            action="Agenda"
            onAction={() => router.navigate(ROUTES.AGENDA)}
          />
          <View className="mt-3 flex-row justify-between">
            {WEEK.map((w) => {
              const on = w.n === 14;
              return (
                <View key={w.n} className="w-[38px] items-center gap-1">
                  <Text
                    variant="caption"
                    tone="muted"
                    className="font-semibold"
                  >
                    {w.d}
                  </Text>
                  <View
                    className={cn(
                      "h-8 w-8 items-center justify-center rounded-full",
                      on && "bg-primary",
                    )}
                  >
                    <Text
                      tone={on ? "inverse" : "default"}
                      className={on ? "font-semibold" : "font-medium"}
                    >
                      {w.n}
                    </Text>
                  </View>
                  <View
                    className="h-1 w-1 rounded-full"
                    style={{
                      backgroundColor: dayDots.get(w.n) ?? "transparent",
                    }}
                  />
                </View>
              );
            })}
          </View>
          <View className="mt-2.5">
            {today.map((e) => (
              <Divided key={e.id}>
                <Text tone="muted" className="w-10 text-sm">
                  {e.time}
                </Text>
                <View
                  className="w-1 self-stretch rounded-sm"
                  style={{ backgroundColor: catColor(e.color) }}
                />
                <View className="flex-1">
                  <Text className="font-semibold">{e.title}</Text>
                  <Text variant="caption" tone="muted">
                    {e.detail}
                  </Text>
                </View>
                {e.id === "e2" ? (
                  <View className="rounded-lg bg-background px-2 py-0.5">
                    <Text
                      variant="caption"
                      tone="primary"
                      className="font-semibold"
                    >
                      Dans 2 h
                    </Text>
                  </View>
                ) : null}
              </Divided>
            ))}
          </View>
        </Card>

        <View className="flex-row gap-3">
          <Card
            className="flex-1"
            onPress={() => router.navigate(ROUTES.FINANCE)}
          >
            <WidgetTitle
              icon={Wallet}
              label="Budget"
              color={CATEGORY_COLORS.green}
            />
            <View className="mt-3 flex-row items-center gap-2.5">
              <Ring value={budgetMonth.spent / budgetMonth.budget} />
              <View>
                <Text variant="heading" className="text-xl">
                  {Math.round(left).toLocaleString("fr-FR")} €
                </Text>
                <Text variant="caption" tone="muted">
                  restants
                </Text>
              </View>
            </View>
            <Text variant="caption" tone="muted" className="mt-2.5">
              {Math.round((budgetMonth.spent / budgetMonth.budget) * 100)} % de{" "}
              {budgetMonth.budget.toLocaleString("fr-FR")} € utilisés
            </Text>
          </Card>
          <Card
            className="flex-1"
            onPress={() => router.push(ROUTES.GROCERY_LIST(weeklyGroceries.id))}
          >
            <View className="flex-row items-center gap-1.5">
              <ShoppingCart
                size={17}
                color={CATEGORY_COLORS.orange}
                strokeWidth={2.2}
              />
              <Text
                className="font-semibold"
                style={{ color: CATEGORY_COLORS.orange }}
              >
                Courses
              </Text>
              <Text variant="label" className="ml-auto font-semibold">
                {done}/{items.length}
              </Text>
            </View>
            <View className="mt-2 gap-1.5">
              {preview.map((i) => (
                <View key={i.id} className="flex-row items-center gap-[7px]">
                  <View
                    className={cn(
                      "h-[15px] w-[15px] rounded-full border-[1.5px]",
                      i.done ? "border-primary bg-primary" : "border-input",
                    )}
                  />
                  <Text
                    tone={i.done ? "muted" : "default"}
                    numberOfLines={1}
                    className="flex-1 text-sm leading-5"
                  >
                    {i.name}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        <Card>
          <WidgetTitle
            icon={MessageCircle}
            label="Messages"
            color={CATEGORY_COLORS.blue}
            action="5 non lus"
            onAction={() => router.navigate(ROUTES.CHATS)}
          />
          <View className="mt-2">
            <Divided>
              <View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-primary">
                <House size={19} color={COLORS.primaryForeground} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold">Foyer Martin</Text>
                <Text tone="muted" numberOfLines={1} className="text-sm">
                  Camille : J’ai pris le lait
                </Text>
              </View>
              <Badge value={3} />
            </Divided>
            <Divided>
              <MemberAvatar id="camille" size={38} />
              <View className="flex-1">
                <Text className="font-semibold">Camille</Text>
                <Text tone="muted" numberOfLines={1} className="text-sm">
                  Tu passes chercher Jade ce soir ?
                </Text>
              </View>
              <Badge value={2} />
            </Divided>
          </View>
        </Card>

        <Card>
          <WidgetTitle
            icon={Activity}
            label="Activité du foyer"
            color={COLORS.mutedForeground}
          />
          <View className="mt-2">
            {activity.map((a) => {
              const Icon = a.icon;
              return (
                <Divided key={a.id}>
                  <MemberAvatar id={a.who} size={32} />
                  <View className="flex-1">
                    <Text className="text-sm leading-5">
                      <Text className="text-sm font-semibold leading-5">
                        {a.who === ME ? "Vous" : members[a.who].name}
                      </Text>{" "}
                      {a.text}
                    </Text>
                    <Text variant="caption" tone="muted">
                      {a.context}
                    </Text>
                  </View>
                  <Icon size={18} color={COLORS.primary} />
                </Divided>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
