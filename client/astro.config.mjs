// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://marshalldoes.dev',
    integrations: [mdx(), sitemap(), icon()],
    markdown: {
        shikiConfig: {
            theme: 'github-dark-dimmed',
        },
    },
});