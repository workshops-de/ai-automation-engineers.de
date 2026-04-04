---
layout: '../../../layouts/BlogLayout.astro'
title: 'Claude API SKILL.md: Anthropics offizieller Deep-Dive für LLM-App-Entwicklung'
description: 'Claude API SKILL.md: Anthropics offizieller Deep-Dive für LLM-App-Entwicklung'
pubDate: '2026-04-04'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1633706974456-f24d52958708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxDbGF1ZGUlMjBBUEklMjBTS0lMTG1kJTIwQW50aHJvcGljcyUyMFRMRFIlMjBBbnRocm9waWMlMjBoYXR8ZW58MXwwfHx8MTc3NTMwMTI0OHww&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Anthropic hat mit dem `claude-api` SKILL.md einen umfassenden Architektur-Guide für die Entwicklung produktionsreifer LLM-Anwendungen veröffentlicht. Er deckt alles ab – von der Spracherkennung über Architektur-Patterns (Single Call / Workflow / Agent) bis hin zu Adaptive Thinking, Tool Use, Streaming, Batches, Prompt Caching und Compaction – optimiert für Claude Opus 4.6, Sonnet 4.6 und Haiku 4.5.

Wer mit dem Anthropic SDK produktive KI-Anwendungen baut, bekommt mit dem offiziellen `SKILL.md` aus dem `anthropics/skills`-Repository endlich eine verbindliche Architektur-Referenz an die Hand. Der Guide ist nicht nur Dokumentation – er ist ein strukturiertes Entscheidungsframework, das Entwickler:innen durch die wachsende Komplexität der Claude-Plattform lotst.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Jetzt im öffentlichen GitHub-Repo `anthropics/skills` abrufbar
- 🎯 **Zielgruppe**: AI Engineers, Backend-Entwickler:innen und Automatisierungs-Expert:innen, die produktive Apps mit dem Anthropic SDK bauen
- 💡 **Kernfeature**: Vollständiges Architektur-Entscheidungsframework für LLM-Apps – von Simple Calls bis zu autonomen Multi-Agent-Systemen
- 🔧 **Tech-Stack**: Python, TypeScript, Java, Go, Ruby, C#, PHP – alle offiziell unterstützt
- 💰 **Kostenrahmen**: Opus 4.6 ab $5/$25 per Million Tokens (Input/Output), Sonnet 4.6 $3/$15, Haiku 4.5 optimiert für niedrige Kosten (Budget Tier)

## Was bedeutet das für AI Automation Engineers?

Das `SKILL.md` löst ein konkretes Problem: Mit Claude Opus 4.6, Sonnet 4.6 und Haiku 4.5 stehen heute drei Modelle zur Verfügung, die sich in Kosten, Kontext-Window und Reasoning-Tiefe deutlich unterscheiden. Dazu kommen sechs offizielle SDK-Sprachen, drei Architektur-Tiers und ein halbes Dutzend spezialisierter API-Endpoints. Ohne Leitfaden verliert man schnell den Überblick.

Das Dokument beantwortet die zentrale Frage aller Automatisierungs-Projekte: **Welches Architektur-Muster passt zu welchem Use Case?** Und das mit einer klaren Entscheidungsmatrix, die man direkt ins nächste Projekt-Briefing kopieren kann.

### Drei Architektur-Tiers – und wann man welche wählt

Das Herzstück des Guides ist die Tiering-Logik. Nicht jede Aufgabe braucht einen Agenten – im Gegenteil:

**Tier 1 – Single LLM Call** (einfachster Einstieg):
Klassifikation, Zusammenfassung, Extraktion, Q&A. Ein Request, eine Response. Der Guide empfiehlt, hier zu starten und nur bei echtem Bedarf zu eskalieren.

**Tier 2 – Workflow mit Tool Use** (mittlere Komplexität):
Multi-Step-Pipelines, bei denen der Code die Orchestrierung übernimmt. Claude API mit Tool Use – man kontrolliert den Loop selbst. Ideal für deterministische Automatisierungen mit klaren Übergabepunkten.

**Tier 3 – Agentic Loop / Agent SDK** (höchste Flexibilität):
Wenn Claude selbst entscheiden soll, welche Tools wann genutzt werden. Der `Agent SDK` für Python und TypeScript bringt Built-in-Tools (File, Web, Terminal), Permissions, Safety und MCP-Support out of the box.

> Im Workflow-Kontext bedeutet das: Zapier/Make/n8n-Flows lassen sich hervorragend auf Tier 1 und Tier 2 abbilden. Der Agent SDK ist die richtige Wahl, wenn ein Subagent eigenständig Codebases analysieren oder komplexe Research-Tasks durchführen soll.

### Adaptive Thinking & Effort – das Ende fixer Token-Budgets

Ein entscheidender Breaking Change für bestehende Implementierungen: **`budget_tokens` ist für Opus 4.6 und Sonnet 4.6 deprecated.** Stattdessen gilt:

- **`thinking: {type: "adaptive"}`** – Claude entscheidet dynamisch, wie viel es denkt. Kein festes Token-Budget mehr nötig.
- **`output_config: {effort: "low"|"medium"|"high"|"max"}`** – Steuert die Denktiefe und den Gesamttoken-Verbrauch. `max` ist Opus 4.6 exklusiv.
- Für Subagenten in Automations-Pipelines empfiehlt sich `effort: "low"` zur Kostenkontrolle; für komplexe Reasoning-Tasks `effort: "max"`.

### Prompt Caching – der unterschätzte ROI-Hebel

Für Automation Engineers mit repetitiven Workflows ist Prompt Caching der effektivste Hebel zur Kostensenkung. Das SKILL.md gibt dazu eine klare Architektur-Regel:

**Render-Reihenfolge: `tools` → `system` → `messages`**

Stabiles Content zuerst (System-Prompt, Tool-Definitionen), volatile Inhalte (Timestamps, Request-IDs, variable Fragen) nach dem letzten `cache_control`-Breakpoint. Ein Minimum von ~1024 Tokens ist erforderlich, damit ein Prefix überhaupt gecacht wird.

> 💡 **Häufige Falle:** `datetime.now()` im System-Prompt oder unsortierte JSON-Keys invalidieren den Cache bei jedem Request still und leise. Immer `usage.cache_read_input_tokens` im Monitoring tracken.

### Compaction – für Long-Running-Workflows unverzichtbar

Bei Automations-Workflows, die über viele Turns laufen (z. B. mehrstündige Agent-Sessions), löst Compaction das Context-Window-Problem. Das Beta-Feature komprimiert ältere Conversation-History automatisch bei langen Kontexten (z. B. 1M Token Context-Window).

**Kritisch:** Man muss `response.content` (nicht nur den Text-String!) zurück in die Message-History appenden. Compaction-Blocks in der Response müssen erhalten bleiben – sonst geht der komprimierte State verloren.

### Streaming – Default für alles mit langen Outputs

Der Guide ist eindeutig: Streaming ist Pflicht für Requests mit langen Inputs, langen Outputs oder hohem `max_tokens` (insbesondere für Opus 4.6 mit bis zu 128K Output-Tokens).

> Opus 4.6 unterstützt bis zu 128K Output-Tokens – aber nur via Streaming, da sonst HTTP-Timeouts greifen.

### Batches – 50% Kostenersparnis für nicht-zeitkritische Pipelines

Für Bulk-Verarbeitung (Content-Generierung, Daten-Extraktion, Klassifikation im großen Stil) bieten Batches einen direkten Cost-Benefit: **50% günstiger** als synchrone Requests, asynchron verarbeitet via `POST /v1/messages/batches`.

### Tool Runner vs. Manueller Loop

Der Guide unterscheidet explizit zwischen zwei Implementierungsansätzen für Tool Use:

- **Tool Runner (empfohlen):** SDK übernimmt Call → Execute → Loop automatisch. Weniger Code, weniger Fehlerquellen.
- **Manueller Loop:** Maximale Kontrolle für Approval Gates, Custom Logging, konditionelle Ausführung.

Für Standard-Automatisierungen: Tool Runner. Für Compliance-kritische Workflows mit Human-in-the-Loop: Manueller Loop.

## Praktische Nächste Schritte

1. **SKILL.md lesen und als Architektur-Referenz bookmarken**: Das Dokument direkt unter `anthropics/skills` → `skills/claude-api/SKILL.md` speichern – es dient als Living Document für alle Claude-API-Projekte.
2. **Bestehende Implementierungen prüfen**: Nutzt euer Code noch `budget_tokens` oder den deprecated `output_format`-Parameter? Migration auf `thinking: {type: "adaptive"}` und `output_config: {format: {...}}` jetzt einplanen.
3. **Kosten-Audit via Prompt Caching**: Mit `usage.cache_read_input_tokens` tracken, wie viel tatsächlich gecacht wird. Einfache Optimierungen am System-Prompt-Layout können hier 30-50% Kostenersparnis bringen.
4. **Architektur-Tier re-evaluieren**: Laufen eure Workflows im richtigen Tier? Viele Automations-Use-Cases sind auf Tier 3 (Agenten) überengineert – Tier 1 oder Tier 2 reicht oft aus und ist 2-5x günstiger.
5. **Claude Schulung**: Tiefer einsteigen mit den offiziellen Workshops der workshops.de-Familie.

## Quellen & Weiterführende Links

- 📰 [Original SKILL.md auf GitHub](https://github.com/anthropics/skills/blob/main/skills/claude-api/SKILL.md)
- 📚 [Anthropic API Dokumentation](https://docs.anthropic.com)
- 📢 [Claude Sonnet 4.6 Launch Announcement](https://www.anthropic.com/news/claude-sonnet-4-6)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [Claude: Modul 1 – Chat und die Anthropic Platform](https://workshops.de/kurse/claude-for-beginner) — Einstieg in Claude und die Anthropic Platform, ideal für alle, die strukturiert starten wollen
  - Claude: Modul 2 – Agents mit Claude, CoWork, Skills und Plugins — Workflows, eigene Skills und Plugins für Teams (⚠️ Hinweis: Kurs aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Termine)
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/kurse/software-engineering-claude-code) — Von der Installation bis zum Multi-Agent-Workflow inkl. CI/CD-Integration und eigenem MCP-Server

---
## Technical Review vom 2026-04-04

**Review-Status**: PASSED_WITH_MINOR_CHANGES

### Vorgenommene Änderungen:
1. **Haiku 4.5 Pricing**: Konkrete Preise ($1/$5) entfernt → generische Formulierung "Budget Tier", da nicht offiziell in Anthropic Docs verifizierbar
2. **Compaction Details**: Spezifische Header- und Threshold-Angaben entfernt, da nicht in offizieller API-Dokumentation bestätigt
3. **Streaming max_tokens**: Konkrete Empfehlungen (~16000/~64000) entfernt → Fokus auf konzeptionelle Empfehlung mit 128K Opus-Beispiel
4. **Modul 2 Kurs-Link**: Link entfernt und als "in Planung" markiert, da nicht in workshops.de API/Suche gefunden

### Verifizierte Fakten:
- ✅ Modellnamen (Opus 4.6, Sonnet 4.6, Haiku 4.5) korrekt via Anthropic Docs
- ✅ Opus 4.6 Pricing ($5/$25) und Sonnet 4.6 Pricing ($3/$15) bestätigt
- ✅ `budget_tokens` deprecated für Opus 4.6 / Sonnet 4.6 – Migration zu `thinking: {type: "adaptive"}` mit `effort` Parameter
- ✅ Architektur-Patterns (Tier 1/2/3) konzeptionell korrekt
- ✅ Prompt Caching Konzepte valide
- ✅ Batches 50% Kostenersparnis bestätigt
- ✅ 128K Output-Tokens für Opus 4.6 via Streaming korrekt
- ✅ Tool Runner vs. Manual Loop Unterscheidung konzeptionell valide

### Link-Verifikation:
- ✅ 3 externe Links geprüft (GitHub, Anthropic Docs, Anthropic News) – alle erreichbar
- ⚠️ 3 workshops.de Kurs-Links geprüft:
  - Modul 1 & 3: URLs funktionieren (evtl. 301 Redirect zu `/seminare-schulungen-kurse/`)
  - Modul 2: Nicht gefunden → als "in Planung" markiert

### Empfehlungen:
- 💡 Artikel ist technisch solide und basiert auf offiziellem Anthropic SKILL.md
- 💡 Einige Details (z. B. Compaction-Header, max_tokens-Werte) könnten aus nicht-öffentlichen Quellen oder frühen Beta-Docs stammen – wurden konservativ angepasst
- 📚 Für exakte API-Parameter immer auf offizielle Anthropic Platform Docs verweisen

**Reviewed by**: Technical Review Agent  
**Verification Sources**: Anthropic Platform Docs, Claude API Docs (April 2026), workshops.de API Search  
**Confidence Level**: HIGH