import { router } from "expo-router";
import { Check, CircleCheck, Copy, Eye, EyeOff, Folder, FolderSync, Hash, KeyRound, Lock, QrCode, Wifi, type LucideIcon } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { AddButton, AvatarStack, NavBar, Row, Screen, SearchField, SectionHeader, SoftIconButton, Tile, Txt } from "~/components/lv";
import { driveFolders, homeCodes, sharedAccounts, vaultCounts, type HomeCode } from "~/lib/data/household";
import { colors } from "~/lib/theme";

function CountTile({ icon: Icon, color, value, label }: { icon: LucideIcon; color: string; value: number; label: string }) {
  return (
    <View style={{ flexBasis: "48%", flexGrow: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 12, gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={colors.white} strokeWidth={2.2} />
        </View>
        <Txt size={24} weight="bold" tight>{value}</Txt>
      </View>
      <Txt size={15} weight="semibold" tone="mute">{label}</Txt>
    </View>
  );
}

function CodeRow({ code, last }: { code: HomeCode; last: boolean }) {
  const [shown, setShown] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    // TODO: write to the clipboard once expo-clipboard is added.
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  const masked = code.code.replace(/[0-9]/g, "•");
  return (
    <Row
      leading={<Tile icon={code.icon} color={code.color} size={36} radius={9} />}
      title={code.name}
      last={last}
      trailing={
        <View style={{ flexDirection: "row", gap: 8 }}>
          <SoftIconButton icon={code.qr ? QrCode : shown ? EyeOff : Eye} onPress={() => setShown((s) => !s)} />
          <SoftIconButton icon={copied ? Check : Copy} onPress={copy} />
        </View>
      }
    >
      {code.hint ? (
        <Txt size={13.5} tone="mute">{code.hint}</Txt>
      ) : (
        <Txt size={16} weight={shown ? "semibold" : "regular"} style={{ letterSpacing: 2, marginTop: 1 }}>{shown ? code.code : masked}</Txt>
      )}
    </Row>
  );
}

export default function Vault() {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const accounts = sharedAccounts.filter((a) => a.name.toLowerCase().includes(q)).slice(0, q ? undefined : 3);
  const codes = homeCodes.filter((c) => c.name.toLowerCase().includes(q));

  return (
    <Screen>
      <NavBar back="Accueil" right={<><Lock size={22} color={colors.brand} /><AddButton /></>} />
      <View style={{ paddingHorizontal: 16 }}>
        <Txt size={32} weight="bold" tight>Coffre-fort</Txt>
        <SearchField placeholder="Comptes, codes, fichiers" value={query} onChangeText={setQuery} />
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 16 }}>
          <CountTile icon={KeyRound} color={colors.brand} value={vaultCounts.accounts} label="Comptes" />
          <CountTile icon={Hash} color={colors.orange} value={vaultCounts.codes} label="Codes" />
          <CountTile icon={Wifi} color={colors.blue} value={vaultCounts.wifi} label="Wi-Fi" />
          <CountTile icon={FolderSync} color={colors.green} value={vaultCounts.files} label="Fichiers" />
        </View>

        <SectionHeader title="Partagé avec le foyer" action="Tout voir" style={{ marginTop: 24 }} />
        {accounts.map((a, i) => (
          <Row
            key={a.id}
            leading={
              <View style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: a.tint, alignItems: "center", justifyContent: "center" }}>
                <Txt size={17} weight="bold" tone="white">{a.letter}</Txt>
              </View>
            }
            title={a.name}
            subtitle={a.login}
            trailing={<AvatarStack ids={a.sharedWith} size={22} />}
            chevron
            last={i === accounts.length - 1}
            onPress={() => router.push(`/vault/${a.id}`)}
          />
        ))}

        <SectionHeader title="Codes de la maison" style={{ marginTop: 24 }} />
        {codes.map((c, i) => (
          <CodeRow key={c.id} code={c} last={i === codes.length - 1} />
        ))}

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 24, marginBottom: 6 }}>
          <Txt size={20} weight="bold" tight>Fichiers</Txt>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <CircleCheck size={14} color={colors.ok} />
            <Txt size={13} tone="ok">Google Drive · à jour</Txt>
          </View>
        </View>
        {driveFolders.map((f, i) => (
          <Row
            key={f.id}
            leading={<Tile icon={Folder} color="green" size={36} radius={9} />}
            title={f.name}
            subtitle={`${f.files} fichiers · ${f.sync}`}
            subtitleTone={f.sync.includes("attente") ? "brand" : "mute"}
            chevron
            last={i === driveFolders.length - 1}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

