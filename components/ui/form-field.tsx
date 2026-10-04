import { AlertCircle, Eye, EyeOff } from "lucide-react-native";
import * as React from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";

type FormFieldProps = TextInputProps & {
  error?: string;
  rightElement?: React.ReactNode;
};

const FormField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  FormFieldProps
>(({ error, rightElement, onFocus, onBlur, style, ...props }, ref) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <View>
      <View
        className={cn(
          "flex-row items-center rounded-2xl bg-muted",
          error
            ? "border-2 border-destructive"
            : focused
              ? "border-2 border-primary"
              : "border border-border",
        )}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={COLORS.mutedForeground}
          accessibilityLabel={props.placeholder}
          accessibilityHint={error}
          className="flex-1 bg-transparent text-foreground"
          style={[
            {
              lineHeight: 22,
              paddingVertical: 16,
              paddingHorizontal: 16,
              fontSize: 16,
              fontFamily: "Outfit_400Regular",
            },
            style,
          ]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />
        {rightElement ? <View className="pr-4">{rightElement}</View> : null}
      </View>
      {error ? (
        <View className="ml-1 mt-1.5 flex-row items-center gap-1">
          <AlertCircle size={14} color={COLORS.destructive} />
          <Text className="text-xs text-destructive">{error}</Text>
        </View>
      ) : null}
    </View>
  );
});
FormField.displayName = "FormField";

const PasswordField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  Omit<FormFieldProps, "secureTextEntry" | "rightElement">
>((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <FormField
      ref={ref}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      rightElement={
        <Pressable
          onPress={() => setVisible((value) => !value)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={
            visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
        >
          <Icon size={22} color={COLORS.mutedForeground} />
        </Pressable>
      }
      {...props}
    />
  );
});
PasswordField.displayName = "PasswordField";

export { FormField, PasswordField };
export type { FormFieldProps };
