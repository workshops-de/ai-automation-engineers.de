---
layout: '../../../layouts/BlogLayout.astro'
title: 'Cursor SDK (Public Beta): Programmatische Agents mit TypeScript bauen'
description: 'Cursor SDK (Public Beta): Programmatische Agents mit TypeScript bauen'
pubDate: '2026-04-30'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1650200579251-5b9c56865a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw0fHxDdXJzb3IlMjBTREslMjBQdWJsaWMlMjBCZXRhJTIwVExEUiUyMEN1cnNvciUyMGhhdHxlbnwxfDB8fHwxNzc3NTMyNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Cursor hat am 29. April 2026 das TypeScript SDK in die Public Beta gestartet – damit lassen sich Coding Agents programmgesteuert starten, steuern und in bestehende Automation-Pipelines einbetten, ohne eigene Agent-Infrastruktur aufzubauen.

Coding Agents entwickeln sich von interaktiven Werkzeugen einzelner Entwickler zur programmierbaren Infrastruktur ganzer Organisationen. Mit `npm install @cursor/sdk` und wenigen Zeilen TypeScript ist ein Agent einsatzbereit – und nutzt dabei dieselbe Runtime, dasselbe Harness und dieselben Frontier-Modelle, die auch Cursor selbst antreiben. Das verändert konkret, wie Automation-Pipelines künftig aussehen: statt monatelanger Eigenentwicklung von Sandboxing, Session-Management und Context-Handling übernimmt das SDK diese Schicht vollständig.

## Was ist neu?

Der Kern des SDK ist `Agent.create()` mit einer schlanken Konfiguration: API-Key, Modell-ID und Laufzeit – lokal (`local: { cwd: ... }`) oder auf einer dedizierten Cloud-VM (`cloud: { repos: [...], autoCreatePR: true }`). SSE-Streaming liefert Events in Echtzeit über `run.stream()`. Durable Agents laufen stabil weiter, auch wenn der Client die Verbindung verliert – über `Agent.getRun(run.id)` wird der Status später wieder abgerufen. Jeder Cloud-Agent bekommt eine isolierte VM mit geklontem Repo und vorkonfigurierter Dev-Umgebung.

Das SDK integriert das vollständige Cursor-Harness: Codebase-Indexing, Semantic Search, MCP-Server-Anbindung via `.cursor/mcp.json`, Skills aus `.cursor/skills/`, Lifecycle-Hooks via `.cursor/hooks.json` und Subagents, die der Hauptagent über das `Agent`-Tool selbst spawnt. Modelle lassen sich pro Call wechseln – von composer-2 bis zu gpt-5.5 – ohne den Agent-Loop zu ändern.

## Was bedeutet das für Automation-Engineers?

Das SDK macht den Cursor-Agent zu einem programmierbaren Baustein, der sich direkt in CI/CD-Pipelines, n8n-Workflows oder eigene Produkte einbetten lässt – vergleichbar mit einem MCP-fähigen Tool-Call, aber mit vollständigem Coding-Agent-Stack dahinter. Teams bei Faire, Rippling und Notion triggern Agents heute schon aus Pipelines heraus, um Commits zu analysieren, CI-Fehler zu debuggen und automatisch PRs zu öffnen, ohne dabei VMs zu provisionieren oder Memory-Limits zu managen. Wer Claude über CoWork oder n8n bereits in Workflows nutzt, kann den Cursor-Agent jetzt als ergänzenden Coding-Baustein danebenstellen – jeder Agent erledigt das, wofür er optimiert ist. Die Abrechnung erfolgt token-basiert nach Verbrauch, kein separater Infrastruktur-Overhead.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel: Build programmatic agents with the Cursor SDK](https://cursor.com/blog/typescript-sdk)
- 📚 [Offizielle Docs: Cursor SDK TypeScript](https://cursor.com/docs/sdk/typescript)
- 📚 [Cloud Agents API Endpoints](https://cursor.com/docs/cloud-agent/api/endpoints)
- 📦 [Cursor SDK auf npm (@cursor/sdk)](https://www.npmjs.com/package/@cursor/sdk)
- 🎓 **Workshops & Kurse**:
  - [KI für Softwareentwickler:innen - Modul 1](https://workshops.de/seminare/ki-dev-modul-1) — Agentic Workflows und CI/CD-Integration praxisnah
  - [KI für Softwareentwickler:innen - Modul 2](https://workshops.de/seminare/ki-dev-modul-2) — Multi-Agent-Architekturen und Qualitätssicherung
  - [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/seminare/n8n-multi-agent-systeme-mcp-server) — MCP-Server und Multi-Agent-Systeme in Production