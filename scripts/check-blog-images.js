#!/usr/bin/env node

/**
 * Blog Image Checker & Auto-Fixer
 *
 * Checks external image URLs in blog post frontmatter.
 * If an image returns 404 / is unreachable, it searches Unsplash for a
 * replacement based on the post's tags/title and patches the file.
 *
 * Usage:
 *   node scripts/check-blog-images.js [file1.md file2.md ...]
 *   If no files are given, it falls back to scanning files changed in the
 *   last git commit.
 *
 * Environment variables:
 *   UNSPLASH_ACCESS_KEY  – Unsplash API access key for contextual image search.
 *                          Without it the script picks from a curated fallback list.
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Curated reliable Unsplash images for AI/tech topics
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop',
];

// --------------------------------------------------------------------------
// Frontmatter helpers
// --------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;

  const raw = match[1];
  const fields = {};

  for (const line of raw.split('\n')) {
    const m = line.match(/^(\w+):\s*['"]?(.*?)['"]?\s*$/);
    if (m) fields[m[1]] = m[2];
  }

  // Parse array field: tags: ['a', 'b']
  const tagsMatch = raw.match(/^tags:\s*\[([^\]]*)\]/m);
  if (tagsMatch) {
    fields.tags = tagsMatch[1]
      .split(',')
      .map(t => t.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return fields;
}

function replaceImageField(content, newUrl) {
  return content.replace(
    /^(image:\s*)(['"]?)([^'"\n]+)(['"]?)\s*$/m,
    `$1'${newUrl}'`,
  );
}

// --------------------------------------------------------------------------
// HTTP helpers
// --------------------------------------------------------------------------

async function isUrlReachable(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    let response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    // Some CDNs reject HEAD – retry with GET + Range
    if (response.status === 405) {
      response = await fetch(url, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
        signal: controller.signal,
        redirect: 'follow',
      });
    }

    return response.ok || response.status === 206;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}

// --------------------------------------------------------------------------
// Image search / replacement
// --------------------------------------------------------------------------

function buildSearchQuery(fields) {
  const parts = [];

  if (Array.isArray(fields.tags)) {
    // Prefer tags that look English (no German umlauts)
    const englishLike = fields.tags
      .filter(t => !/[äöüÄÖÜß]/.test(t))
      .slice(0, 3);
    parts.push(...englishLike);
  }

  if (parts.length === 0) {
    const title = (fields.title || '').replace(/['"]/g, '');
    parts.push(...title.split(/\s+/).slice(0, 4));
  }

  parts.push('technology');

  return parts.join(' ').trim();
}

async function searchUnsplash(query) {
  if (!UNSPLASH_ACCESS_KEY) return null;

  const searchUrl =
    `https://api.unsplash.com/search/photos` +
    `?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;

  try {
    const response = await fetch(searchUrl, {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });

    if (!response.ok) {
      console.warn(`  ⚠️  Unsplash API: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const photo = (data.results || [])[0];
    if (!photo) return null;

    // Use the raw URL with sizing parameters for consistent dimensions
    return `${photo.urls.raw}&w=1200&h=630&fit=crop&auto=format`;
  } catch (err) {
    console.warn(`  ⚠️  Unsplash error: ${err.message}`);
    return null;
  }
}

function pickFallbackImage(filePath) {
  // Deterministic pick so the same post always gets the same fallback
  let hash = 0;
  for (let i = 0; i < filePath.length; i++) {
    hash = (hash * 31 + filePath.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

async function findReplacementImage(filePath, fields) {
  if (UNSPLASH_ACCESS_KEY) {
    const query = buildSearchQuery(fields);
    console.log(`  🔍 Unsplash search: "${query}"`);
    const found = await searchUnsplash(query);
    if (found) return found;
    console.log(`  ⚠️  No result – using curated fallback`);
  } else {
    console.log(`  ℹ️  No UNSPLASH_ACCESS_KEY – using curated fallback`);
  }

  return pickFallbackImage(filePath);
}

// --------------------------------------------------------------------------
// Per-file processing
// --------------------------------------------------------------------------

async function processFile(filePath) {
  const absPath = path.resolve(filePath);

  if (!fs.existsSync(absPath)) {
    console.log(`⏭️  Skip (not found): ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(absPath, 'utf8');
  const fields = parseFrontmatter(content);

  if (!fields) {
    console.log(`⏭️  Skip (no frontmatter): ${filePath}`);
    return false;
  }

  const imageUrl = fields.image;

  if (!imageUrl || !imageUrl.startsWith('http')) {
    console.log(`⏭️  Skip (no external image): ${path.dirname(filePath).split('/').pop()}`);
    return false;
  }

  const label = path.dirname(filePath).split('/').pop();
  process.stdout.write(`🔗 ${label} … `);

  const reachable = await isUrlReachable(imageUrl);

  if (reachable) {
    console.log(`✅ OK`);
    return false;
  }

  console.log(`❌ 404 / unreachable`);
  console.log(`  📷 Old: ${imageUrl}`);

  const replacement = await findReplacementImage(filePath, fields);
  console.log(`  ✅ New: ${replacement}`);

  const updated = replaceImageField(content, replacement);
  fs.writeFileSync(absPath, updated, 'utf8');
  console.log(`  💾 Saved: ${filePath}`);

  return true;
}

// --------------------------------------------------------------------------
// Input: collect files to check
// --------------------------------------------------------------------------

function getChangedFilesFromGit() {
  // Try committed changes first, then staged changes as fallback
  const strategies = [
    () =>
      execFileSync('git', ['diff', '--name-only', 'HEAD~1', 'HEAD', '--', 'src/pages/blog/'], {
        encoding: 'utf8',
      }),
    () =>
      execFileSync('git', ['diff', '--name-only', '--cached', '--', 'src/pages/blog/'], {
        encoding: 'utf8',
      }),
  ];

  for (const attempt of strategies) {
    try {
      const output = attempt();
      const files = output
        .trim()
        .split('\n')
        .filter(f => f.endsWith('.md') && f.startsWith('src/pages/blog/'));
      if (files.length > 0) return files;
    } catch {
      // try next strategy
    }
  }

  return [];
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------

async function main() {
  let files = process.argv.slice(2);

  if (files.length === 0) {
    files = getChangedFilesFromGit();

    if (files.length === 0) {
      console.log('ℹ️  No blog post files to check.');
      return;
    }
  }

  console.log(`\n🖼️  Checking images in ${files.length} blog post(s)…\n`);

  let fixed = 0;
  for (const file of files) {
    const wasFixed = await processFile(file);
    if (wasFixed) fixed++;
  }

  console.log(`\n📊 Done: ${fixed}/${files.length} image(s) replaced.`);

  // Exit code 2 signals to the workflow that files changed
  if (fixed > 0) {
    process.exitCode = 2;
  }
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
