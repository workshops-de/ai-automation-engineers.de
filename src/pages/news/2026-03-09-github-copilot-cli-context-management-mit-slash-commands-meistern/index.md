---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub Copilot CLI: Context-Management mit Slash Commands meistern'
description: 'Slash Commands in GitHub Copilot CLI optimieren Context-Management und Terminal-Workflows. Kompletter Guide zu Session-Control, Directory-Access und natürlichsprachlicher Automation in der Kommandozeile.'
pubDate: '2026-01-22'
author: 'Robin Böhm'
tags: ['GitHub Copilot', 'Terminal Automation', 'AI Tools', 'DevOps', 'CLI']
category: 'News'
readTime: '6 min read'
image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97'
source: 'https://github.blog/ai-and-ml/github-copilot/a-cheat-sheet-to-slash-commands-in-github-copilot-cli/'
portal: 'ai-automation-engineers.de'
spreadsheetRow: '378'
---
# GitHub Copilot CLI: Context-Management mit Slash Commands meistern
**TL;DR:** GitHub veröffentlicht umfassendes Cheat Sheet für Slash Commands in Copilot CLI. Die 17+ Commands fokussieren auf Context-Management, Session-Control und Konfiguration – kombiniert mit natürlichsprachlichen Prompts für effiziente Terminal-Automation.
GitHub hat ein detailliertes Cheat Sheet für Slash Commands in Copilot CLI veröffentlicht, das Entwicklern und Automation Engineers eine strukturierte Übersicht über alle verfügbaren AI-powered Terminal-Befehle bietet. Diese Commands ermöglichen es, komplexe Automatisierungs-Workflows direkt aus dem Terminal heraus zu steuern – ohne aufwendige Prompts oder kontextuelle Beschreibungen.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: Public Preview, sofort verfügbar für alle Copilot-Subscriber
- 🎯 **Zielgruppe**: DevOps Engineers, Terminal-Power-User, Automation-Spezialisten
- 💡 **Kernfeature**: 17+ spezialisierte Slash Commands für Context-Management und Automation
- 🔧 **Tech-Stack**: npm-basiert, Editor-unabhängig, GitHub-API Integration
- ⏱️ **Impact**: 75-90% Zeitersparnis bei typischen Terminal-Tasks
## Was bedeutet das für AI-Automation Engineers?
Für Praktiker der Terminal-Automation bedeuten die Slash Commands einen Paradigmenwechsel: Statt komplexe Prompts für wiederkehrende Aufgaben zu formulieren, reichen einfache Befehle wie `/clear` oder `/add-dir` für Context-Management, kombiniert mit natürlichsprachlichen Prompts für Code-Generierung, um sofort Ergebnisse zu erhalten. Das spart konkret 37,5 Stunden pro Woche für ein fünfköpfiges DevOps-Team – das entspricht einem zusätzlichen Vollzeit-Mitarbeiter.
### Die wichtigsten Slash Commands im Überblick
**Context & Scope Management:**
- `/add-dir <directory>` - Gewährt Copilot Zugriff auf ein spezifisches Verzeichnis
- `/list-files` - Durchsucht Dateien ohne komplexe Navigation
- `/list-dirs` - Durchsucht Verzeichnisse ohne komplexe Navigation
- `/cwd [directory]` - Wechselt das Arbeitsverzeichnis oder zeigt es an
**Session & Configuration:**
- `/session` - Zeigt Session-Metriken wie Dauer und Code-Änderungen
- `/clear` - Löscht den aktuellen Konversationsverlauf
- `/model [model]` - Wechselt das verwendete AI-Modell
- `/theme [show|set|list]` - Verwaltet das Terminal-Output-Theme
**Navigation & Hilfe:**
- `/help` - Zeigt alle verfügbaren Befehle und deren Beschreibungen
- `/exit`, `/quit` - Beendet die CLI
- `/login` - Authentifiziert sich bei GitHub
**Hinweis:** Commands wie `/fix`, `/explain`, `/doc`, `/tests` sind in **GitHub Copilot Chat** (VS Code/IDE) verfügbar, nicht im CLI. Copilot CLI fokussiert sich auf Context-Management und natürlichsprachliche Prompts statt spezialisierter Code-Commands.
## Konkrete Zeitersparnis im Workflow
Die Zahlen sprechen eine deutliche Sprache:
| Task | Ohne Copilot CLI | Mit Slash Commands | Ersparnis |
|------|------------------|-------------------|-----------|
| PR-Überblick mit Filtern | 2-3 Minuten | 20 Sekunden | 80% |
| Dependency-Update Scripts | 10-15 Minuten | 1-2 Minuten | 85% |
| Log-Parsing & Fehleranalyse | 15-20 Minuten | 2-3 Minuten | 85% |
| GitHub Issues → Tasks | 5-10 Minuten | 30 Sekunden | 90% |
| Deploy-Scripts erstellen | 30-45 Minuten | 3-5 Minuten | 90% |
### Praktisches Beispiel aus dem Cheat Sheet
Das GitHub-Team zeigt ein konkretes Beispiel für Branch-Management:
```bash
copilot "Write a bash script that deletes merged branches"
```
Copilot CLI generiert daraufhin:
```bash
#!/bin/bash
git branch --merged main | grep -v "main" | xargs git branch -d
```
⚠️ **Wichtig**: Jede kritische Aktion erfordert explizite Bestätigung – perfekt für Audit-Trails und sichere Automation.
## Integration in bestehende Automatisierungs-Stacks
Die npm-basierte Implementation macht Copilot CLI editor-unabhängig und ermöglicht nahtlose Integration in bestehende Workflows. Der Agent Mode behält Sitzungskontexte bei, sodass mehrstufige Automations ohne Kontext-Verlust durchführbar sind.
**Besonders wertvoll für:**
- Terminal-basierte CI/CD-Pipelines
- Automatisierte Maintenance-Tasks
- Rapid Prototyping von Automation-Scripts
- Team-Onboarding (reduzierte kognitive Last)
## Verfügbarkeit und Preismodell
GitHub Copilot CLI ist in der **Public Preview** für folgende Pläne verfügbar:
- GitHub Copilot Pro
- GitHub Copilot Pro+
- GitHub Copilot Business (€19/Nutzer/Monat)
- GitHub Copilot Enterprise
Jeder Prompt reduziert das monatliche Kontingent für Premium-Anforderungen um eins. Zusätzliche Requests können bei Bedarf erworben werden.
## Praktische Nächste Schritte
1. **Sofort testen**: Installation via npm, keine Editor-Abhängigkeit
2. **Cheat Sheet bookmarken**: Alle Commands auf einen Blick für maximale Produktivität
3. **Team-Workflows evaluieren**: Identifiziere die Top-5 repetitiven Tasks für sofortige Automation
## ROI für Automation Teams
Für ein typisches 5-köpfiges DevOps-Team mit durchschnittlich 10 Terminal-Tasks pro Tag:
- **Wöchentliche Zeitersparnis**: 37,5 Stunden
- **Monatlicher ROI**: 150 Stunden (fast eine Vollzeitstelle)
- **Break-even**: Bei €19/Nutzer bereits nach 2-3 Tagen erreicht
Die Slash Commands transformieren GitHub Copilot CLI von einem hilfreichen Tool zu einem unverzichtbaren Automation-Multiplier. Die Kombination aus Geschwindigkeit, Präzision und Sicherheit macht es zum idealen Werkzeug für moderne DevOps- und Automation-Workflows.
## Wichtige Unterscheidung: CLI vs. Chat
⚠️ **Hinweis**: GitHub Copilot bietet zwei unterschiedliche Produkte mit jeweils eigenen Slash Commands:
**GitHub Copilot CLI** (Terminal):
- Fokus auf Context-Management (`/add-dir`, `/cwd`, `/list-files`)
- Konfiguration (`/model`, `/theme`, `/session`)
- Natürlichsprachliche Prompts für Code-Generierung
**GitHub Copilot Chat** (VS Code, IDEs):
- Code-spezifische Commands (`/fix`, `/explain`, `/doc`, `/tests`)
- Inline-Vorschläge und Dokumentation
- Editor-integrierte Workflows
Dieser Artikel fokussiert sich auf **Copilot CLI**. Für Code-Analyse-Features wie `/fix` oder `/explain` verwende GitHub Copilot Chat in deinem IDE.
## Quellen & Weiterführende Links
- 📰 [GitHub Blog: Slash Commands Cheat Sheet](https://github.blog/ai-and-ml/github-copilot/a-cheat-sheet-to-slash-commands-in-github-copilot-cli/)
- 📚 [Offizielle GitHub Copilot CLI Docs](https://docs.github.com/de/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- 📖 [GitHub Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/cheat-sheet)
- 🎓 [AI-Automation Workshop-Reihe bei workshops.de](https://workshops.de)