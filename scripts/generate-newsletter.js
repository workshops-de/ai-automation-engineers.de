#!/usr/bin/env node

/**
 * Weekly Newsletter Generator Script
 * Generates a new weekly newsletter based on template and current date
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions
function getCurrentWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getDateSlug() {
  return getCurrentDate();
}

function getWeekDateRange() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - now.getDay() + 1);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    monday: monday.toISOString().split('T')[0],
    sunday: sunday.toISOString().split('T')[0]
  };
}

function generateNewsletterMetadata() {
  const weekNumber = getCurrentWeekNumber();
  const year = new Date().getFullYear();
  const currentDate = getCurrentDate();
  const dateRange = getWeekDateRange();
  
  return {
    weekNumber,
    year,
    currentDate,
    dateSlug: getDateSlug(),
    weekRange: dateRange,
    folderName: `${currentDate}-weekly-ai-news-was-verpasst`,
    estimatedReadTime: '8', // Default, can be adjusted
    heroImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
  };
}

function createNewsletterFolder(metadata) {
  const newsletterPath = path.join(process.cwd(), 'src', 'pages', 'newsletter', metadata.folderName);
  
  if (!fs.existsSync(newsletterPath)) {
    fs.mkdirSync(newsletterPath, { recursive: true });
    console.log(`✅ Created newsletter folder: ${newsletterPath}`);
    return newsletterPath;
  } else {
    console.log(`⚠️  Newsletter folder already exists: ${newsletterPath}`);
    return newsletterPath;
  }
}

function loadTemplate() {
  const templatePath = path.join(process.cwd(), 'templates', 'weekly-newsletter-template.md');
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`❌ Template not found: ${templatePath}`);
  }
  
  return fs.readFileSync(templatePath, 'utf8');
}

function loadWeeklyArticles() {
  const articlesPath = path.join(process.cwd(), 'weekly-articles.json');
  
  if (fs.existsSync(articlesPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      console.log(`📚 Loaded ${data.summary.total} articles from the last 7 days`);
      return data;
    } catch (error) {
      console.warn('⚠️  Could not parse weekly-articles.json:', error.message);
      return null;
    }
  } else {
    console.warn('⚠️  weekly-articles.json not found - generating without recent articles');
    return null;
  }
}

function generateArticlesListForNewsletter(articlesData) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `- **[AI-TOOL]**: [KURZBESCHREIBUNG]
- **[UNTERNEHMEN]**: [NEUE FEATURES]
- **[PLATFORM]**: [WICHTIGES UPDATE]
- **[FRAMEWORK]**: [ENTWICKLUNG]
- **[SERVICE]**: [ANKÜNDIGUNG]`;
  }

  const topArticles = articlesData.summary.topArticles.slice(0, 6);
  const bulletPoints = topArticles.map(article => {
    const category = getCategoryFromTitle(article.title);
    const shortDesc = article.description.split('.')[0] || 'Neue Entwicklung';
    return `- **${category}**: ${shortDesc}`;
  });

  return bulletPoints.join('\n');
}

function getCategoryFromTitle(title) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('microsoft')) return 'Microsoft';
  if (lowerTitle.includes('google') || lowerTitle.includes('gemini')) return 'Google';
  if (lowerTitle.includes('openai') || lowerTitle.includes('chatgpt')) return 'OpenAI';
  if (lowerTitle.includes('anthropic') || lowerTitle.includes('claude')) return 'Anthropic';
  if (lowerTitle.includes('github')) return 'GitHub';
  if (lowerTitle.includes('n8n')) return 'N8N';
  if (lowerTitle.includes('langflow')) return 'Langflow';
  if (lowerTitle.includes('automation')) return 'AI-Automation';
  
  // Extract company/tool name from title
  const words = title.split(' ');
  return words[0] || 'AI-Tool';
}

function generateStoriesFromArticles(articlesData, storyNumber = 1) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `### [UNTERNEHMEN]: [SCHLAGZEILE]

**Was ist passiert?** [BESCHREIBUNG]

**Warum ist das wichtig?**
- [GRUND 1]
- [GRUND 2]
- [GRUND 3]

**Für wen?** [ZIELGRUPPE]

[Weiterlesen →](/blog/YYYY-MM-DD-artikel-slug/)`;
  }

  const articles = articlesData.summary.topArticles;
  if (articles.length >= storyNumber) {
    const article = articles[storyNumber - 1];
    const company = getCategoryFromTitle(article.title);
    
    return `### ${company}: ${article.title}

**Was ist passiert?** ${article.description}

**Warum ist das wichtig?**
- [BUSINESS-IMPACT 1]
- [AUTOMATISIERUNG-POTENZIAL]
- [ENTERPRISE-RELEVANZ]

**Für wen?** AI-Automation Engineers, [SPEZIFISCHE ZIELGRUPPE]

[Weiterlesen →](${article.url})`;
  }

  return generateStoriesFromArticles(null, storyNumber); // Fallback to template
}

function createBasicNewsletter(metadata) {
  const template = loadTemplate();
  const articlesData = loadWeeklyArticles();
  
  // Basic replacements for initial newsletter structure
  let newsletter = template
    .replace(/\{\{WEEK_NUMBER\}\}/g, metadata.weekNumber)
    .replace(/\{\{YEAR\}\}/g, metadata.year)
    .replace(/\{\{CURRENT_DATE\}\}/g, metadata.currentDate)
    .replace(/\{\{ESTIMATED_READ_TIME\}\}/g, metadata.estimatedReadTime)
    .replace(/\{\{HERO_IMAGE_URL\}\}/g, metadata.heroImage)
    .replace(/\{\{NEWSLETTER_EDITION\}\}/g, 'neue'); // Default value
  
  // Add content based on collected articles or placeholder content
  const articlesListContent = generateArticlesListForNewsletter(articlesData);
  const introText = articlesData && articlesData.summary.total > 0 
    ? `Diese Woche war wieder vollgepackt mit spannenden Entwicklungen im Bereich AI-Automation. Wir haben ${articlesData.summary.total} wichtige Artikel für dich analysiert und die relevantesten News, Tools und Updates zusammengestellt, die deine Arbeit als AI-Automation Engineer beeinflussen werden.`
    : `Diese Woche war wieder vollgepackt mit spannenden Entwicklungen im Bereich AI-Automation. Wir haben für dich die wichtigsten News, Tools und Updates zusammengestellt, die deine Arbeit als AI-Automation Engineer beeinflussen werden.`;

  newsletter = newsletter
    .replace(/\{\{INTRO_TEXT\}\}/g, introText)
    .replace(/\{\{TOP_STORIES_LIST\}\}/g, articlesListContent)
    .replace(/\{\{TOP_STORY_1\}\}/g, generateStoriesFromArticles(articlesData, 1))
    .replace(/\{\{TOP_STORY_2\}\}/g, generateStoriesFromArticles(articlesData, 2))
    .replace(/\{\{TOP_STORY_3\}\}/g, generateStoriesFromArticles(articlesData, 3))
    
    .replace(/\{\{TOOLS_SECTION\}\}/g, 
      `### [NEUES TOOL]: [KURZTITEL]\n\n[BESCHREIBUNG MIT LINK]\n\n### [WEITERES TOOL]: [KURZTITEL]\n\n[BESCHREIBUNG MIT LINK]`)
    
    .replace(/\{\{INVESTMENT_SECTION\}\}/g, 
      `### [UNTERNEHMEN] investiert [BETRAG] in [BEREICH]\n\n[BESCHREIBUNG UND BEDEUTUNG]\n\n[Weiterlesen →](/blog/YYYY-MM-DD-artikel-slug/)`)
    
    .replace(/\{\{CREATIVE_TOOLS_SECTION\}\}/g, 
      `### [TOOL-NAME] für [ANWENDUNG]\n\n[BESCHREIBUNG UND NUTZEN]\n\n[Weiterlesen →](/blog/YYYY-MM-DD-artikel-slug/)`)
    
    .replace(/\{\{QUICKIES_LIST\}\}/g, 
      `- **[Kurznachricht 1](/blog/YYYY-MM-DD-slug/)**: Beschreibung\n- **[Kurznachricht 2](/blog/YYYY-MM-DD-slug/)**: Beschreibung\n- **[Kurznachricht 3](/blog/YYYY-MM-DD-slug/)**: Beschreibung\n- **[Kurznachricht 4](/blog/YYYY-MM-DD-slug/)**: Beschreibung`)
    
    .replace(/\{\{ANALYSIS_SECTION\}\}/g, 
      `Diese Woche zeigt deutlich: **[HAUPTTREND DER WOCHE]**.\n\n[ANALYSE ABSATZ 1]\n\n[ANALYSE ABSATZ 2]`)
    
    .replace(/\{\{TREND_LIST\}\}/g, 
      `1. **[Trend 1]**: [Beschreibung]\n2. **[Trend 2]**: [Beschreibung]\n3. **[Trend 3]**: [Beschreibung]\n4. **[Trend 4]**: [Beschreibung]`);
  
  return newsletter;
}

function saveNewsletter(newsletterPath, content) {
  const filePath = path.join(newsletterPath, 'index.md');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Newsletter saved: ${filePath}`);
  
  return filePath;
}

// Main execution
function main() {
  try {
    console.log('🚀 Generating Weekly Newsletter...\n');
    
    // Generate metadata
    const metadata = generateNewsletterMetadata();
    console.log(`📅 Week ${metadata.weekNumber}/${metadata.year} (${metadata.weekRange.monday} - ${metadata.weekRange.sunday})`);
    
    // Create newsletter folder
    const newsletterPath = createNewsletterFolder(metadata);
    
    // Generate newsletter content
    const newsletterContent = createBasicNewsletter(metadata);
    
    // Save newsletter
    const filePath = saveNewsletter(newsletterPath, newsletterContent);
    
    console.log('\n✅ Newsletter generated successfully!');
    console.log('\n📝 Next steps:');
    console.log(`1. Edit the file: ${filePath}`);
    console.log(`2. Fill in the placeholder content using AI or manually`);
    console.log(`3. Add relevant links to existing blog posts`);
    console.log(`4. Review and publish`);
    
    console.log('\n💡 AI Prompt available in: prompts/weekly-newsletter-prompt.md');
    
  } catch (error) {
    console.error('❌ Error generating newsletter:', error.message);
    process.exit(1);
  }
}

// Run if called directly (ES Module way)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateNewsletterMetadata, createBasicNewsletter, main };
