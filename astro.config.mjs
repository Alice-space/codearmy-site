import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alice-space.github.io",
  base: "/codearmy-site",
  trailingSlash: "always",
  integrations: [sitemap()]
});
