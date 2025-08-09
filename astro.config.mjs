import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ai-automation-engineers.de',
  integrations: [
    tailwind(),
    sitemap({
      // Filter out only admin areas for privacy
      filter: (page) => !page.includes('/admin/'),
      // Set appropriate change frequency and priority for SEO
      changefreq: 'weekly',
      priority: 0.7,
      // Add last modified time
      lastmod: new Date(),
      // Serialize function to remove trailing slashes for cleaner URLs
      serialize: (item) => {
        if (item.url.endsWith('/') && item.url !== 'https://ai-automation-engineers.de/') {
          item.url = item.url.slice(0, -1);
        }
        // Higher priority for blog posts
        if (item.url.includes('/blog/') && !item.url.endsWith('/blog')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Medium priority for profile pages - they're important content
        if (item.url.includes('/profile')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Lower priority for index pages
        if (item.url.endsWith('/blog') || item.url.endsWith('/learning') || item.url.endsWith('/training')) {
          item.priority = 0.6;
        }
        return item;
      }
    }),
    react()
  ],
  output: 'static',
  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }
  }
});