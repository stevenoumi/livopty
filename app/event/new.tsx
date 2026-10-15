import { router } from "expo-router";
import { Bell, Calendar, Clock, Clock4, ListChecks, MapPin, PartyPopper, Plane, Repeat, School, Stethoscope, Sun, Users, Wallet } from "lucide-react-native";
import * as React from "react";
import { ScrollView, TextInput, View } from "react-native";
import { AvatarStack, Box, Chip, NavBar, NavText, Row, Screen, Toggle, Txt } from "~/components/lv";
import { colors, fonts } from "~/lib/theme";

function Pill({ label }: { label: string }) {
  return (
    <View style={{ height: 30, paddingHorizontal: 10, borderRadius: 8, backgroundColor: "#F3F3F5", justifyContent: "center" }}>
      <Txt size={15}>{label}</Txt>
    </View>
  );
}

export default function NewEvent() {
  const [title, setTitle] = React.useState("Anniversaire de Jade 🎂");
  const [type, setType] = React.useState("Fête");
  const [allDay, setAllDay] = React.useState(false);
  const icon = (I: typeof Sun) => <I size={22} color={colors.mute} />;

  return (
    <Screen>
      <NavBar
        left={<NavText label="Annuler" onPress={() => router.back()} />}
        title="Nouvel événement"
        right={<NavText label="Ajouter" bold onPress={() => router.back()} />}
      />
      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 30, gap: 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 16 }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titre"
            placeholderTextColor={colors.faint}
            style={{ height: 56, borderRadius: 12, borderWidth: 1, borderColor: colors.brand, paddingHorizontal: 14, fontFamily: fonts.semibold, fontSize: 20, color: colors.ink }}
          />
          <View style={{ flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {[["Fête", PartyPopper], ["Santé", Stethoscope], ["École", School], ["Voyage", Plane]].map(([l, I]) => (
              <Chip key={l as string} label={l as string} icon={I as typeof Sun} active={type === l} onPress={() => setType(l as string)} />
            ))}
          </View>
        </View>

        <Box>
          <Row leading={icon(Sun)} title="Toute la journée" trailing={<Toggle on={allDay} onChange={setAllDay} />} />
          {allDay ? null : (
            <>
              <Row leading={icon(Clock)} title="Début" trailing={<View style={{ flexDirection: "row", gap: 6 }}><Pill label="sam. 17 oct." /><Pill label="14:00" /></View>} />
              <Row leading={icon(Clock4)} title="Fin" trailing={<Pill label="18:00" />} />
            </>
          )}
          <Row leading={icon(MapPin)} title="Lieu" trailing={<Txt size={16.5} tone="mute">Maison</Txt>} last />
        </Box>

        <Box>
          <Row leading={icon(Users)} title="Avec" chevron trailing={<AvatarStack ids={["alex", "camille", "jade", "mamie"]} size={24} />} />
          <Row leading={icon(Calendar)} title="Calendrier" trailing={<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.brand }} /><Txt size={16.5} tone="mute">Famille</Txt></View>} />
          <Row leading={icon(Bell)} title="Rappel" trailing={<Txt size={16.5} tone="mute">La veille à 18:00</Txt>} />
          <Row leading={icon(Repeat)} title="Répéter" trailing={<Txt size={16.5} tone="mute">Chaque année</Txt>} last />
        </Box>

        <Box>
          <Row leading={<ListChecks size={22} color={colors.brand} />} title="Liste liée" subtitle="Anniversaire de Jade · 6 idées" chevron />
          <Row leading={<Wallet size={22} color={colors.brand} />} title="Budget" subtitle="Enveloppe Fêtes · 150 €" chevron last />
        </Box>
      </ScrollView>
    </Screen>
  );
}
