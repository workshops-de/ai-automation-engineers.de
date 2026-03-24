---
layout: '../../../layouts/BlogLayout.astro'
title: 'Karpathy veröffentlicht Open-Source Tool zur AI-Job-Exposure-Analyse'
description: 'Andrej Karpathy analysiert 342 US-Berufe mit Gemini Flash und berechnet AI-Exposure-Scores von 0-10. GitHub Repository zeigt Automatisierungs-Pipeline.'
pubDate: '2026-03-23'
author: 'Robin Böhm'
tags: ['AI-Automation', 'Gemini-Flash', 'Job-Analysis', 'Open-Source', 'LLM-Pipeline']
category: 'News'
readTime: '6 min read'
image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=630&fit=crop'
source: 'https://github.com/karpathy/jobs'
portal: 'ai-automation-engineers.de'
spreadsheetRow: '685'
---
# Karpathy Open-Source Tool analysiert AI-Exposure für 342 Berufe mit Gemini Flash
**TL;DR:** Ex-OpenAI Mitgründer Andrej Karpathy hat ein Python-Tool veröffentlicht, das mit Gemini Flash automatisiert AI-Exposure-Scores für alle 342 BLS-Berufe berechnet. Das Repository zeigt eine skalierbare LLM-Pipeline, die Jobbeschreibungen scrapt, bereinigt und mit strukturiertem Prompting analysiert – perfektes Beispiel für praktische AI-Automation.
Der bekannte AI-Forscher Andrej Karpathy hat auf GitHub ein Tool veröffentlicht, das die digitale Exposition aller US-Berufe gegenüber künstlicher Intelligenz messbar macht. Das Repository "jobs" demonstriert dabei eine hocheffiziente Automatisierungs-Pipeline, die für AI-Automation-Engineers besonders interessant ist – nicht nur wegen der Ergebnisse, sondern vor allem wegen der technischen Implementierung.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: GitHub Repository mit vollständigem Python-Code
- 🎯 **Zielgruppe**: AI-Engineers, Automation-Experten, Data Scientists
- 💡 **Kernfeature**: Automatisierte LLM-Pipeline mit Gemini Flash für Job-Analyse
- 🔧 **Tech-Stack**: Python, Gemini Flash via OpenRouter, JSON-Caching, Markdown-Processing
- 📊 **Ergebnis**: 342 Berufe mit AI-Exposure-Score von 0-10
## Was bedeutet das für AI-Automation-Engineers?
Das Repository zeigt exemplarisch, wie moderne LLM-Pipelines für Massen-Datenanalyse aufgebaut werden. Karpathy's Ansatz ist dabei bewusst pragmatisch: Er nutzt Gemini Flash (Preview) über OpenRouter für die Bewertung, implementiert intelligentes Caching in `scores.json` für unterbrechungssichere Verarbeitung und strukturiert die gesamte Pipeline modular.
Das spart konkret stundenlange manuelle Analyse-Arbeit pro Berufskategorie und zeigt, wie LLMs für strukturierte Datenextraktion skaliert werden können.
### Technische Details der Pipeline
Die Implementierung folgt einem klaren 4-Stufen-Prozess:
1. **Web Scraping**: Automatisiertes Crawling aller 342 BLS-Berufsseiten
2. **Datenbereinigung**: Konvertierung zu strukturierten Markdown-Beschreibungen
3. **LLM-Analyse**: Gemini Flash bewertet mit strukturiertem System-Prompt
4. **Ergebnis-Caching**: Inkrementelle Speicherung in `scores.json`
Die Bewertungsskala ist präzise definiert:
- **0-1**: Rein physische Arbeit (Dachdecker, Gärtner)
- **2-3**: Überwiegend physisch mit Mensch-Interaktion
- **4-5**: Mix aus physischer und digitaler Arbeit (z.B. Krankenpfleger)
- **6-7**: Wissensarbeit mit menschlichem Urteil
- **8-9**: Fast vollständig digital (Programmierer, Data Scientists)
- **10**: Routine-digitale Tasks, perfekt für AI-Automatisierung
## Der clevere Prompt-Engineering-Ansatz
Karpathy verwendet einen detaillierten System-Prompt, der dem LLM klare Bewertungskriterien vorgibt:
```
"You are an expert analyst evaluating how exposed different occupations are to AI. 
[...] Rate the occupation's overall AI exposure on a scale of 0 to 10."
```
Der Prompt enthält konkrete Anker-Beispiele (wie "Registered Nurse = 4-5") und fokussiert explizit auf digitale Arbeit als Schlüsselfaktor. Diese Struktur ermöglicht konsistente Bewertungen über alle 342 Berufe hinweg.
## Praktische Erkenntnisse für die Automation-Praxis
### Top AI-exponierte Berufe (Score 9/10):
- Software-Entwickler
- Datenbank-Administratoren  
- Data Scientists
- Finanzanalysten
- Paralegals
- Technical Writer
- Grafikdesigner
### Workflow-Integration Möglichkeiten
Im Automation-Workflow bedeutet das:
- **Für Make/Zapier/n8n**: Die Pipeline lässt sich als Blueprint für Job-Market-Analyse-Workflows nutzen
- **Für Custom Automations**: Der Code zeigt Best Practices für LLM-basierte Batch-Verarbeitung
- **Für AI-Agents**: Das Caching-Pattern ist ideal für lange laufende Agent-Tasks
Die gewichtete durchschnittliche AI-Exposure liegt bei 4.9/10 – interessanterweise haben Berufe über $100.000 Jahresgehalt einen Durchschnittsscore von 6.7, während Jobs unter $35.000 nur bei 3.4 liegen.
## Code-Highlights aus dem Repository
Das `score.py` Skript demonstriert elegante Error-Handling und Wiederaufnahme-Logik:
```python
# Aus dem Original-Repository
# Inkrementelles Caching für Unterbrechungssicherheit
def save_scores(scores, filename='scores.json'):
    with open(filename, 'w') as f:
        json.dump(scores, f, indent=2)
```
Die Integration mit OpenRouter für Gemini Flash zeigt, wie moderne LLM-APIs effizient genutzt werden – ein Pattern, das sich direkt in eigene Automatisierungs-Projekte übernehmen lässt.
## Was lernen wir für unsere Automatisierungs-Projekte?
1. **Skalierbare LLM-Pipelines**: Strukturiertes Prompting + Caching = Production-Ready
2. **Pragmatischer Ansatz**: "Vibe coding" kann für Prototypen völlig ausreichen
3. **Modularer Aufbau**: Trennung von Scraping, Processing und Scoring
4. **Error Recovery**: Immer mit Unterbrechungen rechnen und Cache implementieren
5. **Clear Metrics**: Definierte Skalen machen LLM-Output vergleichbar
## Kritische Betrachtung
Karpathy selbst warnte davor, die Scores als "Layoff-Prognose" zu interpretieren. AI-Exposure bedeutet nicht automatisch Job-Verlust, sondern zeigt Potenzial für Produktivitätssteigerung. Für Automation-Engineers ist das Repository vor allem als technische Referenz-Implementierung wertvoll.
## Praktische Nächste Schritte
1. **Repository klonen und analysieren**: Die Pipeline-Struktur als Template nutzen
2. **Eigene Domänen analysieren**: Das Pattern auf andere Datensätze anwenden  
3. **In Workflows integrieren**: Als Modul in Make/n8n/Zapier einbauen
## Die Zukunft der Job-Automatisierung
Das Repository zeigt eindrucksvoll, wie AI-Tools zur Analyse von AI-Impact genutzt werden können – eine Meta-Ebene der Automatisierung. Für uns als AI-Automation-Engineers ist besonders wertvoll, wie einfach solche Analysen mit modernen LLMs umgesetzt werden können. Die Integration mit Gemini Flash über OpenRouter kostet nur wenige Cent für die gesamte Analyse – ein Bruchteil dessen, was manuelle Bewertung kosten würde.
Die Pipeline verarbeitet 342 Berufe in wenigen Minuten – eine Aufgabe, die manuell Wochen dauern würde. Das zeigt das enorme Potenzial von LLM-basierten Automatisierungen für strukturierte Datenanalyse.
## Quellen & Weiterführende Links
- 📰 [Original GitHub Repository](https://github.com/karpathy/jobs)
- 📚 [Bureau of Labor Statistics](https://www.bls.gov/ooh/) - Datenquelle
- 🔧 [OpenRouter API](https://openrouter.ai/) - Für Gemini Flash Integration
- 🎓 [Workshops.de AI-Automation Kurse](https://workshops.de/seminare/ai-automation) - Praktische Umsetzung lernen
---
*Hinweis: Das Repository wurde nach kurzer Zeit wieder offline genommen, nachdem es viral ging und teilweise missverstanden wurde. Die technischen Learnings bleiben jedoch wertvoll für die AI-Automation-Community.*