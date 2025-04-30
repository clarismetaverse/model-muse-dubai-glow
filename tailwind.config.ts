
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5", // Primary Purple
          foreground: "#ffffff",
          100: "#e6e0fc",
          200: "#ccc1f9",
          300: "#b3a2f7",
          400: "#9b87f5", // Primary Purple
          500: "#7d65f0",
          600: "#6347ec",
          700: "#492fe9",
          800: "#3115d0",
          900: "#2711ac",
        },
        secondary: {
          DEFAULT: "#D946EF", // Magenta Pink
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#0EA5E9", // Ocean Blue
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#403E43", // Charcoal Gray
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#1A1F2C", // Dark Purple
          foreground: "#ffffff",
        },
        dubai: {
          gold: "#D4AF37",
          sand: "#F2D2A9",
          skyline: "#1A1F2C",
          sea: "#0EA5E9",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1",
            filter: "brightness(1)"
          },
          "50%": { 
            opacity: "0.9",
            filter: "brightness(1.2)" 
          },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dubai-glow': 'linear-gradient(135deg, #D4AF37 0%, #F2D2A9 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
