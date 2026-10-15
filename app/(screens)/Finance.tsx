import { router } from "expo-router";
import { Calendar, ChevronDown } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  catColor,
  Donut,
  LargeHeader,
  MemberAvatar,
  ProgressBar,
  Row,
  Screen,
  SectionHeader,
  Segmented,
  Tile,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { COLORS, ROUTES } from "~/lib/constants";
import { budgetMonth, envelopes, euro, operations } from "~/lib/data/household";
import { cn } from "~/lib/utils";

export default function Budget() {
  const [tab, setTab] = React.useState("Dépenses");
  const spent = envelopes.reduce((s, e) => s + e.spent, 0);

  return (
    <Screen>
      <LargeHeader
        title="Budget"
        onAdd={() => router.push(ROUTES.NEW_EXPENSE)}
        accessory={
          <View className="flex-row items-center gap-1">
            <Calendar size={16} color={COLORS.primary} />
            <Text tone="primary" className="text-[15px]">
              {budgetMonth.label}
            </Text>
            <ChevronDown size={16} color={COLORS.primary} />
          </View>
        }
      >
        <View className="mt-2.5">
          <Segmented
            options={["Dépenses", "Revenus"]}
            value={tab}
            onChange={setTab}
          />
        </View>
      </LargeHeader>

      <ScrollView
        contentContainerClassName="pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-[18px] px-4">
          <Donut
            parts={envelopes.map((e) => ({
              value: e.spent,
              color: catColor(e.color),
            }))}
          >
            <Text tone="muted" className="text-[13px]">
              Dépensé
            </Text>
            <Text variant="title">
              {Math.round(budgetMonth.spent).toLocaleString("fr-FR")} €
            </Text>
            <Text variant="caption" tone="muted">
              sur {budgetMonth.budget.toLocaleString("fr-FR")} €
            </Text>
          </Donut>
          <View className="flex-1 gap-2.5">
            {envelopes.map((e) => (
              <View key={e.id} className="flex-row items-center gap-2">
                <View
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: catColor(e.color) }}
                />
                <Text className="flex-1 text-sm">{e.name}</Text>
                <Text className="text-sm font-semibold">
                  {Math.round((e.spent / spent) * 100)} %
                </Text>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="Enveloppes" action="Modifier" className="mt-7" />
        <View className="px-4">
          {envelopes.map((e, i) => {
            const over = e.spent > e.budget;
            const rest = e.budget - e.spent;
            return (
              <View
                key={e.id}
                className={cn(
                  "flex-row items-center gap-3 py-3",
                  i < envelopes.length - 1 && "border-b border-border",
                )}
              >
                <Tile icon={e.icon} color={e.color} size={40} radius={10} />
                <View className="flex-1">
                  <View className="flex-row justify-between">
                    <Text className="font-medium">{e.name}</Text>
                    <Text className="font-semibold">
                      {Math.round(e.spent).toLocaleString("fr-FR")} €
                    </Text>
                  </View>
                  <View className="mt-[7px]">
                    <ProgressBar
                      value={e.spent / e.budget}
                      color={over ? COLORS.destructive : catColor(e.color)}
                    />
                  </View>
                  <View className="mt-1 flex-row justify-between">
                    {over ? (
                      <Text variant="caption" tone="destructive">
                        dépassé de {Math.round(-rest)} €
                      </Text>
                    ) : rest > 0 ? (
                      <Text variant="caption" tone="success">
                        reste {Math.round(rest)} €
                      </Text>
                    ) : (
                      <Text variant="caption" tone="muted">
                        {e.note || "Utilisé"}
                      </Text>
                    )}
                    <Text variant="caption" tone="muted">
                      sur {e.budget.toLocaleString("fr-FR")} €
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <SectionHeader
          title="Dernières opérations"
          action="Tout voir"
          className="mt-[22px]"
        />
        {operations.map((o, i) => (
          <Row
            key={o.id}
            leading={<MemberAvatar id={o.by} size={38} />}
            title={o.label}
            subtitle={`${o.category} · ${o.when}`}
            last={i === operations.length - 1}
            trailing={
              <Text
                tone={o.amount > 0 ? "success" : "default"}
                className="font-semibold"
              >
                {euro(o.amount, { sign: true })}
              </Text>
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
