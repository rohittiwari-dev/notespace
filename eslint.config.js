import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	resolvePluginsRelativeTo: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const eslintConfig = defineConfig([
	{
		ignores: [
			'node_modules/',
			'.next/',
			'dist/',
			'build/',
			'public/',
			'*.config.js',
		],
	},
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'eslint:recommended',
			'plugin:@next/next/recommended',
			'next',
			'next/typescript',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended-legacy',
			'plugin:react/recommended',
		],
		reportUnusedDisableDirectives: true,
		rules: {
			'react/jsx-curly-brace-presence': [
				'error',
				{ props: 'never', children: 'never' },
			],
			'react/self-closing-comp': [
				'error',
				{ component: true, html: true },
			],
			'@typescript-eslint/no-unused-vars': [
				'off',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
				},
			],
			'prefer-template': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'no-empty-pattern': 'off',
			'no-extra-boolean-cast': 'off',
			'no-async-promise-executor': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'--no-ignore': 'off',
		},
	}),
	eslintConfigPrettier,
]);

export default eslintConfig;
