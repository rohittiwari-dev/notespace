import path from 'path';
import { fileURLToPath } from 'url';

import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import * as regexpPlugin from 'eslint-plugin-regexp';
import pluginSecurity from 'eslint-plugin-security';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	resolvePluginsRelativeTo: __dirname,
});

export default tseslint.config(
	{
		ignores: ['.next'],
	},
	// Base configurations
	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,

	// Next.js / React
	...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
	...fixupConfigRules(compat.extends('plugin:react/recommended')),
	...fixupConfigRules(compat.extends('plugin:react-hooks/recommended')),
	...fixupConfigRules(compat.extends('plugin:jsx-a11y/strict')),

	// Other plugins
	comments.recommended,
	regexpPlugin.configs['flat/recommended'],
	pluginSecurity.configs.recommended,
	eslintConfigPrettier,

	// JSDoc plugin only for TypeScript files
	{
		files: ['**/*.{ts,tsx}'],
		extends: [jsdoc.configs['flat/recommended-typescript-error']],
	},

	// Settings and rule overrides
	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2024,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					vars: 'all',
					args: 'after-used',
					destructuredArrayIgnorePattern: '^_',
				},
			],
			'react/self-closing-comp': [
				'error',
				{ component: true, html: true },
			],

			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],

			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: { attributes: false } },
			],

			'@typescript-eslint/non-nullable-type-assertion-style': 'off',

			'@typescript-eslint/dot-notation': 'off',

			'react/jsx-curly-brace-presence': [
				'error',
				{ props: 'never', children: 'never' },
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',

			// security
			'security/detect-non-literal-fs-filename': 'off',

			// we're not building a library here
			'jsdoc/require-jsdoc': 'off',
			'jsdoc/require-param-description': 'off',
			'prefer-template': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'jsx-a11y/anchor-has-content': 'off',
			'security/detect-object-injection': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
	},
);
