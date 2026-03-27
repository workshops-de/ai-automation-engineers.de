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
  const newsletterPath = path.join(process.cwd(), 'src', 'pages', 'blog', metadata.folderName);
  
  if (!fs.existsSync(newsletterPath)) {
    fs.mkdirSync(newsletterPath, { recursive: true });
    console.log(`✅ Created newsletter folder in blog section: ${newsletterPath}`);
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

  const topArticles = articlesData.summary.topArticles.slice(0, 8);
  const usedCompanies = new Set();
  const diverseArticles = [];

  // Prioritize diversity by company/category
  for (const article of topArticles) {
    const category = getCategoryFromTitle(article.title);
    if (!usedCompanies.has(category) && diverseArticles.length < 5) {
      usedCompanies.add(category);
      diverseArticles.push(article);
    }
  }

  // Fill remaining spots if needed
  for (const article of topArticles) {
    if (diverseArticles.length >= 5) break;
    if (!diverseArticles.includes(article)) {
      diverseArticles.push(article);
    }
  }

  const bulletPoints = diverseArticles.slice(0, 5).map(article => {
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
  if (lowerTitle.includes('adobe')) return 'Adobe';
  if (lowerTitle.includes('angular')) return 'Angular';
  if (lowerTitle.includes('duckduckgo')) return 'DuckDuckGo';
  if (lowerTitle.includes('karpathy')) return 'Karpathy';
  if (lowerTitle.includes('automation')) return 'AI-Automation';
  
  // Extract company/tool name from title
  const words = title.split(' ');
  return words[0] || 'AI-Tool';
}

function selectDiverseArticles(articles, count, usedTitles = new Set()) {
  const usedCompanies = new Set();
  const selectedArticles = [];
  
  // First pass: Select articles from different companies
  for (const article of articles) {
    if (selectedArticles.length >= count) break;
    
    const company = getCategoryFromTitle(article.title);
    const titleKey = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    
    if (!usedCompanies.has(company) && !usedTitles.has(titleKey)) {
      usedCompanies.add(company);
      usedTitles.add(titleKey);
      selectedArticles.push(article);
    }
  }
  
  // Second pass: Fill remaining spots with any non-duplicate articles
  for (const article of articles) {
    if (selectedArticles.length >= count) break;
    
    const titleKey = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    
    if (!selectedArticles.includes(article) && !usedTitles.has(titleKey)) {
      usedTitles.add(titleKey);
      selectedArticles.push(article);
    }
  }
  
  return selectedArticles;
}

function generateStoriesFromArticles(articlesData, storyNumber = 1) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `### {{COMPANY_${storyNumber}}}: {{HEADLINE_${storyNumber}}}

**Was ist passiert?** {{DESCRIPTION_${storyNumber}}}

**Warum ist das wichtig?**
- {{BUSINESS_IMPACT_${storyNumber}_1}}
- {{AUTOMATION_POTENTIAL_${storyNumber}}}
- {{ENTERPRISE_RELEVANCE_${storyNumber}}}

**Für wen?** {{TARGET_AUDIENCE_${storyNumber}}}

[Weiterlesen →]({{ARTICLE_URL_${storyNumber}}})`;
  }

  const articles = articlesData.summary.topArticles;
  if (articles.length >= storyNumber) {
    const article = articles[storyNumber - 1];
    const company = getCategoryFromTitle(article.title);
    
    return `### ${company}: ${article.title}

**Was ist passiert?** ${article.description}

**Warum ist das wichtig?**
- {{BUSINESS_IMPACT_${storyNumber}_1}}
- {{AUTOMATION_POTENTIAL_${storyNumber}}}
- {{ENTERPRISE_RELEVANCE_${storyNumber}}}

**Für wen?** AI-Automation Engineers, {{TARGET_AUDIENCE_${storyNumber}}}

[Weiterlesen →](${article.url})`;
  }

  return generateStoriesFromArticles(null, storyNumber); // Fallback to template
}

function generateDiverseStoriesFromArticles(articlesData, storyNumber = 1, usedTitles = new Set()) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return generateStoriesFromArticles(articlesData, storyNumber);
  }

  const articles = articlesData.summary.topArticles;
  const availableArticles = articles.filter(article => {
    const titleKey = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    return !usedTitles.has(titleKey);
  });
  
  if (availableArticles.length >= storyNumber) {
    const article = availableArticles[storyNumber - 1];
    const company = getCategoryFromTitle(article.title);
    const titleKey = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
    
    // Mark this article as used
    usedTitles.add(titleKey);
    
    return `### ${company}: ${article.title}

**Was ist passiert?** ${article.description}

**Warum ist das wichtig?**
- {{BUSINESS_IMPACT_${storyNumber}_1}}
- {{AUTOMATION_POTENTIAL_${storyNumber}}}
- {{ENTERPRISE_RELEVANCE_${storyNumber}}}

**Für wen?** AI-Automation Engineers, {{TARGET_AUDIENCE_${storyNumber}}}

[Weiterlesen →](${article.url})`;
  }

  // Fallback to any available article if not enough diverse ones
  if (articles.length >= storyNumber) {
    return generateStoriesFromArticles(articlesData, storyNumber);
  }

  return generateStoriesFromArticles(null, storyNumber); // Template fallback
}

function createBasicNewsletter(metadata) {
  const template = loadTemplate();
  const articlesData = loadWeeklyArticles();
  
  // Track used articles to prevent duplicates across sections
  const usedTitles = new Set();
  
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
    .replace(/\{\{TOP_STORY_1\}\}/g, generateDiverseStoriesFromArticles(articlesData, 1, usedTitles))
    .replace(/\{\{TOP_STORY_2\}\}/g, generateDiverseStoriesFromArticles(articlesData, 2, usedTitles))
    .replace(/\{\{TOP_STORY_3\}\}/g, generateDiverseStoriesFromArticles(articlesData, 3, usedTitles))
    
    .replace(/\{\{TOOLS_SECTION\}\}/g, generateDiverseToolsSection(articlesData, usedTitles))
    
    .replace(/\{\{INVESTMENT_SECTION\}\}/g, generateDiverseInvestmentSection(articlesData, usedTitles))
    
    .replace(/\{\{CREATIVE_TOOLS_SECTION\}\}/g, generateDiverseCreativeToolsSection(articlesData, usedTitles))
    
    .replace(/\{\{QUICKIES_LIST\}\}/g, generateDiverseQuickies(articlesData, usedTitles))
    
    .replace(/\{\{ANALYSIS_SECTION\}\}/g, 
      `Diese Woche zeigt deutlich: **{{MAIN_TREND_OF_WEEK}}**.\n\n{{ANALYSIS_PARAGRAPH_1}}\n\n{{ANALYSIS_PARAGRAPH_2}}`)
    
    .replace(/\{\{TREND_LIST\}\}/g, 
      `1. **{{TREND_1}}**: {{TREND_1_DESCRIPTION}}\n2. **{{TREND_2}}**: {{TREND_2_DESCRIPTION}}\n3. **{{TREND_3}}**: {{TREND_3_DESCRIPTION}}\n4. **{{TREND_4}}**: {{TREND_4_DESCRIPTION}}`);
  
  return newsletter;
}

function generateDiverseToolsSection(articlesData, usedTitles) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `### {{NEW_TOOL_1}}: {{TOOL_TITLE_1}}\n\n{{TOOL_DESCRIPTION_1}}\n\n### {{NEW_TOOL_2}}: {{TOOL_TITLE_2}}\n\n{{TOOL_DESCRIPTION_2}}`;
  }

  const toolsArticles = selectDiverseArticles(
    articlesData.summary.topArticles.filter(a => 
      a.title.toLowerCase().includes('tool') || 
      a.title.toLowerCase().includes('framework') ||
      a.title.toLowerCase().includes('sdk') ||
      a.title.toLowerCase().includes('cli')
    ), 2, usedTitles
  );

  if (toolsArticles.length >= 2) {
    const tool1 = toolsArticles[0];
    const tool2 = toolsArticles[1];
    const company1 = getCategoryFromTitle(tool1.title);
    const company2 = getCategoryFromTitle(tool2.title);
    
    return `### ${company1}: ${tool1.title.split(':')[1] || tool1.title}\n\n${tool1.description}\n\n### ${company2}: ${tool2.title.split(':')[1] || tool2.title}\n\n${tool2.description}`;
  }

  return `### {{NEW_TOOL_1}}: {{TOOL_TITLE_1}}\n\n{{TOOL_DESCRIPTION_1}}\n\n### {{NEW_TOOL_2}}: {{TOOL_TITLE_2}}\n\n{{TOOL_DESCRIPTION_2}}`;
}

function generateDiverseInvestmentSection(articlesData, usedTitles) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `### {{COMPANY}} investiert {{AMOUNT}} in {{AREA}}\n\n{{INVESTMENT_DESCRIPTION}}\n\n[Weiterlesen →]({{INVESTMENT_ARTICLE_URL}})`;
  }

  const investmentArticles = selectDiverseArticles(
    articlesData.summary.topArticles.filter(a => 
      a.title.toLowerCase().includes('investiert') || 
      a.title.toLowerCase().includes('investment') ||
      a.title.toLowerCase().includes('funding') ||
      a.title.toLowerCase().includes('erweitert') ||
      a.title.toLowerCase().includes('partnership')
    ), 1, usedTitles
  );

  if (investmentArticles.length >= 1) {
    const article = investmentArticles[0];
    const company = getCategoryFromTitle(article.title);
    
    return `### ${company} erweitert AI-Automation Infrastructure\n\n${article.description}\n\n[Weiterlesen →](${article.url})`;
  }

  return `### {{COMPANY}} investiert {{AMOUNT}} in {{AREA}}\n\n{{INVESTMENT_DESCRIPTION}}\n\n[Weiterlesen →]({{INVESTMENT_ARTICLE_URL}})`;
}

function generateDiverseCreativeToolsSection(articlesData, usedTitles) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `### {{CREATIVE_TOOL}} für {{APPLICATION}}\n\n{{CREATIVE_TOOL_DESCRIPTION}}\n\n[Weiterlesen →]({{CREATIVE_TOOL_URL}})`;
  }

  const creativeArticles = selectDiverseArticles(
    articlesData.summary.topArticles.filter(a => 
      a.title.toLowerCase().includes('design') || 
      a.title.toLowerCase().includes('creative') ||
      a.title.toLowerCase().includes('ui') ||
      a.title.toLowerCase().includes('art') ||
      a.title.toLowerCase().includes('research') ||
      a.title.toLowerCase().includes('generation')
    ), 1, usedTitles
  );

  if (creativeArticles.length >= 1) {
    const article = creativeArticles[0];
    const company = getCategoryFromTitle(article.title);
    const toolName = article.title.split(':')[1] || article.title;
    
    return `### ${company} ${toolName}\n\n${article.description}\n\n[Weiterlesen →](${article.url})`;
  }

  return `### {{CREATIVE_TOOL}} für {{APPLICATION}}\n\n{{CREATIVE_TOOL_DESCRIPTION}}\n\n[Weiterlesen →]({{CREATIVE_TOOL_URL}})`;
}

function generateDiverseQuickies(articlesData, usedTitles) {
  if (!articlesData || !articlesData.summary || articlesData.summary.total === 0) {
    return `- **[{{QUICKIE_1}}]({{QUICKIE_URL_1}})**: {{QUICKIE_DESCRIPTION_1}}\n- **[{{QUICKIE_2}}]({{QUICKIE_URL_2}})**: {{QUICKIE_DESCRIPTION_2}}\n- **[{{QUICKIE_3}}]({{QUICKIE_URL_3}})**: {{QUICKIE_DESCRIPTION_3}}\n- **[{{QUICKIE_4}}]({{QUICKIE_URL_4}})**: {{QUICKIE_DESCRIPTION_4}}`;
  }

  const quickieArticles = selectDiverseArticles(articlesData.summary.topArticles, 4, usedTitles);
  
  if (quickieArticles.length >= 4) {
    return quickieArticles.map(article => {
      const shortDesc = article.description.split('.')[0] || article.description.substring(0, 80);
      return `- **[${article.title}](${article.url})**: ${shortDesc}`;
    }).join('\n');
  }

  return `- **[{{QUICKIE_1}}]({{QUICKIE_URL_1}})**: {{QUICKIE_DESCRIPTION_1}}\n- **[{{QUICKIE_2}}]({{QUICKIE_URL_2}})**: {{QUICKIE_DESCRIPTION_2}}\n- **[{{QUICKIE_3}}]({{QUICKIE_URL_3}})**: {{QUICKIE_DESCRIPTION_3}}\n- **[{{QUICKIE_4}}]({{QUICKIE_URL_4}})**: {{QUICKIE_DESCRIPTION_4}}`;
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
