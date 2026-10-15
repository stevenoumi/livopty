import { useLocalSearchParams } from "expo-router";
import { Check, Copy, ExternalLink, Eye, EyeOff, KeyRound, UserPlus, Users } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Box, Caption, NavBar, NavText, Ring, Row, Screen, SoftIconButton, Txt } from "~/components/lv";
import { members, sharedAccounts } from "~/lib/data/household";
import { colors } from "~/lib/theme";

const ACCESS = ["Propriétaire", "Peut modifier", "Profil Enfants", "Lecture seule"];

function useCopied() {
  const [copied, setCopied] = React.useState<string | null>(null);
  // TODO: write to the clipboard once expo-clipboard is added.
  const copy = (key: string) => {
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };
  return { copied, copy };
}

export default function SharedAccount() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const account = sharedAccounts.find((a) => a.id === id) ?? sharedAccounts[0];
  const [shown, setShown] = React.useState(false);
  const { copied, copy } = useCopied();

  return (
    <Screen>
      <NavBar back="Coffre-fort" right={<NavText label="Modifier" />} />
      <ScrollView contentContainerStyle={{ paddingBottom: 30, gap: 22 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", gap: 8, marginTop: 4 }}>
          <View style={{ width: 68, height: 68, borderRadius: 16, backgroundColor: account.tint, alignItems: "center", justifyContent: "center" }}>
            <Txt size={34} weight="bold" tone="white">{account.letter}</Txt>
          </View>
          <Txt size={24} weight="bold" tight>{account.name}</Txt>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Users size={14} color={colors.mute} />
            <Txt size={13.5} tone="mute">Partagé avec le foyer · modifié le 2 oct.</Txt>
          </View>
        </View>

        <Box>
          <Row subtitle="Identifiant" trailing={<SoftIconButton icon={copied === "login" ? Check : Copy} onPress={() => copy("login")} />}>
            <Txt size={16.5}>{account.login}</Txt>
          </Row>
          <Row
            subtitle="Mot de passe"
            trailing={
              <View style={{ flexDirection: "row", gap: 8 }}>
                <SoftIconButton icon={shown ? EyeOff : Eye} onPress={() => setShown((s) => !s)} />
                <SoftIconButton icon={copied === "pwd" ? Check : Copy} onPress={() => copy("pwd")} />
              </View>
            }
          >
            <Txt size={17} style={{ letterSpacing: shown ? 0 : 2 }}>{shown ? "Martin-2026!film" : "••••••••••••"}</Txt>
          </Row>
          <Row subtitle="Code de vérification" trailing={<Ring value={0.62} size={30} stroke={3} color={colors.brand} />}>
            <Txt size={22} weight="semibold" tone="brand" style={{ letterSpacing: 1 }}>482 913</Txt>
          </Row>
          <Row subtitle="Site web" trailing={<ExternalLink size={18} color={colors.brand} />} last>
            <Txt size={16.5} tone="brand">{account.site}</Txt>
          </Row>
        </Box>

        <View>
          <Caption>Accès</Caption>
          <Box>
            {account.sharedWith.map((m, i) => (
              <Row key={m} leading={<Avatar id={m} size={32} />} title={members[m].name} trailing={<Txt size={14.5} tone="mute">{ACCESS[i] ?? ACCESS[3]}</Txt>} />
            ))}
            <Row
              leading={<View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" }}><UserPlus size={16} color={colors.brand} /></View>}
              last
            >
              <Txt size={16.5} tone="brand">Partager avec…</Txt>
            </Row>
          </Box>
        </View>

        {account.note ? (
          <View>
            <Caption>Notes</Caption>
            <Box style={{ padding: 14 }}>
              <Txt size={15.5} style={{ lineHeight: 22 }}>{account.note}</Txt>
            </Box>
          </View>
        ) : null}

        <View>
          <Caption>Historique</Caption>
          <Box>
            <Row leading={<KeyRound size={20} color={colors.faint} />} title="Mot de passe changé par Camille" subtitle="2 octobre" />
            <Row leading={<UserPlus size={20} color={colors.faint} />} title="Jade ajoutée par Alex" subtitle="14 septembre" last />
          </Box>
        </View>
      </ScrollView>
    </Screen>
  );
}
