const { hairlineWidth } = require("nativewind/theme");

const token = (name) => `hsl(var(--${name}))`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    // React Native cannot pick a weight inside a custom font: each weight is
    // its own font file. Emptying fontWeight and mapping the weight names to
    // font families makes `font-bold` select Outfit_700Bold instead of asking
    // the OS to fake a bold Outfit_400Regular.
    fontWeight: {},
    extend: {
      fontFamily: {
        sans: ["Outfit_400Regular"],
        normal: ["Outfit_400Regular"],
        medium: ["Outfit_500Medium"],
        semibold: ["Outfit_600SemiBold"],
        bold: ["Outfit_700Bold"],
      },
      colors: {
        // Primitive scale from the logo (#8e28c2 at 600). Use semantic tokens
        // in components; reach for these only for illustrations or charts.
        brand: {
          50: "#f9f2fd",
          100: "#f3e5fa",
          200: "#e2c4f3",
          300: "#cd9de7",
          400: "#b779d8",
          500: "#a04acf",
          600: "#8928bd",
          700: "#721e9f",
          800: "#59167e",
          900: "#410f5c",
        },
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
          soft: token("primary-soft"),
          "soft-foreground": token("primary-soft-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        success: {
          DEFAULT: token("success"),
          foreground: token("success-foreground"),
        },
        warning: {
          DEFAULT: token("warning"),
          foreground: token("warning-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
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
