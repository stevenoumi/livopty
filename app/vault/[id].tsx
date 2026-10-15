import { useLocalSearchParams } from "expo-router";
import {
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  UserPlus,
  Users,
} from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Box,
  Caption,
  MemberAvatar,
  NavBar,
  NavText,
  Ring,
  Row,
  Screen,
  SoftIconButton,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { members, sharedAccounts } from "~/lib/data/household";
import { useCopied } from "~/lib/hooks/useCopied";

const ACCESS = ["Propriétaire", "Peut modifier", "Profil Enfants"];
const DEMO_PASSWORD = "Martin-2026!film";

export default function SharedAccount() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const account = sharedAccounts.find((a) => a.id === id) ?? sharedAccounts[0];
  const [shown, setShown] = React.useState(false);
  const { copied, copy } = useCopied();

  return (
    <Screen>
      <NavBar back="Coffre-fort" right={<NavText label="Modifier" />} />
      <ScrollView
        contentContainerClassName="gap-[22px] pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-1 items-center gap-2">
          <View
            className="h-[68px] w-[68px] items-center justify-center rounded-2xl"
            style={{ backgroundColor: account.tint }}
          >
            <Text tone="inverse" className="text-[34px] font-bold leading-10">
              {account.letter}
            </Text>
          </View>
          <Text variant="title">{account.name}</Text>
          <View className="flex-row items-center gap-[5px]">
            <Users size={14} color={COLORS.mutedForeground} />
            <Text tone="muted" className="text-sm">
              Partagé avec le foyer · modifié le 2 oct.
            </Text>
          </View>
        </View>

        <Box>
          <Row
            subtitle="Identifiant"
            trailing={
              <SoftIconButton
                icon={copied === "login" ? Check : Copy}
                label="Copier l’identifiant"
                onPress={() => copy("login", account.login)}
              />
            }
          >
            <Text>{account.login}</Text>
          </Row>
          <Row
            subtitle="Mot de passe"
            trailing={
              <View className="flex-row gap-2">
                <SoftIconButton
                  icon={shown ? EyeOff : Eye}
                  label={shown ? "Masquer" : "Afficher"}
                  onPress={() => setShown((s) => !s)}
                />
                <SoftIconButton
                  icon={copied === "password" ? Check : Copy}
                  label="Copier le mot de passe"
                  onPress={() => copy("password", DEMO_PASSWORD)}
                />
              </View>
            }
          >
            <Text className={shown ? undefined : "tracking-[2px]"}>
              {shown ? DEMO_PASSWORD : "••••••••••••"}
            </Text>
          </Row>
          <Row
            subtitle="Code de vérification"
            trailing={
              <Ring value={0.62} size={30} stroke={3} color={COLORS.primary} />
            }
          >
            <Text
              tone="primary"
              className="text-[22px] font-semibold leading-7"
            >
              482 913
            </Text>
          </Row>
          <Row
            subtitle="Site web"
            trailing={<ExternalLink size={18} color={COLORS.primary} />}
            last
          >
            <Text tone="primary">{account.site}</Text>
          </Row>
        </Box>

        <View>
          <Caption>Accès</Caption>
          <Box>
            {account.sharedWith.map((m, i) => (
              <Row
                key={m}
                leading={<MemberAvatar id={m} size={32} />}
                title={members[m].name}
                trailing={
                  <Text tone="muted" className="text-sm">
                    {ACCESS[i] ?? "Lecture seule"}
                  </Text>
                }
              />
            ))}
            <Row
              leading={
                <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-soft">
                  <UserPlus size={16} color={COLORS.primary} />
                </View>
              }
              last
            >
              <Text tone="primary">Partager avec…</Text>
            </Row>
          </Box>
        </View>

        {account.note ? (
          <View>
            <Caption>Notes</Caption>
            <Box className="p-3.5">
              <Text>{account.note}</Text>
            </Box>
          </View>
        ) : null}

        <View>
          <Caption>Historique</Caption>
          <Box>
            <Row
              leading={<KeyRound size={20} color={COLORS.faint} />}
              title="Mot de passe changé par Camille"
              subtitle="2 octobre"
            />
            <Row
              leading={<UserPlus size={20} color={COLORS.faint} />}
              title="Jade ajoutée par Alex"
              subtitle="14 septembre"
              last
            />
          </Box>
        </View>
      </ScrollView>
    </Screen>
  );
}
