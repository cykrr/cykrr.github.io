// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: 'https://krr.cl',
  integrations: [starlight({"title": "krr.cl"}), react()],
  i18n: {
    defaultLocale: "es", // Set Spanish as your default
    locales: ["es", "en"], // The languages you support
    routing: {
      prefixDefaultLocale: false // Keeps your Spanish site at / and English at /en/
    }
  },
  vite: {
        plugins: [tailwindcss()],
  }
});
