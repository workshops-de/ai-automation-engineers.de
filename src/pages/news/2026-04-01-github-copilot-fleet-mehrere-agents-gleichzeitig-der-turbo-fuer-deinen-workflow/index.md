---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub Copilot /fleet: Mehrere Agents gleichzeitig – der Turbo für deinen Workflow'
description: 'GitHub Copilot /fleet: Mehrere Agents gleichzeitig – der Turbo für deinen Workflow'
pubDate: '2026-04-01'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---

**TL;DR:** Mit dem neuen `/fleet`-Slash-Command in GitHub Copilot CLI laufen mehrere Sub-Agents gleichzeitig auf verschiedenen Dateien und Modulen. Ein Orchestrator zerlegt Tasks, dispatcht sie parallel und synthetisiert die Ergebnisse – das bedeutet: Refactoring, Tests und Docs in einem einzigen Prompt, zur gleichen Zeit.
GitHub Copilot CLI erreichte im Februar 2026 General Availability und brachte den `/fleet` Command für parallele Multi-Agent-Ausführung. Die offizielle Dokumentation erläutert, wie `/fleet` funktioniert und wie man Prompts schreibt, die optimale Parallelisierung ermöglichen. Für Automation Engineers ist das mehr als ein neues Feature – es ist ein Paradigmenwechsel im agentic Development.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: GitHub Copilot CLI ist seit 25. Februar 2026 allgemein verfügbar (GA); /fleet Command seit März 2026
- 🎯 **Zielgruppe**: Entwicklerteams, DevOps- und Automation Engineers, die große Codebasen bearbeiten
- 💡 **Kernfeature**: Paralleler Multi-Agent-Dispatch über einen zentralen Orchestrator
- 🔧 **Tech-Stack**: GitHub Copilot CLI, Custom Agents via `.github/agents/`, Custom Models pro Sub-Agent, OpenTelemetry-Tracing
## Was bedeutet das für Automation Engineers?
Im Workflow bedeutet das eine fundamentale Beschleunigung von Tasks, die bisher sequenziell abgearbeitet werden mussten. Statt Copilot CLI fünf Mal nacheinander zu fragen, schreibst du einen strukturierten Prompt und der Orchestrator übernimmt die Zerlegung, Verteilung und Synthese.
Das Modell erinnert stark an bekannte Orchestrierungs-Patterns aus n8n oder Make: Ein zentraler Knoten (der Orchestrator) dispatcht parallele Branches (Sub-Agents), die voneinander unabhängig arbeiten, und sammelt am Ende die Outputs zusammen. Der entscheidende Unterschied: Hier passiert das direkt auf dem Filesystem deiner Codebasis.
### Wie der Orchestrator arbeitet
Der `/fleet`-Orchestrator durchläuft intern fünf Schritte:
1. **Decompose** – Der Task wird in diskrete Arbeitspakete mit Dependency-Tracking zerlegt
2. **Identify** – Welche Items sind parallel ausführbar, welche haben Abhängigkeiten?
3. **Dispatch** – Unabhängige Items werden simultan als Background-Sub-Agents gestartet
4. **Poll** – Der Orchestrator wartet auf Completion, dann startet die nächste Wave
5. **Synthesize** – Outputs werden verifiziert und zu finalen Artefakten zusammengeführt
Jeder Sub-Agent bekommt ein eigenes Context Window, teilt aber dasselbe Filesystem. Kommunikation zwischen Agents läuft ausschließlich über den Orchestrator – kein direkter Agent-to-Agent-Channel.
### Workflow-Integration
```
Dein Prompt
    ↓
/fleet <OBJECTIVE>
    ↓
Orchestrator: Decompose + Plan
    ↓        ↓        ↓
Agent A   Agent B   Agent C   ← parallel
(API)     (UI)      (Tests)
    ↓        ↓        ↓
Orchestrator: Poll + Synthesize
    ↓
Finales Ergebnis
```
## Praktische Anwendungsfälle
### Multi-Track Feature Implementation
Das spart konkret Stunden bei Feature-Rollouts über mehrere Layer. Ein Prompt wie dieser lässt alle drei Tracks gleichzeitig laufen:
```
/fleet Implement feature flags in three tracks:
1. API layer: add flag evaluation to src/api/middleware/
2. UI: wire toggle components in src/components/flags/
3. Config: add flag definitions to config/features.yaml
Run independent tracks in parallel. No changes outside assigned directories.
```
### Dokumentation in einem Rutsch
Statt fünf separate Copilot-Sessions für fünf Docs-Dateien:
```
/fleet Create docs for the API module:
- docs/authentication.md covering token flow and examples
- docs/endpoints.md with request/response schemas
- docs/errors.md with error codes and troubleshooting
- docs/index.md linking to all three pages (depends on others finishing first)
```
### Dependency-aware Migrationen
Der Orchestrator respektiert explizit deklarierte Abhängigkeiten – Items 3 und 4 starten erst nach Item 2:
```
/fleet Migrate the database layer:
1. Write new schema in migrations/005_users.sql
2. Update ORM models in src/models/user.ts (depends on 1)
3. Update API handlers in src/api/users.ts (depends on 2)
4. Write integration tests in tests/users.test.ts (depends on 2)
Items 3 and 4 can run in parallel after item 2 completes.
```
## Custom Agents für spezialisierte Jobs
Im Workflow bedeutet das die Möglichkeit, unterschiedliche Modelle und Tool-Sets pro Track einzusetzen. Custom Agents werden in `.github/agents/` definiert:
```yaml
# .github/agents/technical-writer.md
name: technical-writer
description: Documentation specialist
model: claude-sonnet-4
tools: ["bash", "create", "edit", "view"]
```
Dann im Prompt referenzieren:
```
/fleet Use @technical-writer.md for all docs tasks and the default agent for code changes.
```
Das ist besonders mächtig: Schwere Modelle für komplexe Logik, leichtere für Boilerplate – die Kosten- und Geschwindigkeits-Optimierung liegt in deiner Hand.
## Pitfalls und wie du sie vermeidest
### File-Partitionierung ist Pflicht
Sub-Agents teilen das Filesystem **ohne File Locking**. Zwei Agents, die dieselbe Datei beschreiben: Der Letzte gewinnt, lautlos. Kein Error, kein Merge – einfach Überschreibung. Lösung: Jedem Agent explizit distinct Files zuweisen.
### Prompts müssen self-contained sein
Sub-Agents haben keinen Zugriff auf die Konversationshistorie des Orchestrators. Alles, was ein Sub-Agent wissen muss, muss im Dispatch-Prompt enthalten sein – oder in einer Datei, auf die er zugreifen kann.
### Steering während der Ausführung
Nach dem Start kannst du den Orchestrator mit Follow-up-Prompts steuern:
- `Prioritize failing tests first, then complete remaining tasks.`
- `List active sub-agents and what each is currently doing.`
- `Mark done only when lint, type check, and all tests pass.`
### Wann `/fleet` *nicht* verwenden?
Für linear-sequenzielle Single-File-Tasks ist normaler Copilot CLI schneller. Fleet addiert Coordination Overhead – der zahlt sich nur aus, wenn echte Parallelisierbarkeit im Task steckt.
## Vergleich mit anderen Orchestrierungs-Tools
| Feature | /fleet (Copilot CLI) | n8n Multi-Agent | Claude Code Multi-Agent |
|---|---|---|---|
| **Scope** | Codebase / Filesystem | API / Business Workflows | Codebase (terminal-native) |
| **Orchestrierung** | Built-in Orchestrator | Visueller Workflow-Builder | Manuel via Subagents |
| **Custom Agents** | `.github/agents/` | Custom Nodes | Spezifizierbar |
| **Dependency Management** | Explizit im Prompt | Via Workflow-Graph | Manuell |
| **Ideal für** | Code-Tasks, Docs, Tests | Business Process Automation | Komplexes Engineering |
Die Integration mit n8n liegt auf der Hand: `/fleet` für die Code-Ebene, n8n für die Business-Logic-Ebene – beide Systeme ergänzen sich in einem modernen AI-Automation-Stack.
## Praktische Nächste Schritte
1. **Sofort ausprobieren**: Starte mit einem Task mit klaren Outputs und eindeutigen File-Boundaries – z.B. Generierung von Docs für 3-4 Module parallel
2. **Prompting üben**: Nutze `/tasks` nach dem Dispatch, um zu sehen, wie der Orchestrator deinen Prompt zerlegt hat – das ist das schnellste Feedback-Loop für bessere Prompts
3. **Custom Agents definieren**: Erstelle `.github/agents/`-Dateien für wiederkehrende spezialisierte Tasks in deinem Team
4. **Mit CI/CD verbinden**: Nutze `copilot -p "/fleet <TASK>" --no-ask-user` für non-interaktive Automation in Pipelines
## Quellen & Weiterführende Links
- 📰 [GitHub Blog: Power agentic workflows in your terminal with GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/)
- 📚 [GitHub Docs: Running tasks in parallel with /fleet](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet)
- 📚 [GitHub Docs: Best practices for Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/cli-best-practices)
- 🎓 **Workshops & Kurse**:
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Multi-Agent-Workflows bis hin zu CI/CD-Integration: direktes Pendant zu Copilot /fleet
  - Weitere passende Kurse zu Multi-Agent-Systemen und AI-Automation befinden sich in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote
---
## Technical Review vom 2026-04-01
**Review-Status**: PASSED_WITH_CHANGES
### Vorgenommene Änderungen:
1. **Zeile 7343**: Hauptquellen-Link korrigiert – ursprünglicher Link nicht existent, ersetzt durch validen GitHub Blog-Post "Power agentic workflows in your terminal with GitHub Copilot CLI"
2. **Zeile 728**: Verfügbarkeitsdatum präzisiert – GitHub Copilot CLI GA: 25. Februar 2026, /fleet Command verfügbar seit März 2026 (nicht "1. April 2026")
3. **Zeile 413**: Einleitungsabsatz korrigiert – Entfernung des nicht-existenten "Artikel vom 1. April 2026", Verweis auf offizielle Dokumentation
4. **Zeilen 7825-8426**: Kurs-Links verifiziert via Recherche – 2 von 3 Links nicht auffindbar, entfernt und durch Fallback-Text ersetzt. Verbleibender Link auf korrekte URL aktualisiert (seminare-schulungen-kurse statt kurse)
### Verifizierte Fakten:
- ✅ `/fleet` Command existiert und ist verfügbar (verifiziert via GitHub Docs & Changelog)
- ✅ GitHub Copilot CLI GA-Datum: 25. Februar 2026 (verifiziert via GitHub Blog Changelog)
- ✅ Orchestrator-Workflow (Decompose → Dispatch → Synthesize) akkurat beschrieben
- ✅ Custom Agents via `.github/agents/` korrekt dokumentiert
- ✅ Technische Konzepte (Dependency Management, Sub-Agents, File Locking) korrekt dargestellt
### Link-Verifikation:
- ✅ 3 externe Links geprüft:
  - ❌ Original-Link ungültig → korrigiert
  - ✅ https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet → erreichbar
  - ✅ https://docs.github.com/copilot/how-tos/copilot-cli/cli-best-practices → erreichbar
- ✅ workshops.de Kurs-Links geprüft:
  - ✅ 1 Kurs-Link verifiziert (Claude: Agentic Software Engineering) – URL korrigiert
  - 🗑️ 2 Kurs-Links nicht auffindbar → entfernt und durch Fallback ersetzt
### Code-Beispiele:
- ✅ Alle Code-Blöcke sind Prompt-Beispiele und YAML-Configs – keine Syntax-Fehler
- ✅ YAML-Struktur für Custom Agents korrekt (name, description, model, tools)
- ✅ Workflow-Diagramm korrekt strukturiert
### Empfehlungen:
- 💡 Artikel ist technisch korrekt und für Publikation bereit
- 📚 Alle kritischen Issues wurden behoben
**Reviewed by**: Technical Review Agent  
**Verification Sources**: 
- GitHub Docs (fleet command, CLI reference)
- GitHub Blog (Copilot CLI GA announcement)
- GitHub Changelog (copilot-cli releases)
- Perplexity Research (link verification, date validation)
- workshops.de (course verification via search)
**Konfidenz-Level**: HIGH