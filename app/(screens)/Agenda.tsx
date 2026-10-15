import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  AvatarStack,
  catColor,
  LargeHeader,
  Screen,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { CATEGORY_COLORS, COLORS, ROUTES } from "~/lib/constants";
import { events, TODAY } from "~/lib/data/household";
import { cn } from "~/lib/utils";

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const DAY_NAMES = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const LEGEND = [
  ["Famille", CATEGORY_COLORS.brand],
  ["Alex", CATEGORY_COLORS.orange],
  ["Camille", CATEGORY_COLORS.green],
  ["Jade", CATEGORY_COLORS.blue],
] as const;

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) =>
  new Date(
    Number(s.slice(0, 4)),
    Number(s.slice(5, 7)) - 1,
    Number(s.slice(8)),
  );

/** Monday-first grid of six weeks covering the month. */
function monthGrid(year: number, month: number) {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  return Array.from(
    { length: 42 },
    (_, i) => new Date(year, month, 1 - offset + i),
  );
}

function DayEvents({ date }: { date: string }) {
  const d = parse(date);
  const list = events
    .filter((e) => e.date === date)
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
  return (
    <View className="mt-[18px] px-4">
      <View className="mb-1 flex-row items-baseline justify-between">
        <Text variant="heading">
          {DAY_NAMES[d.getDay()]} {d.getDate()} {MONTHS[d.getMonth()]}
        </Text>
        <Text variant="caption" tone="muted">
          {list.length
            ? `${list.length} événement${list.length > 1 ? "s" : ""}`
            : "Rien de prévu"}
        </Text>
      </View>
      {list.map((e, i) => (
        <View
          key={e.id}
          className={cn(
            "flex-row items-center gap-3 py-2.5",
            i > 0 && "border-t border-border",
          )}
        >
          <View className="w-[46px]">
            <Text className="text-sm font-semibold">{e.time ?? "Jour"}</Text>
            {e.duration ? (
              <Text variant="caption" tone="muted">
                {e.duration}
              </Text>
            ) : null}
          </View>
          <View
            className="w-1 self-stretch rounded-sm"
            style={{ backgroundColor: catColor(e.color) }}
          />
          <View className="flex-1">
            <Text className="font-semibold">{e.title}</Text>
            <Text tone="muted" className="text-sm">
              {e.detail}
            </Text>
          </View>
          {e.with.length > 1 ? (
            <AvatarStack ids={e.with.slice(0, 3)} size={24} />
          ) : null}
        </View>
      ))}
    </View>
  );
}

export default function Agenda() {
  const [cursor, setCursor] = React.useState(() => parse(TODAY));
  const [selected, setSelected] = React.useState(TODAY);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const dots = events.reduce<Record<string, string[]>>((acc, e) => {
    (acc[e.date] ??= []).push(catColor(e.color));
    return acc;
  }, {});
  const next = iso(new Date(parse(selected).getTime() + 86400000));
  const title = MONTHS[month].charAt(0).toUpperCase() + MONTHS[month].slice(1);

  return (
    <Screen>
      <LargeHeader
        title={title}
        onAdd={() => router.push(ROUTES.NEW_EVENT)}
        accessory={
          <View className="flex-row gap-[18px]">
            <Pressable
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Mois précédent"
              onPress={() => setCursor(new Date(year, month - 1, 1))}
            >
              <ChevronLeft size={22} color={COLORS.primary} />
            </Pressable>
            <Pressable
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Mois suivant"
              onPress={() => setCursor(new Date(year, month + 1, 1))}
            >
              <ChevronRight size={22} color={COLORS.primary} />
            </Pressable>
          </View>
        }
      />
      <ScrollView
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 px-4">
          <View className="flex-row">
            {DAYS.map((d, i) => (
              <Text
                key={i}
                variant="caption"
                tone="muted"
                className="mb-1.5 flex-1 text-center font-semibold"
              >
                {d}
              </Text>
            ))}
          </View>
          <View className="flex-row flex-wrap">
            {monthGrid(year, month).map((d) => {
              const key = iso(d);
              const inMonth = d.getMonth() === month;
              const on = key === selected;
              return (
                <Pressable
                  key={key}
                  onPress={() => setSelected(key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  className="h-[46px] items-center justify-center gap-0.5"
                  style={{ width: `${100 / 7}%` }}
                >
                  <View
                    className={cn(
                      "h-[34px] w-[34px] items-center justify-center rounded-full",
                      on && "bg-primary",
                    )}
                  >
                    <Text
                      tone={on ? "inverse" : inMonth ? "default" : "muted"}
                      className={cn(
                        "text-[17px]",
                        on && "font-semibold",
                        !inMonth && "opacity-50",
                      )}
                    >
                      {d.getDate()}
                    </Text>
                  </View>
                  <View className="h-1 flex-row gap-0.5">
                    {inMonth
                      ? (dots[key] ?? [])
                          .slice(0, 3)
                          .map((c, i) => (
                            <View
                              key={i}
                              className="h-1 w-1 rounded-full"
                              style={{ backgroundColor: c }}
                            />
                          ))
                      : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View className="mt-1.5 flex-row gap-3.5">
            {LEGEND.map(([label, color]) => (
              <View key={label} className="flex-row items-center gap-[5px]">
                <View
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <Text tone="muted" className="text-[13px]">
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View className="mt-4 h-px bg-border" />
        <DayEvents date={selected} />
        <DayEvents date={next} />
      </ScrollView>
    </Screen>
  );
}
