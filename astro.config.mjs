// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: 'https://krr.cl',
  integrations: [starlight({"title": "krr.cl"}), react()],
  vite: {
        plugins: [tailwindcss()],
  }
});
