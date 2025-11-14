# Weekly AI-Automation Newsletter Generation Prompt

## Kontext
Du erstellst den wöchentlichen Newsletter für AI-Automation-Engineers.de. Das ist eine professionelle B2B-Publikation für Unternehmen und Teams, die sich für KI-Automatisierung interessieren.

## Zielgruppe
- **Primär**: Unternehmen, Führungskräfte, IT-Teams
- **Fachbereich**: AI-Automation Engineers, Entwickler, CTOs, IT-Entscheider
- **Expertise**: Intermediate bis Advanced Level
- **Interesse**: Praktische KI-Automatisierung, Geschäftsprozesse, Tools

## Verfügbare Artikel-Daten
Die GitHub Action sammelt automatisch alle Blog-Artikel der letzten 7 Tage und stellt sie in der `weekly-articles.json` zur Verfügung. Diese Artikel sind bereits in den Newsletter-Template eingebaut und müssen nur noch kontextuell angepasst werden.

**Verfügbare Daten pro Artikel:**
- Titel, URL, Beschreibung
- Datum, Kategorie, Tags
- Vorgeschlagene Newsletter-Sektion
- Automatische Kategorisierung

## Newsletter-Format
Verwende das Template aus `templates/weekly-newsletter-template.md` und fülle folgende Platzhalter:

### Metadaten
- `{{WEEK_NUMBER}}`: Aktuelle Kalenderwoche
- `{{YEAR}}`: Aktuelles Jahr  
- `{{CURRENT_DATE}}`: Datum im Format 'YYYY-MM-DD'
- `{{NEWSLETTER_EDITION}}`: "ersten/zweiten/dritten/..." (geschrieben)
- `{{ESTIMATED_READ_TIME}}`: 6-12 (basierend auf Länge)
- `{{HERO_IMAGE_URL}}`: Relevantes Pexels-Bild

### Content-Sektionen

#### `{{INTRO_TEXT}}` ✅ **AUTOMATISCH GEFÜLLT**
- Dynamisch generiert basierend auf Anzahl gefundener Artikel
- Format: "Wir haben X wichtige Artikel für dich analysiert..."
- Falls keine Artikel: Standard-Text als Fallback

#### `{{TOP_STORIES_LIST}}` ✅ **AUTOMATISCH GEFÜLLT**
- Bereits generiert aus den Top-Artikeln der letzten 7 Tage
- Format: `- **Unternehmen/Tool**: Kurzbeschreibung` (automatisch erkannt)
- Kategorisierung erfolgt automatisch (Microsoft, Google, OpenAI, etc.)

#### Top Stories (3 Hauptartikel)
**Artikel sind bereits vorausgewählt** aus den letzten 7 Tagen. Du musst nur noch ausfüllen:
- **Überschrift**: ✅ Bereits aus Artikel-Titel generiert
- **Was ist passiert?**: ✅ Bereits aus Artikel-Beschreibung verfügbar
- **Warum ist das wichtig?**: ⚠️ **ZU ERSETZEN**: `[BUSINESS-IMPACT]`, `[AUTOMATISIERUNG-POTENZIAL]`, `[ENTERPRISE-RELEVANZ]` 
- **Für wen?**: ⚠️ **ZU ERSETZEN**: `[SPEZIFISCHE ZIELGRUPPE]` basierend auf Artikel-Inhalt
- **Link**: ✅ Bereits korrekt verlinkt aus Artikel-URL

#### Weitere Sektionen
- `{{TOOLS_SECTION}}`: 2-3 neue Tools mit kurzen Beschreibungen
- `{{INVESTMENT_SECTION}}`: Funding, Partnerships, Infrastructure
- `{{CREATIVE_TOOLS_SECTION}}`: AI-Tools für Content/Design
- `{{QUICKIES_LIST}}`: 4-6 kurze News als Bulletpoints mit Links
- `{{ANALYSIS_SECTION}}`: 2-3 Absätze Wochenanalyse
- `{{TREND_LIST}}`: 4 nummerierte Trends

## Inhaltliche Richtlinien

### Schwerpunkte
1. **AI-Automation Tools**: N8N, Zapier, Make, Langflow
2. **Enterprise AI**: Microsoft Copilot, Google Workspace, APIs
3. **Coding AI**: GitHub Copilot, Cursor, Claude, ChatGPT
4. **Agents & Workflows**: Autonomous agents, MCP, multi-agent systems
5. **Business Impact**: ROI, Zeitersparnis, Prozessoptimierung

### Tonalität
- **Professional**: Seriös, fundiert, geschäftsorientiert
- **Praktisch**: Konkreter Nutzen, keine reine Theorie
- **Enthusiastisch**: Positive Grundhaltung zu AI-Automation
- **Deutsch**: Native deutsche Sprache, keine Anglizismen wo unnötig

### Qualitätskriterien
- **Relevanz**: Alle News müssen AI-Automation Bezug haben
- **Aktualität**: Nur News der letzten 7 Tage
- **Unternehmensfokus**: B2B-Perspektive, nicht Consumer
- **Actionable**: Leser sollen konkrete Erkenntnisse mitnehmen

## Blog-Artikel Referenzen ✅ **AUTOMATISCH VERFÜGBAR**
Alle Artikel der letzten 7 Tage sind bereits gesammelt und verlinkt. 

**Automatisch verfügbar:**
- Exakte URLs zu allen relevanten Artikeln
- Kategorisierung nach Themen (AI-Automation, Tools, Enterprise, etc.)
- Vorgeschlagene Newsletter-Sektionen pro Artikel
- Vollständige Metadaten (Titel, Beschreibung, Datum, Tags)

**Im Newsletter-Comment findest du:**
```
📚 AVAILABLE ARTICLES FROM LAST 7 DAYS:
Total: X articles (YYYY-MM-DD - YYYY-MM-DD)

🎯 TOP ARTICLES FOR NEWSLETTER:
1. [Artikel-Titel]
   URL: /blog/YYYY-MM-DD-slug/
   Category: Microsoft | Section: top_story
   Description: [Automatisch extrahiert]
```

## Template-Ersetzung
Erstelle den finalen Newsletter durch Ersetzen aller `{{PLACEHOLDER}}` im Template mit relevantem Content.

## ✅ Bereits Erledigt (Automatisch)
- **Artikel-Sammlung**: Automatisch aus den letzten 7 Tagen
- **Kategorisierung**: AI-Automation, Tools, Enterprise, Investment, etc.
- **URL-Verlinkung**: Alle Links zu echten Blog-Artikeln  
- **Template-Struktur**: Vollständige Newsletter-Vorlage
- **Metadaten**: Wochennummer, Datum, Lesezeit

## ⚠️ Noch zu ersetzen
- `[BUSINESS-IMPACT 1/2/3]`: Konkrete Geschäftsauswirkungen
- `[AUTOMATISIERUNG-POTENZIAL]`: Automation-Möglichkeiten
- `[ENTERPRISE-RELEVANZ]`: Bedeutung für Unternehmen
- `[SPEZIFISCHE ZIELGRUPPE]`: Genauere Zielgruppe basierend auf Artikel

**Wichtig**: Der Newsletter ist bereits zu 80% fertig - nur noch Business-Kontext hinzufügen!
