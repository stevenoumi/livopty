import {
  Bell,
  Cloud,
  Euro,
  House,
  Languages,
  LogOut,
  Moon,
  Pencil,
  ScanFace,
  UserPlus,
} from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  Box,
  Caption,
  MemberAvatar,
  Row,
  Tile,
  Toggle,
} from "~/components/screen";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { useAuth } from "~/lib/context/AuthContext";
import { household, householdMembers, ME, members } from "~/lib/data/household";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Settings() {
  const { user, signOut } = useAuth();
  const [faceId, setFaceId] = React.useState(true);
  const name = user?.user_metadata?.name ?? "";
  const email = user?.email ?? "";

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-[22px] pb-10"
      showsVerticalScrollIndicator={false}
    >
      <Text variant="display" className="px-4">
        Paramètres
      </Text>

      {/* The signed-in account, from Supabase. */}
      <View className="mx-4 flex-row items-center gap-3.5 rounded-2xl bg-muted p-4">
        <Avatar alt={name || email} className="h-14 w-14">
          <AvatarFallback className="bg-primary-soft">
            <Text tone="primary" className="font-semibold">
              {getInitials(name || email)}
            </Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex-1">
          {name ? <Text variant="heading">{name}</Text> : null}
          <Text tone="muted" className="text-sm">
            {email}
          </Text>
        </View>
      </View>

      {/* Household: demo data until the households table exists. */}
      <View>
        <Caption>Foyer</Caption>
        <Box>
          <Row
            leading={
              <View className="h-[38px] w-[38px] items-center justify-center rounded-xl bg-primary">
                <House size={20} color={COLORS.primaryForeground} />
              </View>
            }
            title={household.name}
            subtitle={`${householdMembers.length} membres · créé en ${household.since}`}
            trailing={<Pencil size={18} color={COLORS.primary} />}
          />
          {householdMembers.map((id) => (
            <Row
              key={id}
              leading={<MemberAvatar id={id} size={38} />}
              title={
                id === ME ? `${members[id].name} (vous)` : members[id].name
              }
              subtitle={members[id].role}
              chevron={id !== ME}
            />
          ))}
          <Row
            leading={
              <View className="h-[38px] w-[38px] items-center justify-center rounded-full bg-primary-soft">
                <UserPlus size={19} color={COLORS.primary} />
              </View>
            }
            last
          >
            <Text tone="primary">Inviter un membre</Text>
          </Row>
        </Box>
      </View>

      <View>
        <Caption>Préférences</Caption>
        <Box>
          <Row
            leading={<Tile icon={Bell} color="brand" size={30} radius={8} />}
            title="Notifications"
            trailing={<Text tone="muted">Activées</Text>}
            chevron
          />
          <Row
            leading={<Tile icon={Euro} color="green" size={30} radius={8} />}
            title="Devise"
            trailing={<Text tone="muted">EUR</Text>}
            chevron
          />
          <Row
            leading={
              <Tile icon={Languages} color="blue" size={30} radius={8} />
            }
            title="Langue"
            trailing={<Text tone="muted">Français</Text>}
            chevron
          />
          <Row
            leading={
              <Tile icon={ScanFace} color="orange" size={30} radius={8} />
            }
            title="Face ID pour le coffre"
            trailing={
              <Toggle
                on={faceId}
                onChange={setFaceId}
                label="Face ID pour le coffre"
              />
            }
          />
          <Row
            leading={<Tile icon={Cloud} color="green" size={30} radius={8} />}
            title="Google Drive"
            trailing={<Text tone="success">Connecté</Text>}
            chevron
          />
          <Row
            leading={<Tile icon={Moon} color="grey" size={30} radius={8} />}
            title="Apparence"
            trailing={<Text tone="muted">Clair</Text>}
            chevron
            last
          />
        </Box>
      </View>

      <View className="px-4">
        <Button variant="outline" onPress={signOut}>
          <LogOut size={19} color={COLORS.destructive} />
          <Text tone="destructive">Se déconnecter</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
