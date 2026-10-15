import { router } from "expo-router";
import { Calendar, ChevronDown } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, catColor, Donut, LargeHeader, ProgressBar, Row, Screen, SectionHeader, Segmented, Tile, Txt } from "~/components/lv";
import { budgetMonth, envelopes, euro, operations } from "~/lib/data/household";
import { colors } from "~/lib/theme";

export default function Budget() {
  const [tab, setTab] = React.useState("Dépenses");
  const spentByEnvelope = envelopes.reduce((s, e) => s + e.spent, 0);

  return (
    <Screen>
      <LargeHeader
        title="Budget"
        onAdd={() => router.push("/expense/new")}
        accessory={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Calendar size={16} color={colors.brand} />
            <Txt size={15} tone="brand">{budgetMonth.label}</Txt>
            <ChevronDown size={16} color={colors.brand} />
          </View>
        }
      >
        <View style={{ marginTop: 10 }}>
          <Segmented options={["Dépenses", "Revenus"]} value={tab} onChange={setTab} />
        </View>
      </LargeHeader>

      <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18, paddingHorizontal: 16 }}>
          <Donut parts={envelopes.map((e) => ({ value: e.spent, color: catColor(e.color) }))}>
            <Txt size={13} tone="mute">Dépensé</Txt>
            <Txt size={22} weight="bold" tight>{Math.round(budgetMonth.spent).toLocaleString("fr-FR")} €</Txt>
            <Txt size={12} tone="faint">sur {budgetMonth.budget.toLocaleString("fr-FR")} €</Txt>
          </Donut>
          <View style={{ flex: 1, gap: 10 }}>
            {envelopes.map((e) => (
              <View key={e.id} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: catColor(e.color) }} />
                <Txt size={14} style={{ flex: 1 }}>{e.name}</Txt>
                <Txt size={14} weight="semibold">{Math.round((e.spent / spentByEnvelope) * 100)} %</Txt>
              </View>
            ))}
          </View>
        </View>

        <SectionHeader title="Enveloppes" action="Modifier" style={{ marginTop: 28 }} />
        <View style={{ paddingHorizontal: 16 }}>
          {envelopes.map((e, i) => {
            const over = e.spent > e.budget;
            const rest = e.budget - e.spent;
            return (
              <View key={e.id} style={{ flexDirection: "row", gap: 12, alignItems: "center", paddingVertical: 12, borderBottomWidth: i === envelopes.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
                <Tile icon={e.icon} color={e.color} size={40} radius={10} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Txt size={16} weight="medium">{e.name}</Txt>
                    <Txt size={16} weight="semibold">{Math.round(e.spent).toLocaleString("fr-FR")} €</Txt>
                  </View>
                  <View style={{ marginTop: 7 }}>
                    <ProgressBar value={e.spent / e.budget} color={over ? colors.danger : catColor(e.color)} />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                    {over ? (
                      <Txt size={12.5} tone="danger">dépassé de {Math.round(-rest)} €</Txt>
                    ) : rest > 0 ? (
                      <Txt size={12.5} tone="ok">reste {Math.round(rest)} €</Txt>
                    ) : (
                      <Txt size={12.5} tone="faint">{e.note || "Utilisé"}</Txt>
                    )}
                    <Txt size={12.5} tone="faint">sur {e.budget.toLocaleString("fr-FR")} €</Txt>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <SectionHeader title="Dernières opérations" action="Tout voir" style={{ marginTop: 22 }} />
        {operations.map((o, i) => (
          <Row
            key={o.id}
            leading={<Avatar id={o.by} size={38} />}
            title={o.label}
            subtitle={`${o.category} · ${o.when}`}
            last={i === operations.length - 1}
            trailing={<Txt size={16} weight="semibold" tone={o.amount > 0 ? "ok" : "ink"}>{euro(o.amount, { sign: true })}</Txt>}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
