import { router } from "expo-router";
import {
  Check,
  CircleCheck,
  Copy,
  Eye,
  EyeOff,
  Folder,
  FolderSync,
  Hash,
  KeyRound,
  Lock,
  QrCode,
  Wifi,
  type LucideIcon,
} from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  AddButton,
  AvatarStack,
  NavBar,
  Row,
  Screen,
  SearchField,
  SectionHeader,
  SoftIconButton,
  Tile,
} from "~/components/screen";
import { Text } from "~/components/ui/text";
import { CATEGORY_COLORS, COLORS, ROUTES } from "~/lib/constants";
import {
  driveFolders,
  homeCodes,
  sharedAccounts,
  vaultCounts,
  type HomeCode,
} from "~/lib/data/household";
import { useCopied } from "~/lib/hooks/useCopied";

function CountTile({
  icon: Icon,
  color,
  value,
  label,
}: {
  icon: LucideIcon;
  color: string;
  value: number;
  label: string;
}) {
  return (
    <View className="grow basis-[45%] gap-2 rounded-[14px] bg-muted p-3">
      <View className="flex-row items-start justify-between">
        <View
          className="h-[34px] w-[34px] items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon size={18} color={COLORS.primaryForeground} strokeWidth={2.2} />
        </View>
        <Text variant="title">{value}</Text>
      </View>
      <Text tone="muted" className="text-[15px] font-semibold">
        {label}
      </Text>
    </View>
  );
}

function CodeRow({ code, last }: { code: HomeCode; last: boolean }) {
  const [shown, setShown] = React.useState(false);
  const { copied, copy } = useCopied();
  const masked = code.code.replace(/[0-9]/g, "•");

  return (
    <Row
      leading={
        <Tile icon={code.icon} color={code.color} size={36} radius={9} />
      }
      title={code.name}
      last={last}
      trailing={
        <View className="flex-row gap-2">
          <SoftIconButton
            icon={code.qr ? QrCode : shown ? EyeOff : Eye}
            label={
              code.qr ? "Afficher le QR code" : shown ? "Masquer" : "Afficher"
            }
            onPress={() => setShown((s) => !s)}
          />
          <SoftIconButton
            icon={copied === code.id ? Check : Copy}
            label="Copier"
            onPress={() => copy(code.id, code.code)}
          />
        </View>
      }
    >
      {code.hint ? (
        <Text tone="muted" className="text-sm">
          {code.hint}
        </Text>
      ) : (
        <Text
          className={shown ? "mt-px font-semibold" : "mt-px tracking-[2px]"}
        >
          {shown ? code.code : masked}
        </Text>
      )}
    </Row>
  );
}

export default function Vault() {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const accounts = sharedAccounts
    .filter((a) => a.name.toLowerCase().includes(q))
    .slice(0, q ? undefined : 3);
  const codes = homeCodes.filter((c) => c.name.toLowerCase().includes(q));

  return (
    <Screen>
      <NavBar
        back="Accueil"
        right={
          <>
            <Lock size={22} color={COLORS.primary} />
            <AddButton />
          </>
        }
      />
      <View className="px-4">
        <Text variant="display">Coffre-fort</Text>
        <SearchField
          placeholder="Comptes, codes, fichiers"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ScrollView
        contentContainerClassName="pb-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-2.5 px-4">
          <CountTile
            icon={KeyRound}
            color={CATEGORY_COLORS.brand}
            value={vaultCounts.accounts}
            label="Comptes"
          />
          <CountTile
            icon={Hash}
            color={CATEGORY_COLORS.orange}
            value={vaultCounts.codes}
            label="Codes"
          />
          <CountTile
            icon={Wifi}
            color={CATEGORY_COLORS.blue}
            value={vaultCounts.wifi}
            label="Wi-Fi"
          />
          <CountTile
            icon={FolderSync}
            color={CATEGORY_COLORS.green}
            value={vaultCounts.files}
            label="Fichiers"
          />
        </View>

        <SectionHeader
          title="Partagé avec le foyer"
          action="Tout voir"
          className="mt-6"
        />
        {accounts.map((a, i) => (
          <Row
            key={a.id}
            leading={
              <View
                className="h-9 w-9 items-center justify-center rounded-[9px]"
                style={{ backgroundColor: a.tint }}
              >
                <Text tone="inverse" className="text-[17px] font-bold">
                  {a.letter}
                </Text>
              </View>
            }
            title={a.name}
            subtitle={a.login}
            trailing={<AvatarStack ids={a.sharedWith} size={22} />}
            chevron
            last={i === accounts.length - 1}
            onPress={() => router.push(ROUTES.VAULT_ACCOUNT(a.id))}
          />
        ))}

        <SectionHeader title="Codes de la maison" className="mt-6" />
        {codes.map((c, i) => (
          <CodeRow key={c.id} code={c} last={i === codes.length - 1} />
        ))}

        <View className="mb-1.5 mt-6 flex-row items-center justify-between px-4">
          <Text variant="title" className="text-xl">
            Fichiers
          </Text>
          <View className="flex-row items-center gap-[5px]">
            <CircleCheck size={14} color={COLORS.success} />
            <Text variant="caption" tone="success" className="text-[13px]">
              Google Drive · à jour
            </Text>
          </View>
        </View>
        {driveFolders.map((f, i) => (
          <Row
            key={f.id}
            leading={<Tile icon={Folder} color="green" size={36} radius={9} />}
            title={f.name}
            subtitle={`${f.files} fichiers · ${f.sync}`}
            subtitleClassName={
              f.sync.includes("attente") ? "text-primary" : undefined
            }
            chevron
            last={i === driveFolders.length - 1}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
