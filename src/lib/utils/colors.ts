function shuffleArray<T>(arr: T[]): T[] {
	return [...arr].sort(() => Math.random() - arr.length / 2);
}

export const getRandomTailwindBackground400ShadeColor = () => {
	let colors = [
		'text-red-400',
		'text-orange-400',
		'text-amber-400',
		'text-yellow-400',
		'text-lime-400',
		'text-green-400',
		'text-emerald-400',
		'text-teal-400',
		'text-cyan-400',
		'text-sky-400',
		'text-blue-400',
		'text-indigo-400',
		'text-violet-400',
		'text-purple-400',
		'text-fuchsia-400',
		'text-pink-400',
		'text-rose-400',
		'text-red-600',
		'text-orange-600',
		'text-amber-600',
		'text-yellow-600',
		'text-lime-600',
		'text-green-600',
		'text-emerald-600',
		'text-teal-600',
		'text-cyan-600',
		'text-sky-600',
		'text-blue-600',
		'text-indigo-600',
		'text-violet-600',
		'text-purple-600',
		'text-fuchsia-600',
		'text-pink-600',
		'text-rose-600',
		'text-red-500',
		'text-orange-500',
		'text-amber-500',
		'text-yellow-500',
		'text-lime-500',
		'text-green-500',
		'text-emerald-500',
		'text-teal-500',
		'text-cyan-500',
		'text-sky-500',
		'text-blue-500',
		'text-indigo-500',
		'text-violet-500',
		'text-purple-500',
		'text-fuchsia-500',
		'text-pink-500',
		'text-rose-500',
	];

	if (colors.length > 0) {
		colors = shuffleArray(colors);
	}
	const randomIdx = Math.floor(Math.random() * colors.length);
	return colors[randomIdx];
};

export const getRandomTailwindText400ShadeColor = () => {
	let colors = [
		'text-red-400',
		'text-orange-400',
		'text-amber-400',
		'text-yellow-400',
		'text-lime-400',
		'text-green-400',
		'text-emerald-400',
		'text-teal-400',
		'text-cyan-400',
		'text-sky-400',
		'text-blue-400',
		'text-indigo-400',
		'text-violet-400',
		'text-purple-400',
		'text-fuchsia-400',
		'text-pink-400',
		'text-rose-400',
		'text-red-600',
		'text-orange-600',
		'text-amber-600',
		'text-yellow-600',
		'text-lime-600',
		'text-green-600',
		'text-emerald-600',
		'text-teal-600',
		'text-cyan-600',
		'text-sky-600',
		'text-blue-600',
		'text-indigo-600',
		'text-violet-600',
		'text-purple-600',
		'text-fuchsia-600',
		'text-pink-600',
		'text-rose-600',
		'text-red-500',
		'text-orange-500',
		'text-amber-500',
		'text-yellow-500',
		'text-lime-500',
		'text-green-500',
		'text-emerald-500',
		'text-teal-500',
		'text-cyan-500',
		'text-sky-500',
		'text-blue-500',
		'text-indigo-500',
		'text-violet-500',
		'text-purple-500',
		'text-fuchsia-500',
		'text-pink-500',
		'text-rose-500',
	];

	if (colors.length > 0) {
		colors = shuffleArray(colors);
	}
	const randomIdx = Math.floor(Math.random() * colors.length);
	return colors[randomIdx];
};

export function getCssVariableValue(variableName: string) {
	if (typeof document !== 'undefined') {
		return getComputedStyle(document?.documentElement)
			.getPropertyValue(variableName)
			.trim();
	}
	return '';
}

export function getColorFromClass(className: string, cssProperty = 'color') {
	if (typeof document !== 'undefined') {
		const el = document?.createElement('div');
		el.className = className;
		el.style.display = 'none'; // Hide element
		document?.body.appendChild(el);

		const colorValue = (getComputedStyle(el) as any)?.[cssProperty];
		document?.body.removeChild(el);

		return colorValue;
	}
	return '';
}

export function getTailwindColor(utilityClass: string) {
	if (typeof document !== 'undefined') {
		const [type, ...rest] = utilityClass.split('-');
		const propertyMap = {
			bg: 'backgroundColor',
			text: 'color',
			border: 'borderColor',
			fill: 'fill',
			stroke: 'stroke',
		};

		const el = document?.createElement('div');
		el.className = utilityClass;
		document?.body?.appendChild(el);

		const value =
			(getComputedStyle(el) as any)?.[(propertyMap as any)[type]] || '';
		document?.body?.removeChild(el);

		return value;
	}
	return '';
}

export function rgbToHex(rgb: string) {
	return `#${rgb
		?.match(/\d+/g)
		?.map((x) => (+x).toString(16).padStart(2, '0'))
		.join('')}`;
}
export interface OklchComponents {
	L: number;
	C: number;
	H: number;
}

export function parseOklch(input: string): OklchComponents | null {
	if (!input) return null;

	// More flexible regex with percentage support and different separators
	const match = input.match(
		/oklch\(\s*([\d.%]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*\)/i,
	);
	if (!match) return null;

	try {
		// Handle percentage values for lightness (70% → 0.7)
		const LValue = match[1].endsWith('%')
			? parseFloat(match[1]) / 100
			: parseFloat(match[1]);

		return {
			L: clamp(LValue, 0, 1),
			C: clamp(parseFloat(match[2]), 0, 0.37), // OKLCH max chroma
			H: parseFloat(match[3]) % 360, // Normalize hue
		};
	} catch {
		return null;
	}
}

export function oklchToHex(input: string, fallback = '#ffffff'): string {
	// SSR safety
	if (typeof window === 'undefined') return fallback;

	try {
		const components = parseOklch(input);
		if (!components) return fallback;

		const { L, C, H } = components;

		// Validate after parsing
		if (L < 0 || L > 1 || C < 0 || C > 0.37) return fallback;

		// Rest of your conversion logic remains the same
		const hRad = H * (Math.PI / 180);
		const a = C * Math.cos(hRad);
		const _b = C * Math.sin(hRad);

		const l_ = L + 0.3963377774 * a + 0.2158037573 * _b;
		const m_ = L - 0.1055613458 * a - 0.0638541728 * _b;
		const s_ = L - 0.0894841775 * a - 1.291485548 * _b;

		const l = l_ ** 3;
		const m = m_ ** 3;
		const s = s_ ** 3;

		const X =
			l * 1.227013851103521 -
			m * 0.5577999806518222 +
			s * 0.2812561489664678;
		const Y =
			l * -0.04058017842328059 +
			m * 1.1122568696168302 -
			s * 0.07167667866560119;
		const Z =
			l * -0.0763812845057069 -
			m * 0.4214819784180127 +
			s * 1.586163220440795;

		const gammaCorrect = (c: number): number =>
			c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

		const rLinear =
			X * 3.240969941904521 - Y * 1.537383177570093 - Z * 0.498610760293;
		const gLinear =
			X * -0.9692436362808798 +
			Y * 1.8759675015077202 +
			Z * 0.04155505740717557;
		const bLinear =
			X * 0.05563007969699361 -
			Y * 0.2039769588889765 +
			Z * 1.0569715142428786;

		const toByte = (c: number): string =>
			clamp(Math.round(c * 255), 0, 255)
				.toString(16)
				.padStart(2, '0')
				.substring(0, 2);

		const [r, g, b] = [rLinear, gLinear, bLinear]
			.map(gammaCorrect)
			.map((c) => clamp(c, 0, 1))
			.map((c) => toByte(c));

		return `#${r}${g}${b}`;
	} catch (error) {
		console.error('Color conversion error:', error);
		return fallback;
	}
}

// Updated clamp function with type checking
export function clamp(value: number, min: number, max: number): number {
	return isNaN(value) ? min : Math.min(Math.max(value, min), max);
}
