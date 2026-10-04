import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { TextClassContext } from "~/components/ui/text";
import { COLORS } from "~/lib/constants";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "group flex-row items-center justify-center gap-2 rounded-2xl web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
      },
      size: {
        default: "h-14 px-5",
        sm: "h-10 rounded-xl px-3",
        lg: "h-16 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-base font-semibold text-foreground web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
      },
      size: {
        default: "",
        sm: "text-sm",
        lg: "text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    // Replaces the content with a spinner and blocks presses, so a slow
    // request cannot be sent twice.
    loading?: boolean;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, loading = false, children, ...props }, ref) => {
  const disabled = props.disabled || loading;
  const onFilled =
    variant === undefined ||
    variant === null ||
    variant === "default" ||
    variant === "destructive";

  return (
    <TextClassContext.Provider
      value={cn(
        disabled && "web:pointer-events-none",
        buttonTextVariants({ variant, size }),
      )}
    >
      <Pressable
        className={cn(
          disabled && "opacity-60 web:pointer-events-none",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        role="button"
        accessibilityState={{ disabled, busy: loading }}
        {...props}
        disabled={disabled}
      >
        {loading ? (
          <ActivityIndicator
            color={onFilled ? COLORS.primaryForeground : COLORS.primary}
          />
        ) : (
          children
        )}
      </Pressable>
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
