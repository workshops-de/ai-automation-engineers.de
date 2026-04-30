---
layout: '../../../layouts/BlogLayout.astro'
title: 'Pipeboard MCP: Meta, Google & TikTok Ads direkt mit Claude steuern'
description: 'Pipeboard MCP: Meta, Google & TikTok Ads direkt mit Claude steuern'
pubDate: '2026-04-30'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=600&fit=crop'
---

**TL;DR:** Pipeboard stellt MCP-Server für Meta Ads, Google Ads und TikTok Ads bereit – Claude bekommt damit vollen lesenden und schreibenden Zugriff auf Ad-Accounts, ohne ein einziges Skript schreiben zu müssen.

Wer Paid-Advertising-Workflows bisher manuell durch Exports, Copy-Paste oder selbstgebaute API-Integrationen gesteuert hat, bekommt mit Pipeboard eine fertige MCP-Schicht, die sich in 2 Minuten in Claude (Pro/Max oder Code) einhängen lässt. Der MCP-Server verbindet sich über OAuth direkt mit den offiziellen Ads-APIs – gespeicherte Credentials gibt es keine, Zugriff lässt sich jederzeit widerrufen.

## Was ist neu?

Pipeboard bietet drei separate MCP-Endpunkte: `https://meta-ads.mcp.pipeboard.co/`, `https://google-ads.mcp.pipeboard.co/` und `https://tiktok-ads.mcp.pipeboard.co/`. Alle drei lassen sich entweder als Custom Connector in Claude.ai/settings/connectors eintragen oder per CLI-Befehl in Claude Code einbinden. Der Meta-Ads-Server umfasst laut Pipeboard über 30 Tools – darunter Kampagnen erstellen, pausieren und duplizieren sowie Targeting nach Interessen, Verhalten, Demographics und Geo-Targeting. Für Google Ads und TikTok Ads stehen vergleichbare Tool-Sets bereit, inklusive Keyword-Management, Bid-Optimierung und Creative-Analyse. Pipeboard hat die offizielle App-Prüfung von Meta durchlaufen.

Der entscheidende Unterschied zu manuellen Dashboards oder klassischen Reporting-Tools: Claude kann Ad-Daten nicht nur lesen, sondern auch direkt Änderungen vornehmen – neue Kampagnen werden sicherheitshalber standardmäßig pausiert erstellt, bevor ein Mensch sie aktiviert.

## Was bedeutet das für Automation Engineers?

Das verändert konkret, wie Workflows rund um Paid Advertising aufgebaut werden: Statt separate API-Wrapper in n8n, Make oder Python zu bauen, reicht ein einziger MCP-Eintrag, um Claude als vollständige Ads-Steuerungsschicht zu nutzen – sowohl im interaktiven Chat als auch als Tool-Provider in agentischen Pipelines. Wer Claude bereits für andere Automatisierungen einsetzt (Cowork, Claude Code, Custom Connectors), kann Pipeboard nahtlos in denselben Stack integrieren. Für Agenturen oder Teams, die mehrere Ad-Accounts verwalten, lassen sich read-only Token und account-spezifische Zugriffsrechte granular konfigurieren.

## Quellen & Weiterführende Links

- 📰 [Pipeboard – Offizielle Website](https://pipeboard.co)
- 📚 [Meta Ads MCP Guide](https://pipeboard.co/guides/meta-ads-mcp) | [Google Ads MCP Guide](https://pipeboard.co/guides/google-ads-mcp) | [TikTok Ads MCP Guide](https://pipeboard.co/guides/tiktok-ads-mcp)
- 🎓 **Workshops & Kurse** (verifiziert via workshops.de API):
  - [Claude: Modul 2 – Agents mit Claude, CoWork, Skills und Plugins](https://workshops.de/seminare-schulungen-kurse/claude-agents-cowork-skills-plugins) — MCP-Server & Claude Agents im Praxiseinsatz
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/en/courses/software-engineering-claude-code) — MCP-Server selbst bauen und in CI/CD integrieren
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/en/courses/n8n-multi-agent-systeme-mcp-server) — MCP-Integration in n8n-Workflows