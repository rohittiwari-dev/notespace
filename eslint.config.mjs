import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            "node_modules/",
            ".next/",
            "dist/",
            "build/",
            "public/",
            "*.config.js",
        ],
    },
	...compat.config({
		extends: ["next/core-web-vitals", "next/typescript", "prettier"],
		plugins: ["unused-imports"],
		reportUnusedDisableDirectives: true,
		rules: {
			"react/jsx-curly-brace-presence": [
				"error",
				{ props: "never", children: "never" },
			],
			"react/self-closing-comp": [
				"error",
				{ component: true, html: true },
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
				},
			],
			"unused-imports/no-unused-imports": "error",
			"prefer-template": "error",
			"@typescript-eslint/no-explicit-any": "off",
		},
	}),
];

export default eslintConfig;
