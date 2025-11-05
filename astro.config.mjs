import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import partytown from '@astrojs/partytown';
import mermaid from 'astro-mermaid';

export default defineConfig({
	site: 'https://phanuphats.com',
	integrations: [mdx(), sitemap(), tailwind(), partytown(), mermaid()],
	markdown: {
		remarkPlugins: [remarkMath],
		extendDefaultPlugins: true,
		rehypePlugins: [[autoNewTabExternalLinks, { domain: 'localhost:4321' }], rehypeKatex]
	}
});
