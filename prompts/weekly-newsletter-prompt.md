# Weekly AI-Automation Newsletter Generation Prompt

## Kontext
Du erstellst den wöchentlichen Newsletter für AI-Automation-Engineers.de. Das ist eine professionelle B2B-Publikation für Unternehmen und Teams, die sich für KI-Automatisierung interessieren.

## Zielgruppe
- **Primär**: Unternehmen, Führungskräfte, IT-Teams
- **Fachbereich**: AI-Automation Engineers, Entwickler, CTOs, IT-Entscheider
- **Expertise**: Intermediate bis Advanced Level
- **Interesse**: Praktische KI-Automatisierung, Geschäftsprozesse, Tools

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

#### `{{INTRO_TEXT}}`
- 2-3 Sätze über die wichtigsten Themen der Woche
- Fokus auf AI-Automation und Business-Impact
- Enthusiastisch aber professionell

#### `{{TOP_STORIES_LIST}}`
- 5-7 Bulletpoints mit den wichtigsten Stories
- Format: `- **Unternehmen/Tool**: Kurzbeschreibung`
- Fokus auf: Automation Tools, Enterprise AI, Workflows, Agents

#### Top Stories (3 Hauptartikel)
Jede Story sollte haben:
- **Überschrift**: Aussagekräftig und business-relevant
- **Was ist passiert?**: 1-2 Sätze Sachverhalt  
- **Warum ist das wichtig?**: 3-4 Bulletpoints mit Business-Impact
- **Für wen?**: Zielgruppe benennen
- **Link**: `[Weiterlesen →](/blog/YYYY-MM-DD-artikel-slug/)`

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

## Blog-Artikel Referenzen
Suche nach bestehenden Artikeln auf der Website mit ähnlichen Themen und verlinke sie.
Format: `[Titel](/blog/YYYY-MM-DD-slug/)`

Beispiel-Slugs aus der Website:
- `/blog/2025-11-13-microsoft-autonomous-ai-agents-revolution/`
- `/blog/2025-11-13-github-revolutioniert-ki-entwicklung-mit-multi-agent-platform/`
- `/blog/2025-11-13-langflow-visuelle-revolution-fuer-llm-automatisierung/`

## Template-Ersetzung
Erstelle den finalen Newsletter durch Ersetzen aller `{{PLACEHOLDER}}` im Template mit relevantem Content.

**Wichtig**: Der Newsletter muss sofort publizierbar sein - vollständig, professionell und fehlerfrei!
