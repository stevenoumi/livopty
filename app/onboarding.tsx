import { router } from "expo-router";
import { ArrowRight, Check, House, HousePlus, Link, UserPlus } from "lucide-react-native";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import { Avatar, Chip, NavBar, Screen, Txt } from "~/components/lv";
import { ROUTES } from "~/lib/constants";
import { colors, fonts } from "~/lib/theme";

const KINDS = ["En couple", "En famille", "En colocation"];

/** Step 2 of sign-up: name the household and invite its members. */
export default function Onboarding() {
  const [name, setName] = React.useState("Foyer Martin");
  const [kind, setKind] = React.useState(KINDS[0]);

  return (
    <Screen edges={["top", "bottom"]}>
      <NavBar back="" right={<Txt size={15} tone="faint">Étape 2 sur 3</Txt>} />
      <View style={{ flexDirection: "row", gap: 6, paddingHorizontal: 16 }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < 2 ? colors.brand : colors.line }} />
        ))}
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 24, gap: 22 }} showsVerticalScrollIndicator={false}>
          <View>
            <View style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" }}>
              <HousePlus size={32} color={colors.brand} />
            </View>
            <Txt size={28} weight="bold" tight style={{ marginTop: 16 }}>Créez votre foyer</Txt>
            <Txt size={16} tone="mute" style={{ marginTop: 6, lineHeight: 22 }}>
              Vos listes, votre budget et votre agenda seront partagés avec les membres que vous invitez.
            </Txt>
          </View>

          <View style={{ gap: 6 }}>
            <Txt size={13} tone="mute">Nom du foyer</Txt>
            <View style={{ height: 50, borderRadius: 12, borderWidth: 1, borderColor: colors.brand, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14 }}>
              <House size={20} color={colors.brand} />
              <TextInput value={name} onChangeText={setName} style={{ flex: 1, fontFamily: fonts.regular, fontSize: 16.5, color: colors.ink, paddingVertical: 0 }} />
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Txt size={13} tone="mute">Vous êtes</Txt>
            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
              {KINDS.map((k) => (
                <Chip key={k} label={k} active={kind === k} onPress={() => setKind(k)} />
              ))}
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Txt size={13} tone="mute">Inviter</Txt>
            <View style={{ backgroundColor: colors.surface, borderRadius: 16, padding: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Avatar id="camille" size={40} />
                <View style={{ flex: 1 }}>
                  <Txt size={16} weight="medium">camille.m@outlook.fr</Txt>
                  <Txt size={13} tone="ok">Invitation envoyée</Txt>
                </View>
                <Check size={20} color={colors.ok} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#E8E8EC" }}>
                <Link size={18} color={colors.brand} />
                <Txt size={14.5} tone="mute" style={{ flex: 1 }}>livopty.app/j/MARTIN-7Q2</Txt>
                <Txt size={14.5} weight="semibold" tone="brand">Copier</Txt>
              </View>
            </View>
            <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
              <UserPlus size={20} color={colors.brand} />
              <Txt size={16} tone="brand">Ajouter une autre personne</Txt>
            </Pressable>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <Pressable onPress={() => router.replace(ROUTES.HOME)} style={({ pressed }) => ({ height: 52, borderRadius: 14, backgroundColor: colors.brand, opacity: pressed ? 0.85 : 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 })}>
            <Txt size={17} weight="semibold" tone="white">Continuer</Txt>
            <ArrowRight size={20} color={colors.white} />
          </Pressable>
          <Pressable onPress={() => router.replace(ROUTES.HOME)} style={{ alignItems: "center", paddingVertical: 12 }}>
            <Txt size={14.5} tone="mute">Passer cette étape</Txt>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
