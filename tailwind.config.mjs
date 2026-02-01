import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				xl: '1024px'
			}
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%' // required value
					}
				}
			},
			fontFamily: {
				'sans': ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
			},
			fontSize: {
				'5xl': ['3rem', { lineHeight: '1.2' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
			},
			colors: {
				// More prominent earth tone palette
				'earth': {
					50: '#faf8f5',   // warm cream white
					100: '#f3efe8',  // light cream
					200: '#e6dfd3',  // sand light
					300: '#d1c7b6',  // warm taupe light
					400: '#b5a78f',  // taupe
					500: '#96856b',  // warm brown
					600: '#7a6b54',  // earth brown
					700: '#5c503f',  // dark taupe
					800: '#3d352b',  // dark earth
					900: '#252119',  // very dark earth
					950: '#1a1714',  // near black with warmth
				},
			},
		}
	},
	plugins: [typography]
};
