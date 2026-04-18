---
layout: '../../../layouts/BlogLayout.astro'
title: 'Emoji-Listen in Sekunden: Terminal-App live gebaut mit GitHub Copilot CLI'
description: 'Emoji-Listen in Sekunden: Terminal-App live gebaut mit GitHub Copilot CLI'
pubDate: '2026-04-18'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1689289850550-4205d7c4230c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxFbW9qaUxpc3RlbiUyMGluJTIwU2VrdW5kZW4lMjBUZXJtaW5hbEFwcCUyMFRMRFIlMjBDYXNzaWR5JTIwV2lsbGlhbXN8ZW58MXwwfHx8MTc3NjUxNDk4MHww&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Cassidy Williams von GitHub hat im Livestream "Rubber Duck Thursdays" in wenigen Minuten einen vollständigen Emoji List Generator gebaut – mit GitHub Copilot CLI (Plan Mode + Autopilot Mode), dem Copilot SDK, Claude Sonnet 4.6 und Opus 4.7. Das Ergebnis: eine Open-Source Terminal-App, die Bullet Points per KI in Emoji-Listen umwandelt und direkt ins Clipboard kopiert.

Der Aufwand für den Automation-Stack? Überschaubar. Der Output? Sofort einsetzbar. Genau das macht dieses Projekt so interessant für alle, die KI-gestützte Workflows aufbauen wollen.

## Die wichtigsten Punkte

- 📅 **Veröffentlicht**: 17. April 2026 (Rubber Duck Thursdays Livestream)
- 🎯 **Zielgruppe**: Developer und Automation-Engineers, die eigene CLI-Tools mit KI-Unterstützung bauen wollen
- 💡 **Kernfeature**: Von der Idee zur fertigen Terminal-App in Minuten – dank Plan Mode, Autopilot Mode und GitHub MCP Server
- 🔧 **Tech-Stack**: GitHub Copilot CLI, `@github/copilot-sdk`, `@opentui/core`, `clipboardy`, Claude Sonnet 4.6 + Opus 4.7

## Was bedeutet das für AI Automation Engineers?

Das Projekt zeigt anschaulich, wie sich der gesamte Entwicklungs-Workflow KI-gestützt gestalten lässt – von der Planung bis zur fertigen App. Statt stundenlang Boilerplate zu schreiben, liefert das Zusammenspiel von Plan Mode und Autopilot Mode ein strukturiertes `plan.md`, das als Blueprint für die Implementierung dient.

Im Workflow bedeutet das:

Idee formulieren → Plan Mode erstellt eine strukturierte Spezifikation → Autopilot Mode implementiert autonom → App ist fertig.

Diese Pipeline lässt sich auf beliebige CLI-Tools übertragen: Datenverarbeitung, API-Wrapper, Reporting-Skripte – überall, wo repetitive Terminal-Tasks anfallen.

### Technische Details

**GitHub Copilot CLI – Plan Mode vs. Autopilot Mode**

Der **Plan Mode** (aktivierbar per `Shift + Tab`) analysiert den Request, stellt Klärungsfragen und erzeugt eine strukturierte Implementierungsplanung *bevor* eine einzige Zeile Code geschrieben wird. Das verhindert teure Fehlentscheidungen bei der Architektur und gibt dem Developer volle Kontrolle über den Scope.

Der **Autopilot Mode** übernimmt danach die autonome Ausführung: Er führt Befehle aus, evaluiert Outputs und passt seinen Ansatz an – ohne per-Step-Bestätigung. Ideal für mehrstufige Workflows.

**Verwendeter Tech-Stack:**

- `@opentui/core` → Terminal-UI Framework (von Community-Mitglied Gabor vorgeschlagen)
- `@github/copilot-sdk` → KI-Integration für die Emoji-Generierung
- `clipboardy` → Clipboard-Zugriff

**Multi-Model-Workflow:**
- 🤖 **Claude Sonnet 4.6** → Plan Mode (schnell, strukturiert)
- 🧠 **Claude Opus 4.7** → Implementierung (kürzlich GA-released, hohe Reasoning-Qualität)

**GitHub MCP Server** wurde als Tool-Integration eingesetzt, zusammen mit dem `allow-all`-Flag für maximale Flexibilität bei den erlaubten Tool-Calls.

**Was die App macht:**

Bullet Points eingeben → `Ctrl + S` → KI ersetzt die Aufzählungszeichen durch kontextuell passende Emojis → fertige Liste landet im Clipboard. Einsatzgebiet: Social-Media-Posts, Launch-Announcements, README-Texte.

## Automation-Impact: Was sich hier auf eigene Projekte übertragen lässt

Das eigentlich Spannende an diesem Projekt ist nicht der Emoji-Generator selbst, sondern der **Build-Prozess** dahinter:

**Zeitersparnis konkret:** Mit Plan Mode entfällt das aufwendige manuelle Spec-Schreiben. Der strukturierte `plan.md` Output ist direkt als Projekt-Dokumentation verwendbar.

**Integration in bestehende Stacks:**

Prompt → Plan Mode → Autopilot → Fertige App

Diese Kette funktioniert auch eingebettet in n8n oder Make, wenn der GitHub Copilot CLI-Aufruf als Shell-Step orchestriert wird. Der `allow-all`-Flag macht den Autopilot dabei besonders mächtig für automatisierte Build-Pipelines.

**Vergleich mit anderen Ansätzen:**
- Gegenüber reinem Cursor/Windsurf: Direkter CLI-Fokus, kein IDE-Overhead
- Gegenüber Claude Code: Tiefere GitHub-Integration via MCP Server
- Gegenüber n8n-Code-Nodes: Vollständige Terminal-App statt isolierter Script-Snippets

## Praktische Nächste Schritte

1. **GitHub Copilot CLI ausprobieren**: [Offizielle Getting-Started-Docs](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started) – Plan Mode und Autopilot Mode selbst testen
2. **Emoji List Generator forken**: Das Projekt ist [Open Source auf GitHub](https://github.com/cassidoo/emoji-list-generator) – ideal als Template für eigene CLI-Tool-Ideen
3. **Rubber Duck Thursdays**: Die [YouTube-Streams von GitHub](https://www.youtube.com/@GitHub/streams) liefern regelmäßig Live-Coding-Sessions mit aktuellen Tools
4. **GitHub Copilot SDK erkunden**: [SDK-Dokumentation](https://docs.github.com/copilot/how-tos/copilot-sdk/sdk-getting-started) für eigene KI-gestützte Terminal-Apps
5. **GitHub MCP Server**: [Repository](https://github.com/github/github-mcp-server) für tiefere GitHub-Integration in Automation-Workflows

## Quellen & Weiterführende Links

- 📰 [Original-Artikel auf GitHub Blog](https://github.blog/ai-and-ml/github-copilot/building-an-emoji-list-generator-with-the-github-copilot-cli/)
- 📺 [Rubber Duck Thursdays Livestream (YouTube)](https://www.youtube.com/@GitHub/streams)
- 📚 [GitHub Copilot CLI Docs](https://docs.github.com/copilot/how-tos/copilot-cli/cli-getting-started)
- 📚 [Plan Mode Best Practices](https://docs.github.com/copilot/how-tos/copilot-cli/cli-best-practices)
- 🐙 [Emoji List Generator (Open Source)](https://github.com/cassidoo/emoji-list-generator)
- 🎓 **Workshops & Kurse** (via API verifiziert):
  - [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/seminare/n8n-multi-agent-systeme-mcp-server) — MCP-Server-Integration und Multi-Agent-Workflows, ideal als Ergänzung zum GitHub MCP Server Einsatz
  - [KI Software Engineer: Modul 1 - Language Models, Agents, Workflows](https://workshops.de/seminare/ki-dev-modul-1) — Grundlagen für KI-gestützte Entwicklungs-Workflows wie im Artikel beschrieben

---