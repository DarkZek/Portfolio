// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

import node from '@astrojs/node';

import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://astro.build/config
export default defineConfig({
  site: 'https://marshalldoes.dev',
  integrations: [mdx(), sitemap(), icon()],

  prefetch: {
    prefetchAll: true
  },

  markdown: {
      shikiConfig: {
          theme: 'github-dark-dimmed',
      },
  },

  vite: {
    plugins: [
      wasm(),
      topLevelAwait()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler"
            }
        }
    },
  },

  output: 'server',

  adapter: node({
    mode: 'standalone',
  }),
});