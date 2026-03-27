#!/usr/bin/env node

/**
 * AI Newsletter Content Generator
 * Uses Anthropic Claude to fill in newsletter placeholders with real content
 * based on collected weekly articles data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

async function callClaude(systemPrompt, userPrompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

function loadArticlesData() {
  const articlesPath = path.join(process.cwd(), 'weekly-articles.json');
  if (!fs.existsSync(articlesPath)) {
    console.warn('⚠️ weekly-articles.json not found');
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  } catch (e) {
    console.warn('⚠️ Failed to parse weekly-articles.json:', e.message);
    return null;
  }
}

function buildArticlesContext(articlesData) {
  if (!articlesData || articlesData.summary.total === 0) {
    return 'Keine Artikel diese Woche verfügbar.';
  }

  const articles = articlesData.references || [];
  const dateRange = articlesData.summary.dateRange;

  let context = `Gesammelte Artikel (${articlesData.summary.total} total, ${dateRange.start} bis ${dateRange.end}):\n\n`;

  articles.slice(0, 10).forEach((article, i) => {
    context += `**Artikel ${i + 1}: ${article.title}**\n`;
    context += `URL: ${article.url}\n`;
    context += `Beschreibung: ${article.description}\n`;
    context += `Kategorie: ${article.category} | Empfohlene Sektion: ${article.suggestedSection}\n`;
    context += `Datum: ${article.date}\n\n`;
  });

  return context;
}

async function generateNewsletterContent(newsletterFile, articlesData) {
  const currentContent = fs.readFileSync(newsletterFile, 'utf8');
  const articlesContext = buildArticlesContext(articlesData);
  const totalArticles = articlesData?.summary?.total || 0;
  const dateRange = articlesData?.summary?.dateRange;

  const systemPrompt = `Du bist ein professioneller B2B Newsletter-Redakteur für AI-Automation-Engineers.de.

Zielgruppe: CTOs, IT-Entscheider, AI-Automation Engineers in deutschsprachigen Unternehmen.

AUFGABE: Fülle ALLE Platzhalter im Newsletter mit echten, qualitativ hochwertigen Inhalten aus - abgeleitet von den bereitgestellten Blog-Artikeln.

PLATZHALTER-FORMATE ZU ERSETZEN:
- {{VARIABLE_NAME}} - Doppelt geschweifte Klammern
- [TEXT IN ECKIGEN KLAMMERN] - Eckige Klammern

STRENGE REGELN:
1. Behalte den EXAKTEN Markdown-Aufbau bei - ändere NICHTS außer den Platzhaltern
2. Behalte die Frontmatter (zwischen --- Trennlinien) VOLLSTÄNDIG UNVERÄNDERT
3. Behalte alle URLs, bereits ausgefüllten Texte und die Markdown-Struktur
4. Schreibe auf Deutsch, professionell, prägnant und enterprise-orientiert
5. Leite alle Inhalte aus den gegebenen Artikeln ab
6. Für Business-Impact-Punkte: schreibe konkrete, praktische Vorteile (1-2 Sätze)
7. Für Zielgruppen: benenne spezifische Rollen (z.B. "DevOps Engineers, Cloud-Architekten")
8. ALLE Platzhalter müssen ersetzt werden - lasse KEINE {{}} oder [] Platzhalter zurück
9. Antworte NUR mit dem vollständigen Newsletter - KEIN einleitendes Text, KEINE Erklärungen`;

  const userPrompt = `Hier sind die Blog-Artikel der letzten 7 Tage (${totalArticles} total, ${dateRange?.start || 'N/A'} bis ${dateRange?.end || 'N/A'}):

${articlesContext}

Und hier ist der Newsletter-Entwurf mit Platzhaltern:

${currentContent}

WICHTIG: Fülle ALLE Platzhalter mit echten Inhalten aus den oben stehenden Artikeln:
- Alle {{VARIABLE_NAME}} Platzhalter
- Alle [TEXT IN ECKIGEN KLAMMERN] Platzhalter

Gib NUR den vollständigen, ausgefüllten Newsletter zurück ohne JEGLICHE {{}} oder [] Platzhalter.`;

  console.log(`🤖 Calling Claude API (${totalArticles} articles available)...`);
  return await callClaude(systemPrompt, userPrompt);
}

function findNewsletterFile(providedPath) {
  if (providedPath && fs.existsSync(providedPath)) {
    return providedPath;
  }

  const newsletterDir = path.join(process.cwd(), 'src', 'pages', 'newsletter');
  if (!fs.existsSync(newsletterDir)) {
    return null;
  }

  const dirs = fs.readdirSync(newsletterDir)
    .filter(d => fs.statSync(path.join(newsletterDir, d)).isDirectory())
    .sort()
    .reverse();

  if (dirs.length === 0) return null;

  return path.join(newsletterDir, dirs[0], 'index.md');
}

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.log('⚠️ ANTHROPIC_API_KEY not set - skipping AI content generation');
    process.exit(0);
  }

  const args = process.argv.slice(2);
  let newsletterFilePath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--newsletter' && args[i + 1]) {
      newsletterFilePath = args[i + 1];
      i++;
    }
  }

  const newsletterFile = findNewsletterFile(newsletterFilePath);

  if (!newsletterFile) {
    console.error('❌ Newsletter file not found');
    process.exit(1);
  }

  console.log(`📝 Processing: ${newsletterFile}`);

  const articlesData = loadArticlesData();

  if (!articlesData || articlesData.summary.total === 0) {
    console.log('ℹ️ No articles available - skipping AI generation');
    process.exit(0);
  }

  try {
    const generatedContent = await generateNewsletterContent(newsletterFile, articlesData);
    fs.writeFileSync(newsletterFile, generatedContent, 'utf8');
    console.log('✅ AI-generated newsletter content saved successfully');
  } catch (error) {
    console.error('❌ AI generation failed:', error.message);
    console.log('ℹ️ Newsletter retains template placeholders - manual editing required');
    // Exit 0 so the workflow continues and still creates the PR
  }
}

main();
