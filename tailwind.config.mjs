import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
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
				'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'mono': ['Space Grotesk', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				'serif': ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
			},
			fontSize: {
				'5xl': ['3rem', { lineHeight: '1.2' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
			},
			colors: {
				// Neutral gray scale
				'earth': {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e8e8e8',
					300: '#d4d4d4',
					400: '#a3a3a3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0a0a0a',
				},
			},
		}
	},
	plugins: [typography]
};
