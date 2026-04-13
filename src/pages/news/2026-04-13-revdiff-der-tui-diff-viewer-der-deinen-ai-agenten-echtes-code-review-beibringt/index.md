---
layout: '../../../layouts/BlogLayout.astro'
title: 'revdiff: Der TUI Diff-Viewer, der deinen AI-Agenten echtes Code-Review beibringt'
description: 'revdiff: Der TUI Diff-Viewer, der deinen AI-Agenten echtes Code-Review beibringt'
pubDate: '2026-04-13'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1740645581717-cb97af1b4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwyfHxyZXZkaWZmJTIwRGVyJTIwVFVJJTIwRGlmZlZpZXdlciUyMFRMRFIlMjByZXZkaWZmJTIwaXN0fGVufDF8MHx8fDE3NzYwNjYyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** revdiff ist ein quelloffener Terminal-Diff-Viewer (in Go geschrieben), der speziell für den Einsatz in AI-Agent-Sessions wie Claude Code entwickelt wurde. Inline-Annotationen werden strukturiert an stdout ausgegeben – und wandern so direkt zurück in den Agent-Loop. Kein Kontextwechsel, kein Copy-Paste.

Code-Review war lange das manuellste Glied in der AI-Automatisierungskette: Der Agent liefert einen Diff, du wechselst ins Browser-UI, kopierst Kommentare zurück in den Chat. revdiff schließt diese Lücke mit einem schlanken Terminal-Overlay, das sich nahtlos in bestehende AI-Coding-Sessions einbettet.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Jetzt verfügbar – aktuellste Version v0.17.0 (April 2026), 247 GitHub Stars
- 🎯 **Zielgruppe**: Entwickler, die mit Claude Code, Codex, pi oder anderen agentic Coding-Tools arbeiten
- 💡 **Kernfeature**: Strukturierter Annotation-Output direkt zu stdout → sofort pipeable in den Agent-Loop
- 🔧 **Tech-Stack**: Go, TUI (bubbletea/lipgloss), Git/Mercurial, Plugins für Claude Code, Codex & pi

## Was bedeutet das für Automation Engineers?

Der klassische Human-in-the-Loop bei Code-Änderungen sieht heute oft so aus:

> Agent schreibt Code → Diff in IDE anschauen → Kommentare copy-pasten → Agent nochmal anstubsen

revdiff macht daraus einen sauberen, terminal-nativen Loop:

```
revdiff (TUI overlay) → Annotationen zu stdout → Agent verarbeitet Feedback → Diff nochmal reviewen
```

Das spart bei jeder Review-Runde konkret 3–5 Minuten an manuellem Copy-Paste-Overhead. Bei mehreren Iterationen pro Stunde summiert sich das auf 30+ Minuten täglich.

### Der Annotation-Output-Flow im Detail

Wenn du revdiff beendest (Taste `q`), werden alle Annotationen in einem strukturierten Format ausgegeben:

```
## handler.go (file-level)
consider splitting this file into smaller modules

## handler.go:43 (+)
use errors.Is() instead of direct comparison

## store.go:18 (-)
don't remove this validation
```

Dieses Format ist KI-lesbar und lässt sich direkt in den nächsten Prompt eines Claude Code Agents einbetten. Das Plugin übernimmt das automatisch.

## Integration in bestehende Agent-Stacks

### Claude Code Plugin

Das ist der Haupt-Use-Case: revdiff liefert ein offizielles Plugin für Claude Code, das sich direkt als `/revdiff`-Slash-Command einbindet.

**Installation:**
```bash
/plugin marketplace add umputun/revdiff
/plugin install revdiff@umputun-revdiff
```

**Typische Nutzung im Workflow:**
```
/revdiff                  -- smart detection: uncommitted, last commit, or branch diff
/revdiff HEAD~1           -- review last commit
/revdiff main             -- review current branch against main
/revdiff --staged         -- review staged changes only
```

Das Plugin erkennt auch Natural-Language-Inputs wie "review diff against main" oder "revdiff for staged changes" – Claude löst den Git-Ref automatisch auf.

### Terminal-Multiplexer als Overlay

Da Claude Code selbst keine interaktiven TUI-Anwendungen darstellen kann, benötigt revdiff einen der folgenden Terminals:

| Terminal | Overlay-Methode |
|----------|----------------|
| **tmux** | `display-popup` (blockiert bis zum Quit) |
| **Zellij** | `zellij run --floating` |
| **kitty** | `kitty @ launch --type=overlay` |
| **wezterm** | `wezterm cli split-pane` |
| **ghostty** | AppleScript split + zoom (macOS) |

Die Erkennung läuft automatisch – revdiff wählt den ersten verfügbaren Multiplexer.

### n8n / Make / Zapier Integration

Für Script-basierte Automation-Pipelines ist der stdout-Output direkt nutzbar:

```bash
# Annotations für Weiterverarbeitung capturen
annotations=$(revdiff main)
if [ -n "$annotations" ]; then
  echo "$annotations" | your-automation-tool
fi
```

Im Workflow bedeutet das: revdiff-Output kann als HTTP-Body in einen n8n-Webhook-Node, als Datei in einen Make-Parser oder als Variable in einen Bash-Step fließen – ohne zusätzliche Parsing-Logik.

### Codex Plugin

Für OpenAI-Codex-Nutzer gibt es ebenfalls ein Plugin mit zwei Skills:
- `/revdiff` – gleicher Workflow wie beim Claude Code Plugin
- `/revdiff-plan` – extrahiert die letzte Codex-Antwort aus Session-Rollout-Files und öffnet sie für Annotationen

## Über den Diff hinaus: Plan-Review und Dokument-Annotation

revdiff kann mehr als Diffs anzeigen. Mit `--only` und `--stdin` lassen sich beliebige Textdateien annotieren:

```bash
# AI-generierten Plan reviewen bevor er approved wird
revdiff --only=docs/plans/feature.md

# Generierte Output-Daten annotieren
terraform plan | revdiff --stdin --stdin-name plan.tf
```

Das `revdiff-planning`-Plugin öffnet revdiff automatisch, wenn Claude den Plan-Modus verlässt – du annotierst, Claude überarbeitet, bis du zufrieden bist. Ein echter Review-Loop ohne manuelles Eingreifen.

### Review History als Fallback

Alle annotierten Sessions werden automatisch unter `~/.config/revdiff/history/` gespeichert. Falls ein Agent-Crash passiert oder der stdout nicht gecaptured wurde, lassen sich die letzten Annotationen über:

```
"locate my latest revdiff review"
"use the annotations from the review I just did"
```

direkt im nächsten Prompt adressieren.

## Praktische Nächste Schritte

1. **Installation via Homebrew**: `brew install umputun/apps/revdiff` oder Binary von den [GitHub Releases](https://github.com/umputun/revdiff/releases)
2. **Plugin aktivieren**: In Claude Code `/plugin marketplace add umputun/revdiff` ausführen
3. **Ersten Review starten**: In einer Claude Code Session `"review diff"` eingeben – der Agent übernimmt die Rest-Logik
4. **Automation vertiefen**: Für mehrstufige Agent-Workflows den Kurs zu Claude Code und Multi-Agent-Architekturen anschauen (Links unten)

## Quellen & Weiterführende Links

- 📰 [GitHub Repository](https://github.com/umputun/revdiff)
- 📚 [Offizielle Dokumentation](https://revdiff.com/docs.html)
- 🌐 [revdiff.com](https://revdiff.com)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [Claude: Modul 3 - Agentic Software Engineering with Claude Code](https://workshops.de/courses/software-engineering-claude-code) — Claude Code Sessions, Multi-Agent-Workflows & CI/CD-Integration
  - [KI: Modul 2 - Evals, Multi-Agentic-Workflows](https://workshops.de/courses/ki-dev-modul-2) — Modernes AI Engineering mit Agents und Workflows
  - [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/courses/n8n-multi-agent-systeme-mcp-server) — Fortgeschrittene Automation mit Memory-Systemen & MCP-Servern