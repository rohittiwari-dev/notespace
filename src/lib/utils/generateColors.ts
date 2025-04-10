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
