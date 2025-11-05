import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import partytown from '@astrojs/partytown';

export default defineConfig({
	site: 'https://phanuphats.com',
	integrations: [mdx(), sitemap(), tailwind(), partytown()],
	markdown: {
		remarkPlugins: [remarkMath],
		extendDefaultPlugins: true,
		rehypePlugins: [[autoNewTabExternalLinks, { domain: 'localhost:4321' }], rehypeKatex]
	}
});
