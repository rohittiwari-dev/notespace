/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
	trailingComma: 'all',
	semi: true,
	quoteProps: 'as-needed',
	printWidth: 80,
	singleQuote: true,
	tabWidth: 4,
	proseWrap: 'preserve',
	useTabs: true,
	bracketSpacing: true,
	arrowParens: 'always',
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-packagejson',
		'prettier-plugin-curly',
		'prettier-plugin-tailwindcss',
		'prettier-remove-unused-imports',
	],
	importOrder: [
		'^react$',
		'^next(-[^/]+)?(/.*)?$',
		'<TYPES>',
		'<TYPES>^[.]',
		'<BUILTIN_MODULES>',
		'<THIRD_PARTY_MODULES>',
		'^@/(.*)$',
		'^[./]',
		'^(?!.*[.]css$)[./].*$',
		'.css$',
	],
	importOrderTypeScriptVersion: '5.4.5',
};

export default config;
