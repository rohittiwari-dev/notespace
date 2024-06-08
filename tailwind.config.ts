import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontSize: {
				base: "1rem",
				lg: "1.125rem",
				xl: "1.5625rem",
				"2xl": "1.625rem",
				"3xl": "2.1875rem",
				"4xl": "2.8125rem",
				"5xl": "3.4375rem",
				"6xl": "4.0625rem",
			},
			screens: {
				xs: "340px",
			},
			colors: {
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
				"washed-blue-50": "#f0f3ff",
				"washed-blue-100": "#d0daff",
				"washed-blue-200": "#bac9ff",
				"washed-blue-300": "#9ab0ff",
				"washed-blue-400": "#86a1ff",
				"washed-blue-500": "#6889ff",
				"washed-blue-600": "#5f7de8",
				"washed-blue-700": "#4a61b5",
				"washed-blue-800": "#394b8c",
				"washed-blue-900": "#2c3a6b",
				"washed-purple-50": "#f8f7ff",
				"washed-purple-100": "#e8e7ff",
				"washed-purple-200": "#dddcff",
				"washed-purple-300": "#cecbff",
				"washed-purple-400": "#c5c1ff",
				"washed-purple-500": "#b6b2ff",
				"washed-purple-600": "#a6a2e8",
				"washed-purple-700": "#817eb5",
				"washed-purple-800": "#64628c",
				"washed-purple-900": "#4c4b6b",
				"primary-blue-50": "#e6f0ff",
				"primary-blue-100": "#b2d1ff",
				"primary-blue-200": "#8cbaff",
				"primary-blue-300": "#589bff",
				"primary-blue-400": "#3787ff",
				"primary-blue-500": "#0569ff",
				"primary-blue-600": "#0560e8",
				"primary-blue-700": "#044bb5",
				"primary-blue-800": "#033a8c",
				"primary-blue-900": "#022c6b",
				"primary-purple-50": "#f1e6ff",
				"primary-purple-100": "#d3b0ff",
				"primary-purple-200": "#bd8aff",
				"primary-purple-300": "#9f54ff",
				"primary-purple-400": "#8d33ff",
				"primary-purple-500": "#7000ff",
				"primary-purple-600": "#6600e8",
				"primary-purple-700": "#5000b5",
				"primary-purple-800": "#3e008c",
				"primary-purple-900": "#2f006b",
				"Neutrals/neutrals-1": "#ffffff",
				"Neutrals/neutrals-2": "#fcfcfd",
				"Neutrals/neutrals-3": "#f5f5f6",
				"Neutrals/neutrals-4": "#f0f0f1",
				"Neutrals/neutrals-5": "#d9d9dc",
				"Neutrals/neutrals-6": "#c0bfc4",
				"Neutrals/neutrals-7": "#8d8c95",
				"Neutrals/neutrals-8": "#5b5966",
				"Neutrals/neutrals-9": "#464553",
				"Neutrals/neutrals-10": "#282637",
				"Neutrals/neutrals-11": "#201f30",
				"Neutrals/neutrals-12": "#161427",
				"Neutrals/neutrals-13": "#020014",
				"brand-washedPurple": "#b5b2ff",
				"brand-washedBlue": "#6889ff",
				"brand-primaryBlue": "#0469ff",
				"brand-primaryPurple": "#7000ff",
				"brand-dark": "#030014",
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
				"animate-slide": {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: " translateX(-100%)",
					},
				},
				"scroll-left": {
					to: {
						left: "-200px",
					},
				},
				"scroll-right": {
					to: {
						right: "-200px",
					},
				},
			},
			dropShadow: {
				glow: [
					"0 0px 20px rgba(255,255, 255, 0.35)",
					"0 0px 65px rgba(255, 255,255, 0.2)",
				],
			},
			maskImage: {
				"gradient-r":
					"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"accordion-scroll-left": "scroll-left 30s linear infinite",
				"accordion-scroll-right": "scroll-right 30s linear infinite",
			},
			backgroundImage: {
				"custom-radial":
					"radial-gradient(rgb(64, 52, 85) 1px, transparent 0)",
			},
			backgroundSize: {
				"40": "40px 40px",
				"20": "20px 20px",
				"10": "10px 10px",
				"30": "30px 30px",
				"35": "35px 35px",
			},
			backgroundPosition: {
				"-pos-19": "-19px -19px",
				"pos-19": "19px 19px",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), oppositeGradientPlugin],
} satisfies Config;

function oppositeGradientPlugin({
	addUtilities,
}: {
	addUtilities: (utilities: Record<string, any>, variants?: string[]) => void;
}) {
	const newUtilities = {
		".mask-gradient-r": {
			maskImage:
				"linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))",
		},
	};

	addUtilities(newUtilities, ["responsive", "hover"]);
}

export default config;
