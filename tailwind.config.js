const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: [
          "Outfit_400Regular",
          "Outfit_500Medium",
          "Outfit_600SemiBold",
          "Outfit_700Bold",
        ],
        inter: [
          "Inter_400Regular",
          "Inter_500Medium",
          "Inter_600SemiBold",
          "Inter_700Bold",
        ],
        // One family per weight: React Native cannot synthesise weights of a custom font.
        "inter-regular": ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
      fontSize: {
        // Titres
        h1: [
          "32px",
          { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "700" },
        ],
        h2: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "1.5", fontWeight: "600" }],
        h4: ["20px", { lineHeight: "1.5", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        h6: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
      },
      colors: {
        // LivOpty palette (Paylix): see lib/theme.ts
        brand: { DEFAULT: "#9768FE", soft: "#F4EFFF" },
        ink: "#000000",
        mute: "#666666",
        faint: "#8E8E93",
        line: "#E5E5EA",
        fill: "#EEEEF0",
        surface: "#F6F6F8",
        cat: { blue: "#5B9EF0", green: "#6CC27A", orange: "#E57B33", red: "#FF6B6B", teal: "#4FB7C5", yellow: "#F5B82E", grey: "#8E8E93" },
        ok: "#34C759",
        danger: "#FF3B30",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
