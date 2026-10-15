import { router } from "expo-router";
import { Calendar, Delete, Split, UserRound } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import {
  Box,
  catColor,
  Chip,
  MemberAvatar,
  NavBar,
  NavText,
  Row,
  Screen,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { expenseCategories } from "~/lib/data/household";
import { cn } from "~/lib/utils";
import { pressAmountKey, splitAmount } from "~/lib/utils/amount";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"];
const KINDS = ["Dépense", "Revenu", "Remboursement"];

export default function NewExpense() {
  const [kind, setKind] = React.useState(KINDS[0]);
  const [amount, setAmount] = React.useState("14");
  const [category, setCategory] = React.useState("groceries");
  const { width } = useWindowDimensions();
  // Fixed widths: percentages plus `gap` overflow the row.
  const catWidth = (width - 32 - 3 * 8) / 4;
  const keyWidth = (width - 12 - 2 * 6) / 3;
  const { int, dec } = splitAmount(amount);

  return (
    <Screen>
      <NavBar
        left={<NavText label="Annuler" onPress={() => router.back()} />}
        title="Nouvelle dépense"
        right={<NavText label="Ajouter" bold onPress={() => router.back()} />}
      />
      <ScrollView
        contentContainerClassName="gap-[18px] pb-3 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-1">
          <View className="flex-row gap-1.5">
            {KINDS.map((k) => (
              <Chip
                key={k}
                label={k}
                active={kind === k}
                onPress={() => setKind(k)}
              />
            ))}
          </View>
          <View
            className="mt-3 flex-row items-end"
            accessibilityLabel={`Montant : ${int},${dec} euros`}
          >
            <Text className="text-[46px] font-bold leading-[52px]">{int}</Text>
            <Text tone="muted" className="text-[46px] font-bold leading-[52px]">
              ,{dec} €
            </Text>
          </View>
          <Text tone="muted" className="text-sm">
            Marché du mercredi
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2 px-4">
          {expenseCategories.map((c) => {
            const on = c.id === category;
            const Icon = c.icon;
            return (
              <Pressable
                key={c.id}
                onPress={() => setCategory(c.id)}
                accessibilityRole="radio"
                accessibilityState={{ checked: on }}
                className={cn(
                  "items-center gap-1.5 rounded-[14px] border-[1.5px] py-2.5",
                  on
                    ? "border-primary bg-primary-soft"
                    : "border-transparent bg-muted",
                )}
                style={{ width: catWidth }}
              >
                <View
                  className="h-[34px] w-[34px] items-center justify-center rounded-full"
                  style={{ backgroundColor: catColor(c.color) }}
                >
                  <Icon size={18} color={COLORS.primaryForeground} />
                </View>
                <Text
                  variant="caption"
                  tone={on ? "primary" : "default"}
                  className="font-medium"
                >
                  {c.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Box>
          <Row
            leading={<UserRound size={22} color={COLORS.mutedForeground} />}
            title="Payé par"
            trailing={
              <View className="flex-row items-center gap-1.5">
                <MemberAvatar id="camille" size={24} />
                <Text tone="muted">Camille</Text>
              </View>
            }
          />
          <Row
            leading={<Split size={22} color={COLORS.mutedForeground} />}
            title="Partagé"
            trailing={<Text tone="muted">Alex et Camille · 50/50</Text>}
          />
          <Row
            leading={<Calendar size={22} color={COLORS.mutedForeground} />}
            title="Date"
            trailing={<Text tone="muted">Aujourd’hui</Text>}
            last
          />
        </Box>
      </ScrollView>

      <View className="flex-row flex-wrap gap-1.5 bg-secondary p-1.5 pb-8">
        {KEYS.map((k) => {
          const fn = k === "," || k === "del";
          return (
            <Pressable
              key={k}
              onPress={() => setAmount((a) => pressAmountKey(a, k))}
              accessibilityRole="button"
              accessibilityLabel={k === "del" ? "Effacer" : k}
              className={cn(
                "h-[46px] items-center justify-center rounded-md",
                !fn && "bg-background shadow-sm active:bg-input",
              )}
              style={{ width: keyWidth }}
            >
              {k === "del" ? (
                <Delete size={26} color={COLORS.foreground} />
              ) : (
                <Text className="text-2xl leading-8">{k}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
