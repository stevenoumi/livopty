import { AlertCircle } from "lucide-react-native";
import * as React from "react";
import { Pressable, TextInput, View } from "react-native";
import { Text } from "~/components/ui/text";
import { COLORS, VALIDATION } from "~/lib/constants";
import { cn } from "~/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  autoFocus?: boolean;
};

// A single hidden input drives the boxes: one field per digit breaks pasting
// a whole code and the OS one-time-code autofill.
export function OtpInput({
  value,
  onChange,
  length = VALIDATION.OTP.LENGTH,
  error,
  autoFocus = true,
}: OtpInputProps) {
  const inputRef = React.useRef<TextInput>(null);
  const [focused, setFocused] = React.useState(false);

  return (
    <View>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        className="flex-row justify-center gap-2"
        accessibilityRole="none"
      >
        {Array.from({ length }, (_, index) => {
          const isCurrent =
            focused && index === Math.min(value.length, length - 1);
          return (
            <View
              key={index}
              className={cn(
                "h-14 max-w-12 flex-1 items-center justify-center rounded-xl bg-muted",
                error
                  ? "border-2 border-destructive"
                  : isCurrent
                    ? "border-2 border-primary"
                    : "border border-border",
              )}
            >
              <Text className="text-2xl font-semibold text-foreground">
                {value[index] ?? ""}
              </Text>
            </View>
          );
        })}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(text) =>
            onChange(text.replace(/\D/g, "").slice(0, length))
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={length}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          autoFocus={autoFocus}
          caretHidden
          accessibilityLabel={`Code à ${length} chiffres`}
          className="absolute inset-0 opacity-0"
        />
      </Pressable>
      {error ? (
        <View className="mt-2 flex-row items-center justify-center gap-1">
          <AlertCircle size={14} color={COLORS.destructive} />
          <Text className="text-xs text-destructive">{error}</Text>
        </View>
      ) : null}
    </View>
  );
}
