---
layout: '../../../layouts/BlogLayout.astro'
title: 'Cursor 3.1 & 3.2: Das Agents Window wird zur Multi-Agent-Zentrale'
description: 'Cursor 3.1 & 3.2: Das Agents Window wird zur Multi-Agent-Zentrale'
pubDate: '2026-04-30'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1610466896927-699424f3c86d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwyfHxDdXJzb3IlMjBEYXMlMjBBZ2VudHMlMjBXaW5kb3clMjBUTERSJTIwTWl0JTIwZGVufGVufDF8MHx8fDE3Nzc1MzI3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Mit den Releases 3.1 (13. April) und 3.2 (24. April) verwandelt Cursor sein Agents Window in eine vollwertige Parallelisierungs-Infrastruktur – `/multitask` ersetzt Queuing durch echte async Subagents, Tiled Layout macht Agent-Outputs nebeneinander vergleichbar, und Multi-root Workspaces ermöglichen Cross-Repo-Änderungen in einer einzigen Session.

Wer bisher mit Cursor Agents gearbeitet hat, kennt das Bottleneck: ein Agent zur Zeit, Aufgaben in der Queue, ständige Kontextwechsel zwischen Repos. Cursor 3.1 und 3.2 adressieren genau das. Die Updates bauen konsequent auf dem Agents Window auf, das mit Cursor 3 im April eingeführt wurde, und machen es zur steuernden Instanz für komplexe Multi-Agent-Workflows – eine Verschiebung, die sich direkt auf den Durchsatz bei größeren Automatisierungsaufgaben auswirkt.

## Was ist neu?

**Tiled Layout (3.1, 13. April)**: Das Agents Window lässt sich jetzt in Kacheln aufteilen. Mehrere Agents laufen parallel in geteilten Panes – Outputs werden nebeneinander sichtbar, Agents per Drag-and-drop neu arrangiert, das Layout bleibt sitzungsübergreifend erhalten. Konkret bedeutet das: Ein Agent kann ein Feature implementieren, während ein zweiter parallel die Tests dafür schreibt, und beide Outputs sind auf einen Blick vergleichbar.

**Canvases (3.2, 24. April)**: Agents können jetzt interaktive Canvases als Antwort rendern – Dashboards, Tabellen, Diagramme, Diffs und To-do-Listen als dauerhafte Artefakte im Seitenpanel. Das ist kein reiner Darstellungs-Gimmick: Canvases bleiben als verifizierbare Outputs in der Session erhalten und lassen sich für Statusübersichten oder Planungsboards innerhalb eines Agent-Workflows nutzen.

**`/multitask` mit async Subagents (3.2, 24. April)**: Das ist die substanziellste Änderung. Statt weitere Requests in die Queue zu schreiben, startet `/multitask` asynchrone Subagents, die größere Tasks aktiv in parallelisierbare Chunks zerlegen. Wer bereits Messages in der Queue hat, kann Cursor anweisen, diese stattdessen per Multitask abzuarbeiten. Das eliminiert sequenzielle Wartezeit bei komplexen, unabhängigen Teilaufgaben.

**Worktrees & Multi-root Workspaces (3.2)**: Worktrees laufen jetzt im Agents Window – isolierte Tasks auf separaten Branches im Hintergrund, mit einem Klick in den lokalen Vordergrund verschiebbar. Multi-root Workspaces gehen einen Schritt weiter: Eine Agent-Session kann einen Workspace aus mehreren Ordnern und Repos adressieren, ohne den Agenten zwischen Repos neu ausrichten zu müssen. Frontend, Backend und Shared Libraries in einem Durchgang.

## Was bedeutet das für Automatisierungs-Workflows?

Das Agents Window wird mit diesen Updates zum Steuerungszentrum für Szenarien, die bisher mehrere IDE-Fenster oder manuelle Koordination erforderten. Multi-root Workspaces lösen einen konkreten Pain-Point bei Monorepo-ähnlichen Setups oder Microservice-Architekturen: Cross-Repo-Änderungen – etwa ein Breaking Change in einer Library mit gleichzeitigen Anpassungen in abhängigen Services – laufen jetzt in einer Session, ohne Kontext-Reset. Die Kombination aus `/multitask` und Tiled Layout schafft die technische Basis, um Cursor als orchestrierenden Layer über mehrere parallele Subagents einzusetzen – ein Muster, das sich gut mit externen Automatisierungstools wie n8n oder Make kombinieren lässt, wenn Cursor-Agents per [Cursor SDK](https://cursor.com/changelog) (ebenfalls neu, seit Ende April in Public Beta) programmatisch angesteuert werden.

## Quellen & Weiterführende Links

- 📰 [Cursor Changelog – Multitask, Worktrees, and Multi-root Workspaces (3.2)](https://cursor.com/changelog)
- 📰 [Cursor Changelog – Tiled Layout and Upgraded Voice Input (3.1)](https://cursor.com/changelog/3-1)
- 📰 [Cursor Changelog – Canvases (Teil von 3.2)](https://cursor.com/changelog)
- 📚 [Offizielle Docs – Agents Window](https://cursor.com/docs/agent/agents-window)
- 📚 [Offizielle Docs – Worktrees](https://cursor.com/docs/configuration/worktrees)
- 🎓 **Workshops & Kurse**:
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server) — Multi-Agent-Architekturen und parallele Workflows in n8n
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/seminare-schulungen-kurse/ki-agenten-mit-n8n) — KI-Agenten und Automatisierung mit n8n
  - [KI Software Engineer: Modul 2 – Evals, Multi-Agentic-Workflows](https://workshops.de/seminare-schulungen-kurse/ki-dev-modul-2) — Multi-Agent-Architekturen und KI-Protokolle praxisnah