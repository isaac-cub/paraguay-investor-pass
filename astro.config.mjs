// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://paraguayinvestorpass.com',
  integrations: [sitemap(), tina()],
  adapter: vercel(),
  vite: {
    plugins: [tinaAdminDevRedirect()]
  }
});