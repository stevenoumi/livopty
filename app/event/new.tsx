import { router } from "expo-router";
import {
  Bell,
  Calendar,
  Clock,
  Clock4,
  ListChecks,
  MapPin,
  PartyPopper,
  Plane,
  Repeat,
  School,
  Stethoscope,
  Sun,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react-native";
import * as React from "react";
import { ScrollView, TextInput, View } from "react-native";
import {
  AvatarStack,
  Box,
  Chip,
  NavBar,
  NavText,
  Row,
  Screen,
  Toggle,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";

const TYPES: [string, LucideIcon][] = [
  ["Fête", PartyPopper],
  ["Santé", Stethoscope],
  ["École", School],
  ["Voyage", Plane],
];

function Pill({ label }: { label: string }) {
  return (
    <View className="h-[30px] justify-center rounded-lg bg-secondary px-2.5">
      <Text className="text-[15px]">{label}</Text>
    </View>
  );
}

const icon = (Icon: LucideIcon) => (
  <Icon size={22} color={COLORS.mutedForeground} />
);

export default function NewEvent() {
  const [title, setTitle] = React.useState("Anniversaire de Jade 🎂");
  const [type, setType] = React.useState("Fête");
  const [allDay, setAllDay] = React.useState(false);

  return (
    <Screen>
      <NavBar
        left={<NavText label="Annuler" onPress={() => router.back()} />}
        title="Nouvel événement"
        right={<NavText label="Ajouter" bold onPress={() => router.back()} />}
      />
      <ScrollView
        contentContainerClassName="gap-5 pb-8 pt-2.5"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titre"
            placeholderTextColor={COLORS.mutedForeground}
            accessibilityLabel="Titre de l’événement"
            className="h-14 rounded-xl border border-primary px-3.5 font-semibold text-xl text-foreground"
          />
          <View className="mt-2.5 flex-row flex-wrap gap-2">
            {TYPES.map(([label, Icon]) => (
              <Chip
                key={label}
                label={label}
                icon={Icon}
                active={type === label}
                onPress={() => setType(label)}
              />
            ))}
          </View>
        </View>

        <Box>
          <Row
            leading={icon(Sun)}
            title="Toute la journée"
            trailing={
              <Toggle
                on={allDay}
                onChange={setAllDay}
                label="Toute la journée"
              />
            }
          />
          {allDay ? null : (
            <>
              <Row
                leading={icon(Clock)}
                title="Début"
                trailing={
                  <View className="flex-row gap-1.5">
                    <Pill label="sam. 17 oct." />
                    <Pill label="14:00" />
                  </View>
                }
              />
              <Row
                leading={icon(Clock4)}
                title="Fin"
                trailing={<Pill label="18:00" />}
              />
            </>
          )}
          <Row
            leading={icon(MapPin)}
            title="Lieu"
            trailing={<Text tone="muted">Maison</Text>}
            last
          />
        </Box>

        <Box>
          <Row
            leading={icon(Users)}
            title="Avec"
            chevron
            trailing={
              <AvatarStack
                ids={["alex", "camille", "jade", "mamie"]}
                size={24}
              />
            }
          />
          <Row
            leading={icon(Calendar)}
            title="Calendrier"
            trailing={
              <View className="flex-row items-center gap-1.5">
                <View className="h-2.5 w-2.5 rounded-full bg-primary" />
                <Text tone="muted">Famille</Text>
              </View>
            }
          />
          <Row
            leading={icon(Bell)}
            title="Rappel"
            trailing={<Text tone="muted">La veille à 18:00</Text>}
          />
          <Row
            leading={icon(Repeat)}
            title="Répéter"
            trailing={<Text tone="muted">Chaque année</Text>}
            last
          />
        </Box>

        <Box>
          <Row
            leading={<ListChecks size={22} color={COLORS.primary} />}
            title="Liste liée"
            subtitle="Anniversaire de Jade · 6 idées"
            chevron
          />
          <Row
            leading={<Wallet size={22} color={COLORS.primary} />}
            title="Budget"
            subtitle="Enveloppe Fêtes · 150 €"
            chevron
            last
          />
        </Box>
      </ScrollView>
    </Screen>
  );
}
