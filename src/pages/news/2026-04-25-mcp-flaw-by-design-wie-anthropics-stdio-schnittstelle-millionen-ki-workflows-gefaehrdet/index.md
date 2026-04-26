---
layout: '../../../layouts/BlogLayout.astro'
title: 'MCP-Flaw „By Design": Wie Anthropics STDIO-Schnittstelle Millionen KI-Workflows gefährdet'
description: 'MCP-Flaw „By Design": Wie Anthropics STDIO-Schnittstelle Millionen KI-Workflows gefährdet'
pubDate: '2026-04-25'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1744640326166-433469d102f2?w=1200&h=600&fit=crop'
---

**TL;DR:** OX Security hat eine architektonische Schwachstelle im Model Context Protocol (MCP) von Anthropic aufgedeckt, die beliebige OS-Befehle ohne jede Sanitization ausführt – und Anthropic bezeichnet das als „expected behavior".

Das Model Context Protocol ist seit seiner Einführung im November 2024 zur Standard-Schnittstelle zwischen KI-Agenten und Datenquellen geworden. Unternehmen setzen es als lokalen STDIO-MCP-Server ein, um teure Eigenentwicklungen zu vermeiden. Genau diese Verbreitung macht den Fund von OX Security so brisant: Im STDIO-Interface steckt ein architektonischer Flaw, der Remote Code Execution (RCE) ohne Authentifizierung ermöglicht – und der absichtlich so designt zu sein scheint.

## Was ist neu?

Der Kern des Problems: Die STDIO-Schnittstelle der MCP-SDKs (Python, TypeScript, Java, Rust) führt den konfigurierten Startbefehl für den Server-Prozess aus – unabhängig davon, ob der Prozess erfolgreich startet oder nicht. Ein Angreifer, der eine MCP-Konfiguration (z. B. eine `mcp.json`) kontrollieren oder manipulieren kann, kann damit beliebige OS-Befehle auf dem Host-System ausführen. Keine Sanitization, keine Warnung, kein roter Alarm im Developer-Toolchain. Der Befehl läuft einfach durch.

OX Security hat diese Lücke extensiv getestet, auf produktiven Plattformen mit echten Nutzern ausgenutzt und anschließend in einer koordinierten Disclosure an alle relevanten MCP-Provider gemeldet. Das Ergebnis: über 30 akzeptierte Disclosures, mehr als 10 High/Critical CVEs in Projekten wie LiteLLM, LangChain, LangFlow und Flowise – und ein Root Cause, der bis heute ungepatcht bleibt. Anthropic hat die Einschätzung von OX Security, es handle sich um ein Architekturfehler, abgelehnt und das Verhalten als „by design" und „expected behavior" eingestuft. Die einzige sichtbare Reaktion: ein stilles Update der Security-Guidance mit dem Hinweis, STDIO-MCPs „mit Vorsicht" zu verwenden.

Die Zahlen sprechen für sich: Über 150 Millionen betroffene Downloads, mehr als 7.000 öffentlich exponierte Server, über 200 betroffene Open-Source-Projekte.

## Was bedeutet das für KI-Automatisierer?

Das verändert konkret, wie STDIO-MCP-Setups in Produktions-Workflows bewertet werden müssen. Wer MCP-Server in Automatisierungs-Stacks – sei es mit n8n, Make oder direkt über Claude-Integrationen – einsetzt, trägt die volle Sicherheitsverantwortung selbst. Anthropic hat die Last bewusst auf die Downstream-Entwickler und Nutzer verschoben.

Das bedeutet praktisch: Jede Stelle im Workflow, an der user-kontrollierter Input in eine MCP-Konfiguration fließen kann, ist ein potenzieller RCE-Vektor. Das gilt besonders dann, wenn KI-generierter Code automatisch MCP-Configs schreibt oder anpasst – ein Szenario, das in modernen Agentic-Workflows längst keine Ausnahme mehr ist. Dass GitHub's eigene MCP-Installation als eine der wenigen Ausnahmen gilt, die Security-Gating korrekt implementiert, zeigt: Es ist lösbar. Es ist nur nicht Anthropics Standardverhalten.

Solange der Root Cause im Protokoll selbst ungepatcht ist, sollte jeder MCP-STDIO-Einsatz in Produktionsumgebungen als sicherheitskritische Infrastruktur behandelt werden – mit entsprechender Isolation, Input-Validierung und Zugriffskontrolle auf Konfig-Ebene.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel – SecurityWeek](https://www.securityweek.com/by-design-flaw-in-mcp-could-enable-widespread-ai-supply-chain-attacks/)
- 🔬 [OX Security: The Mother of All AI Supply Chains (vollständiger Report)](https://www.ox.security/blog/the-mother-of-all-ai-supply-chains-critical-systemic-vulnerability-at-the-core-of-the-mcp/)
- 🔬 [OX Security: Technical Deep Dive](https://www.ox.security/blog/the-mother-of-all-ai-supply-chains-technical-deep-dive/)
- 📰 [The Register: MCP 'design flaw' puts 200k servers at risk](https://www.theregister.com/2026/04/16/anthropic_mcp_design_flaw/)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare/ki-agenten-mit-n8n/n8n-multi-agent-systeme-mcp-server) — MCP-Server Development, Memory-Systeme & Production-Ready AI-Automation
  - 💡 Passende Kurse zu KI-Protokollen wie MCP und Multi-Agent-Architekturen befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote.