// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

import node from '@astrojs/node';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://marshalldoes.dev',

  integrations: [
    mdx(),
    sitemap(),
    icon(),
    compress({
      Image: false
    })
  ],

  prefetch: {
    prefetchAll: true
  },

  markdown: {
      shikiConfig: {
          theme: 'github-dark-dimmed',
      },
  },

  vite: {
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler"
            }
        }
    }
  },

  output: 'static'
});