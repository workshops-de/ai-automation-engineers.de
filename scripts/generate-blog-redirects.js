#!/usr/bin/env node

/**
 * Generate static redirect pages for all blog articles
 * Creates individual .astro files with 301 redirects from /blog/* to /news/*
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRedirectPage(articlePath, targetPath) {
  const redirectContent = `---
// 301 Redirect from ${articlePath} to ${targetPath}
return Astro.redirect('${targetPath}', 301);
---`;

  return redirectContent;
}

function main() {
  const newsDir = path.join(process.cwd(), 'src', 'pages', 'news');
  const blogDir = path.join(process.cwd(), 'src', 'pages', 'blog');

  if (!fs.existsSync(newsDir)) {
    console.error('❌ News directory not found');
    process.exit(1);
  }

  // Get all article directories from news
  const articleDirs = fs.readdirSync(newsDir)
    .filter(dir => {
      const fullPath = path.join(newsDir, dir);
      return fs.statSync(fullPath).isDirectory() && dir.match(/^\d{4}-\d{2}-\d{2}-/);
    });

  console.log(`🔄 Generating redirects for ${articleDirs.length} articles...`);

  let generatedCount = 0;

  articleDirs.forEach(articleDir => {
    const blogArticlePath = path.join(blogDir, articleDir);
    const indexPath = path.join(blogArticlePath, 'index.astro');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(blogArticlePath)) {
      fs.mkdirSync(blogArticlePath, { recursive: true });
    }

    const redirectContent = generateRedirectPage(
      `/blog/${articleDir}/`,
      `/news/${articleDir}/`
    );

    fs.writeFileSync(indexPath, redirectContent, 'utf8');
    generatedCount++;
  });

  console.log(`✅ Generated ${generatedCount} redirect pages`);
  console.log('📁 Redirects created in: src/pages/blog/*/index.astro');
}

main();