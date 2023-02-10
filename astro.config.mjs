import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './remark-reading-time.mjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://gothink.dev',
  markdown: {
    shikiConfig: {
      theme: 'material-palenight'
    },
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      }],
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), vue()]
});