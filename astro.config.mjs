// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://saadsaid158.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});