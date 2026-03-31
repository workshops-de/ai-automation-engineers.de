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
      
      serialize: (item) => {
        // Highest priority for main news page - most important landing page
        if (item.url.endsWith('/news/')) {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Higher priority for news posts
        else if (item.url.includes('/news')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Legacy blog redirects (lower priority)
        else if (item.url.includes('/blog')) {
          item.priority = 0.3;
          item.changefreq = 'never';
        }
        // Medium priority for profile pages - they're important content
        if (item.url.includes('/profile')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Lower priority for index pages
        if ( item.url.endsWith('/learning') || item.url.endsWith('/training')) {
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