#!/usr/bin/env node

/**
 * H1 Headers Cleanup Script
 * Removes redundant H1 headers from blog articles (first H1 after frontmatter)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanupArticleH1(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let inFrontmatter = false;
    let frontmatterEnded = false;
    let firstH1Found = false;
    let inCodeBlock = false;
    let modifiedLines = [];
    let removedH1 = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Track frontmatter boundaries
      if (line.trim() === '---') {
        if (!inFrontmatter && i === 0) {
          inFrontmatter = true;
          modifiedLines.push(line);
          continue;
        } else if (inFrontmatter && !frontmatterEnded) {
          frontmatterEnded = true;
          inFrontmatter = false;
          modifiedLines.push(line);
          continue;
        }
      }
      
      // Track code blocks (to avoid removing H1s in code)
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        modifiedLines.push(line);
        continue;
      }
      
      // If we're past frontmatter and not in code block
      if (frontmatterEnded && !inCodeBlock) {
        // Check for H1 header (single # followed by space and content)
        const h1Match = line.match(/^# (.+)$/);
        
        if (h1Match && !firstH1Found) {
          // This is the first H1 after frontmatter - likely redundant title
          firstH1Found = true;
          removedH1 = h1Match[1];
          
          // Skip this line (don't add to modifiedLines)
          console.log(`📝 Removing H1: "${removedH1}" from ${path.basename(filePath)}`);
          continue;
        }
      }
      
      // Add all other lines
      modifiedLines.push(line);
    }
    
    // Write back if changes were made
    if (removedH1) {
      const newContent = modifiedLines.join('\n');
      fs.writeFileSync(filePath, newContent, 'utf8');
      return { removed: removedH1, modified: true };
    }
    
    return { removed: null, modified: false };
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { removed: null, modified: false, error: error.message };
  }
}

function processAllBlogArticles() {
  const blogDir = path.join(process.cwd(), 'src', 'pages', 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.error('❌ Blog directory not found:', blogDir);
    return;
  }
  
  const results = {
    total: 0,
    modified: 0,
    errors: 0,
    removedTitles: []
  };
  
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const articlePath = path.join(blogDir, entry.name, 'index.md');
    
    if (fs.existsSync(articlePath)) {
      results.total++;
      
      const result = cleanupArticleH1(articlePath);
      
      if (result.error) {
        results.errors++;
        console.error(`❌ Error in ${entry.name}: ${result.error}`);
      } else if (result.modified) {
        results.modified++;
        results.removedTitles.push({
          file: entry.name,
          title: result.removed
        });
      }
    }
  }
  
  return results;
}

function main() {
  console.log('🧹 Starting H1 headers cleanup...\n');
  
  const results = processAllBlogArticles();
  
  console.log('\n📊 Cleanup Summary:');
  console.log(`- Total articles: ${results.total}`);
  console.log(`- Articles modified: ${results.modified}`);
  console.log(`- Errors: ${results.errors}`);
  
  if (results.modified > 0) {
    console.log('\n✅ Removed H1 headers:');
    results.removedTitles.forEach(item => {
      console.log(`- ${item.file}: "${item.title}"`);
    });
  }
  
  if (results.errors > 0) {
    console.log('\n⚠️  Some articles had errors - check logs above');
  }
  
  console.log('\n✅ H1 cleanup completed!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { cleanupArticleH1, processAllBlogArticles, main };
