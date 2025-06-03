import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import dotenv from "dotenv";
import { SITE } from "./src/lib/config";
import { modifiedTime, readingTime } from "./src/lib/utils/remarks.mjs";
dotenv.config();

export default defineConfig({
  site: SITE.url || process.env.SITE_WEBSITE,
  base: SITE.basePath,
  output: "server",
  adapter: node({ mode: "standalone" }),
  server: {
    port: 5001,
    host: true,
  },
  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
  },
  integrations: [tailwind(), mdx(), sitemap(), pagefind(), react()],
  experimental: {
    responsiveImages: true,
  },
});
