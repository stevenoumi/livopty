import { CheckCheck } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { Txt } from "~/components/lv";
import { colors } from "~/lib/theme";

interface TextChatProps {
  message: string;
  isSent: boolean;
  time?: string;
  isRead?: boolean;
}

/** Chat bubble: purple when sent (with time and read ticks), light grey when received. */
export default function TextChat({ message, isSent, time, isRead = true }: TextChatProps) {
  return (
    <View
      style={{
        maxWidth: "75%",
        alignSelf: isSent ? "flex-end" : "flex-start",
        backgroundColor: isSent ? colors.brand : colors.bubble,
        borderRadius: 16,
        paddingHorizontal: 13,
        paddingVertical: 9,
        marginVertical: 4,
      }}
    >
      <Txt size={16} tone={isSent ? "white" : "ink"} style={{ lineHeight: 22 }}>{message}</Txt>
      {isSent ? (
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 10, marginTop: 4 }}>
          {time ? <Txt size={11.5} color="rgba(255,255,255,.75)">{time}</Txt> : null}
          <CheckCheck size={15} color={isRead ? colors.white : "rgba(255,255,255,.6)"} strokeWidth={1.5} />
        </View>
      ) : null}
    </View>
  );
}
