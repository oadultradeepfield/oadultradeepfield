import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astroPlugin, * as js from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['dist', 'node_modules', '.astro', 'build']
	},
	{
		languageOptions: {
			parser: tsparser,
			ecmaVersion: 2024,
			sourceType: 'module'
		},
		plugins: {
			'@typescript-eslint': tseslint,
			astro: astroPlugin
		},
		rules: {
			...js.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			...astroPlugin.configs.recommended.rules,
			...prettier.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		files: ['**/*.astro'],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tsparser
			}
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// custom TS rules can go here
		}
	}
];
