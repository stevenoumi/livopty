import { CheckCheck } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";

interface TextChatProps {
  message: string;
  isSent: boolean;
  time?: string;
  isRead?: boolean;
}

/** Bubble: brand colour with time and ticks when sent, grey when received. */
export default function TextChat({
  message,
  isSent,
  time,
  isRead = true,
}: TextChatProps) {
  return (
    <View
      className={cn(
        "my-1 max-w-[75%] rounded-2xl px-[13px] py-[9px]",
        isSent ? "self-end bg-primary" : "self-start bg-secondary",
      )}
    >
      <Text tone={isSent ? "inverse" : "default"}>{message}</Text>
      {isSent ? (
        <View className="mt-1 flex-row items-center justify-end gap-2.5">
          {time ? (
            <Text variant="caption" className="text-primary-foreground/75">
              {time}
            </Text>
          ) : null}
          <CheckCheck
            size={15}
            color={COLORS.primaryForeground}
            strokeWidth={1.5}
            opacity={isRead ? 1 : 0.6}
          />
        </View>
      ) : null}
    </View>
  );
}
