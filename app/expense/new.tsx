import { router } from "expo-router";
import { Calendar, Delete, Split, UserRound } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { Avatar, Box, catColor, Chip, NavBar, NavText, Row, Screen, Txt } from "~/components/lv";
import { expenseCategories } from "~/lib/data/household";
import { colors } from "~/lib/theme";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"];

/** Builds the amount string from keypad presses: at most 2 decimals, one comma. */
function press(current: string, key: string) {
  if (key === "del") return current.slice(0, -1);
  if (key === ",") return current.includes(",") ? current : (current || "0") + ",";
  const [, dec] = current.split(",");
  if (dec !== undefined && dec.length >= 2) return current;
  if (current === "0") return key;
  return current + key;
}

export default function NewExpense() {
  const [kind, setKind] = React.useState("Dépense");
  const [amount, setAmount] = React.useState("14");
  const [category, setCategory] = React.useState("groceries");

  const [int, dec] = amount.split(",");
  const { width } = useWindowDimensions();
  // Fixed widths: percentages plus `gap` overflow the row.
  const catW = (width - 32 - 3 * 8) / 4;
  const keyW = (width - 12 - 2 * 6) / 3;

  return (
    <Screen edges={["top"]}>
      <NavBar
        left={<NavText label="Annuler" onPress={() => router.back()} />}
        title="Nouvelle dépense"
        right={<NavText label="Ajouter" bold onPress={() => router.back()} />}
      />
      <ScrollView contentContainerStyle={{ paddingTop: 8, gap: 18, paddingBottom: 12 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", gap: 4 }}>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {["Dépense", "Revenu", "Remboursement"].map((k) => (
              <Chip key={k} label={k} active={kind === k} onPress={() => setKind(k)} />
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 12 }}>
            <Txt size={46} weight="bold" tight>{int || "0"}</Txt>
            <Txt size={46} weight="bold" tight tone="faint">,{(dec ?? "").padEnd(2, "0")} €</Txt>
          </View>
          <Txt size={14} tone="mute">Marché du mercredi</Txt>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 16 }}>
          {expenseCategories.map((c) => {
            const on = c.id === category;
            const Icon = c.icon;
            return (
              <Pressable
                key={c.id}
                onPress={() => setCategory(c.id)}
                style={{ width: catW, alignItems: "center", gap: 6, paddingVertical: 10, borderRadius: 14, backgroundColor: on ? colors.brandSoft : colors.surface, borderWidth: 1.5, borderColor: on ? colors.brand : "transparent" }}
              >
                <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: catColor(c.color), alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={colors.white} />
                </View>
                <Txt size={12} weight="medium" tone={on ? "brand" : "ink"}>{c.name}</Txt>
              </Pressable>
            );
          })}
        </View>

        <Box>
          <Row leading={<UserRound size={22} color={colors.mute} />} title="Payé par" trailing={<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}><Avatar id="camille" size={24} /><Txt size={16.5} tone="mute">Camille</Txt></View>} />
          <Row leading={<Split size={22} color={colors.mute} />} title="Partagé" trailing={<Txt size={16.5} tone="mute">Alex et Camille · 50/50</Txt>} />
          <Row leading={<Calendar size={22} color={colors.mute} />} title="Date" trailing={<Txt size={16.5} tone="mute">Aujourd’hui</Txt>} last />
        </Box>
      </ScrollView>

      <View style={{ flexDirection: "row", flexWrap: "wrap", backgroundColor: "#D1D3D9", padding: 6, paddingBottom: 34, gap: 6 }}>
        {KEYS.map((k) => {
          const fn = k === "," || k === "del";
          return (
            <Pressable
              key={k}
              onPress={() => setAmount((a) => press(a, k))}
              style={({ pressed }) => ({ width: keyW, height: 46, borderRadius: 6, alignItems: "center", justifyContent: "center", backgroundColor: fn ? "transparent" : pressed ? "#BCC0C7" : colors.white })}
            >
              {k === "del" ? <Delete size={26} color={colors.ink} /> : <Txt size={24}>{k}</Txt>}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
