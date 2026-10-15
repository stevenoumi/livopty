import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { AvatarStack, catColor, LargeHeader, Screen, Txt } from "~/components/lv";
import { events, TODAY, type AgendaEvent } from "~/lib/data/household";
import { colors } from "~/lib/theme";

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) => new Date(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, Number(s.slice(8, 10)));

/** Monday-first grid of 6 weeks around the given month. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

function DayEvents({ date }: { date: string }) {
  const d = parse(date);
  const list = events.filter((e) => e.date === date).sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <Txt size={18} weight="bold" tight>{DAY_NAMES[d.getDay()]} {d.getDate()} {MONTHS[d.getMonth()]}</Txt>
        <Txt size={13} tone="faint">{list.length ? `${list.length} événement${list.length > 1 ? "s" : ""}` : "Rien de prévu"}</Txt>
      </View>
      {list.map((e: AgendaEvent, i) => (
        <View key={e.id} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.line }}>
          <View style={{ width: 46 }}>
            <Txt size={14} weight="semibold">{e.time ?? "Jour"}</Txt>
            {e.duration ? <Txt size={12} weight="medium" tone="faint">{e.duration}</Txt> : null}
          </View>
          <View style={{ width: 4, alignSelf: "stretch", borderRadius: 2, backgroundColor: catColor(e.color) }} />
          <View style={{ flex: 1 }}>
            <Txt size={16} weight="semibold">{e.title}</Txt>
            <Txt size={13.5} tone="mute">{e.detail}</Txt>
          </View>
          {e.with.length > 1 ? <AvatarStack ids={e.with.slice(0, 3)} size={24} /> : null}
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
  const grid = monthGrid(year, month);
  const byDay = events.reduce<Record<string, string[]>>((acc, e) => {
    (acc[e.date] ??= []).push(catColor(e.color));
    return acc;
  }, {});
  const next = iso(new Date(parse(selected).getTime() + 86400000));

  return (
    <Screen>
      <LargeHeader
        title={`${MONTHS[month].charAt(0).toUpperCase()}${MONTHS[month].slice(1)}`}
        onAdd={() => router.push("/event/new")}
        accessory={
          <View style={{ flexDirection: "row", gap: 18 }}>
            <Pressable hitSlop={8} onPress={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft size={22} color={colors.brand} /></Pressable>
            <Pressable hitSlop={8} onPress={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight size={22} color={colors.brand} /></Pressable>
          </View>
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <View style={{ flexDirection: "row" }}>
            {DAYS.map((d, i) => (
              <Txt key={i} size={12} weight="semibold" tone="faint" center style={{ flex: 1, marginBottom: 6 }}>{d}</Txt>
            ))}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {grid.map((d) => {
              const key = iso(d);
              const inMonth = d.getMonth() === month;
              const on = key === selected;
              const dots = byDay[key] ?? [];
              return (
                <Pressable key={key} onPress={() => setSelected(key)} style={{ width: `${100 / 7}%`, height: 46, alignItems: "center", justifyContent: "center", gap: 2 }}>
                  <View style={{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: on ? colors.brand : "transparent" }}>
                    <Txt size={17} weight={on ? "semibold" : "regular"} tone={on ? "white" : inMonth ? "ink" : "faint"} style={!inMonth ? { opacity: 0.5 } : undefined}>{d.getDate()}</Txt>
                  </View>
                  <View style={{ flexDirection: "row", gap: 2, height: 4 }}>
                    {inMonth ? dots.slice(0, 3).map((c, i) => <View key={i} style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: c }} />) : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View style={{ flexDirection: "row", gap: 14, marginTop: 6 }}>
            {[["Famille", colors.brand], ["Alex", colors.orange], ["Camille", colors.green], ["Jade", colors.blue]].map(([l, c]) => (
              <View key={l} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }} />
                <Txt size={13} tone="mute">{l}</Txt>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: colors.line, marginTop: 16 }} />
        <DayEvents date={selected} />
        <DayEvents date={next} />
      </ScrollView>
    </Screen>
  );
}
