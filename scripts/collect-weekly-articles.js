#!/usr/bin/env node

/**
 * Weekly Articles Collector Script
 * Collects blog articles from the last 7 days for newsletter generation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDateRange(daysBack = 7) {
  const now = new Date();
  const endDate = new Date(now);
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - daysBack);
  
  return {
    start: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0],
    startObj: startDate,
    endObj: endDate
  };
}

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;
  
  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle different value types
      if (value.startsWith("'") && value.endsWith("'")) {
        frontmatter[key] = value.slice(1, -1);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        frontmatter[key] = value.slice(1, -1);
      } else if (value === 'true' || value === 'false') {
        frontmatter[key] = value === 'true';
      } else if (!isNaN(value)) {
        frontmatter[key] = Number(value);
      } else {
        frontmatter[key] = value;
      }
    }
  }
  
  return frontmatter;
}

function parseDateFromFilename(filename) {
  // Extract YYYY-MM-DD from filename like "2025-11-13-article-title"
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : null;
}

function collectBlogArticles(daysBack = 7) {
  const blogDir = path.join(process.cwd(), 'src', 'pages', 'blog');
  const dateRange = getDateRange(daysBack);
  
  console.log(`📅 Collecting articles from ${dateRange.start} to ${dateRange.end}`);
  
  if (!fs.existsSync(blogDir)) {
    console.warn('⚠️  Blog directory not found:', blogDir);
    return [];
  }
  
  const articles = [];
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const folderName = entry.name;
    const dateFromFilename = parseDateFromFilename(folderName);
    
    if (!dateFromFilename) {
      console.log(`⏭️  Skipping folder without date: ${folderName}`);
      continue;
    }
    
    const articleDate = new Date(dateFromFilename);
    
    // Check if article is within the date range
    if (articleDate >= dateRange.startObj && articleDate <= dateRange.endObj) {
      const articlePath = path.join(blogDir, folderName, 'index.md');
      
      if (fs.existsSync(articlePath)) {
        try {
          const content = fs.readFileSync(articlePath, 'utf8');
          const frontmatter = extractFrontmatter(content);
          
          if (frontmatter) {
            const article = {
              filename: folderName,
              date: dateFromFilename,
              title: frontmatter.title || 'Untitled',
              description: frontmatter.description || '',
              category: frontmatter.category || 'Blog',
              tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
              author: frontmatter.author || 'Unknown',
              readTime: frontmatter.readTime || '5 min read',
              url: `/blog/${folderName}/`,
              slug: folderName
            };
            
            articles.push(article);
            console.log(`✅ Added: ${article.title} (${dateFromFilename})`);
          }
        } catch (error) {
          console.error(`❌ Error processing ${articlePath}:`, error.message);
        }
      }
    } else {
      console.log(`⏭️  Article outside date range: ${folderName} (${dateFromFilename})`);
    }
  }
  
  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return articles;
}

function categorizeArticles(articles) {
  const categories = {
    'AI-Automation': [],
    'Tools & Frameworks': [],
    'Enterprise & Business': [],
    'Development': [],
    'Investment & News': [],
    'Creative & Media': [],
    'Other': []
  };
  
  for (const article of articles) {
    const title = article.title.toLowerCase();
    const description = article.description.toLowerCase();
    const tags = Array.isArray(article.tags) ? article.tags.map(t => String(t).toLowerCase()).join(' ') : '';
    const content = `${title} ${description} ${tags}`;
    
    // Categorization logic based on keywords
    if (content.includes('automation') || content.includes('workflow') || content.includes('agent') || content.includes('n8n') || content.includes('zapier')) {
      categories['AI-Automation'].push(article);
    } else if (content.includes('tool') || content.includes('framework') || content.includes('langflow') || content.includes('github') || content.includes('copilot')) {
      categories['Tools & Frameworks'].push(article);
    } else if (content.includes('enterprise') || content.includes('business') || content.includes('unternehmen') || content.includes('microsoft') || content.includes('google')) {
      categories['Enterprise & Business'].push(article);
    } else if (content.includes('development') || content.includes('coding') || content.includes('developer') || content.includes('programming')) {
      categories['Development'].push(article);
    } else if (content.includes('investment') || content.includes('funding') || content.includes('milliarden') || content.includes('million')) {
      categories['Investment & News'].push(article);
    } else if (content.includes('video') || content.includes('audio') || content.includes('image') || content.includes('creative') || content.includes('design')) {
      categories['Creative & Media'].push(article);
    } else {
      categories['Other'].push(article);
    }
  }
  
  return categories;
}

function generateArticlesSummary(articles) {
  const categories = categorizeArticles(articles);
  const summary = {
    total: articles.length,
    dateRange: getDateRange(),
    categories: {},
    topArticles: articles.slice(0, 5), // Top 5 most recent
    articlesList: articles
  };
  
  // Add category counts and articles
  for (const [category, categoryArticles] of Object.entries(categories)) {
    if (categoryArticles.length > 0) {
      summary.categories[category] = {
        count: categoryArticles.length,
        articles: categoryArticles
      };
    }
  }
  
  return summary;
}

function generateNewsletterReferences(articles) {
  const references = [];
  
  for (const article of articles) {
    references.push({
      title: article.title,
      url: article.url,
      description: article.description,
      date: article.date,
      category: getCategoryForArticle(article),
      suggestedSection: getSuggestedSection(article)
    });
  }
  
  return references;
}

function getCategoryForArticle(article) {
  const content = `${article.title} ${article.description}`.toLowerCase();
  
  if (content.includes('automation') || content.includes('agent')) return 'AI-Automation';
  if (content.includes('tool') || content.includes('framework')) return 'Tools & Frameworks';
  if (content.includes('investment') || content.includes('funding')) return 'Investment & News';
  if (content.includes('creative') || content.includes('video')) return 'Creative Tools';
  
  return 'General';
}

function getSuggestedSection(article) {
  const content = `${article.title} ${article.description}`.toLowerCase();
  
  if (content.includes('microsoft') || content.includes('google') || content.includes('openai')) {
    return 'top_story';
  }
  if (content.includes('tool') || content.includes('framework')) {
    return 'tools_section';
  }
  if (content.includes('investment') || content.includes('milliarden')) {
    return 'investment_section';
  }
  if (content.includes('video') || content.includes('image') || content.includes('creative')) {
    return 'creative_section';
  }
  
  return 'quickies';
}

function saveArticlesData(articles, outputPath = 'weekly-articles.json') {
  const summary = generateArticlesSummary(articles);
  const references = generateNewsletterReferences(articles);
  
  const data = {
    generated: new Date().toISOString(),
    summary,
    references,
    rawArticles: articles
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`💾 Articles data saved to: ${outputPath}`);
  
  return data;
}

// Main execution
function main(options = {}) {
  const { daysBack = 7, output = 'weekly-articles.json' } = options;
  
  try {
    console.log('🔍 Collecting weekly blog articles...\n');
    
    const articles = collectBlogArticles(daysBack);
    
    if (articles.length === 0) {
      console.log('ℹ️  No articles found in the specified date range.');
      return { articles: [], summary: null };
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total articles: ${articles.length}`);
    console.log(`- Date range: ${getDateRange(daysBack).start} to ${getDateRange(daysBack).end}`);
    
    const data = saveArticlesData(articles, output);
    
    console.log('\n✅ Articles collection completed!');
    console.log(`📁 Data available in: ${output}`);
    
    return data;
    
  } catch (error) {
    console.error('❌ Error collecting articles:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];
    
    if (key === 'days') options.daysBack = parseInt(value) || 7;
    if (key === 'output') options.output = value;
  }
  
  main(options);
}

export { collectBlogArticles, generateArticlesSummary, generateNewsletterReferences, main };
