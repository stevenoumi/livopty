import * as Slot from "@rn-primitives/slot";
import type { SlottableTextProps, TextRef } from "@rn-primitives/types";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "~/lib/utils";

// The type scale of the app. Screens pick a role, never a raw size, so the
// whole hierarchy can be retuned here. See docs/DESIGN_SYSTEM.md.
const textVariants = cva("font-sans web:select-text", {
  variants: {
    variant: {
      display: "text-3xl leading-9 font-bold",
      title: "text-2xl leading-8 font-bold",
      heading: "text-lg leading-6 font-semibold",
      body: "text-base leading-6",
      label: "text-sm leading-5 font-medium",
      caption: "text-xs leading-4",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-success",
      inverse: "text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
    tone: "default",
  },
});

// Lets a parent (a Button) restyle the Text it contains.
const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = SlottableTextProps & VariantProps<typeof textVariants>;

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, asChild = false, variant, tone, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(textVariants({ variant, tone }), textClass, className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, TextClassContext, textVariants };
export type { TextProps };
