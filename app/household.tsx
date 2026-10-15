import { Bell, Cloud, Euro, Languages, LogOut, Moon, Pencil, ScanFace, UserPlus, House } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Avatar, Box, Caption, NavBar, Row, Screen, Tile, Toggle, Txt } from "~/components/lv";
import { useAuth } from "~/lib/context/AuthContext";
import { household, householdMembers, ME, members } from "~/lib/data/household";
import { colors } from "~/lib/theme";

export default function Household() {
  const { signOut } = useAuth();
  const [faceId, setFaceId] = React.useState(true);

  return (
    <Screen>
      <NavBar back="Accueil" />
      <Txt size={32} weight="bold" tight style={{ paddingHorizontal: 16 }}>Foyer</Txt>
      <ScrollView contentContainerStyle={{ paddingTop: 14, paddingBottom: 30, gap: 22 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16, backgroundColor: colors.surface, borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" }}>
            <House size={28} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt size={20} weight="bold" tight>{household.name}</Txt>
            <Txt size={13.5} tone="mute">{householdMembers.length} membres · créé en {household.since}</Txt>
          </View>
          <Pencil size={20} color={colors.brand} />
        </View>

        <View>
          <Caption>Membres</Caption>
          <Box>
            {householdMembers.map((id) => (
              <Row
                key={id}
                leading={<Avatar id={id} size={38} />}
                title={id === ME ? `${members[id].name} (vous)` : members[id].name}
                subtitle={members[id].role}
                chevron={id !== ME}
              />
            ))}
            <Row leading={<View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" }}><UserPlus size={19} color={colors.brand} /></View>} last>
              <Txt size={16.5} tone="brand">Inviter un membre</Txt>
            </Row>
          </Box>
        </View>

        <View>
          <Caption>Préférences</Caption>
          <Box>
            <Row leading={<Tile icon={Bell} color="brand" size={30} radius={8} />} title="Notifications" trailing={<Txt size={16.5} tone="mute">Activées</Txt>} chevron />
            <Row leading={<Tile icon={Euro} color="green" size={30} radius={8} />} title="Devise" trailing={<Txt size={16.5} tone="mute">EUR</Txt>} chevron />
            <Row leading={<Tile icon={Languages} color="blue" size={30} radius={8} />} title="Langue" trailing={<Txt size={16.5} tone="mute">Français</Txt>} chevron />
            <Row leading={<Tile icon={ScanFace} color="orange" size={30} radius={8} />} title="Face ID pour le coffre" trailing={<Toggle on={faceId} onChange={setFaceId} />} />
            <Row leading={<Tile icon={Cloud} color="green" size={30} radius={8} />} title="Google Drive" trailing={<Txt size={16.5} tone="ok">Connecté</Txt>} chevron />
            <Row leading={<Tile icon={Moon} color="grey" size={30} radius={8} />} title="Apparence" trailing={<Txt size={16.5} tone="mute">Automatique</Txt>} chevron last />
          </Box>
        </View>

        <Pressable onPress={signOut} style={{ marginHorizontal: 16, height: 50, borderRadius: 14, borderWidth: 1, borderColor: colors.line, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <LogOut size={19} color={colors.danger} />
          <Txt size={16.5} tone="danger">Se déconnecter</Txt>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
