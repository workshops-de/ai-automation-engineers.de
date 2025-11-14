---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub Copilot August Update: GPT-5 Preview, Claude Opus 4.1 & MCP-Support'
description: 'GitHub launcht massive Updates für Copilot: GPT-5 Preview, Claude Opus 4.1 für Enterprise, MCP-Integration und neue Preismodelle'
pubDate: '2025-08-13'
author: 'Robin Böhm'
tags: ['GitHub', 'Copilot', 'AI', 'GPT-5', 'Claude', 'MCP', 'News']
category: 'AI Trends'
readTime: '5 min read'
image: 'https://images.pexels.com/photos/1181365/pexels-photo-1181365.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---


**TL;DR:** GitHub bringt massive Updates für Copilot: GPT-5 ist jetzt in Public Preview, Claude Opus 4.1 für Enterprise-User verfügbar, der Coding Agent unterstützt jetzt MCP (Model Context Protocol) und ein neues, vereinfachtes Preismodell wurde eingeführt. Außerdem: VS Code Extension wird Open Source.

GitHub hat in seinem August-Newsletter eine Reihe bedeutender Updates für Copilot angekündigt, die die AI-gestützte Entwicklung auf ein neues Level heben. Die Neuerungen reichen von leistungsfähigeren Modellen bis hin zu grundlegenden Architektur-Verbesserungen.

## Die wichtigsten Fakten

- 📅 **Zeitpunkt**: August 2025 Release Roundup
- 🤖 **Neue Modelle**: GPT-5 (Preview) und Claude Opus 4.1
- 🔧 **Technologie**: MCP-Support für erweiterte Integrationen
- 💰 **Preise**: Vereinfachtes Kostenmodell mit Single-Request-Pricing
- 🎯 **Zielgruppe**: Alle Copilot-User (Free bis Enterprise)
- 📊 **Impact**: Deutlich erweiterte Capabilities für autonome Coding-Agenten

## Was ist neu?

### Überarbeitete Pre-release License Terms

GitHub hat die rechtlichen Bedingungen für Preview-Features grundlegend überarbeitet:

**Kernänderungen**
- Gleiche IP-Schutzrechte für Preview-Features wie für GA-Features
- Nutzer behalten Ownership ihrer AI-Inputs
- Garantie: Inputs/Outputs werden nicht für Training verwendet
- Nutzung von Preview-Features mit mehr Vertrauen möglich

## Technische Details

### GPT-5 in Public Preview

**OpenAI GPT-5** ist ab sofort in Public Preview verfügbar für:
- Copilot Chat (alle Modes: Chat, Ask, Agent)
- VS Code Integration
- GitHub.com Web-Interface
- GitHub Mobile App

```javascript
// Verfügbare Modi für GPT-5
const copilotModes = {
  chat: "Interaktive Konversation",
  ask: "Direkte Fragen zu Code",
  agent: "Autonome Task-Ausführung"
};
```

### Claude Opus 4.1 für Enterprise

**Anthropic Claude Opus 4.1** - der Nachfolger von Opus 4 - ist speziell für Enterprise-Kunden verfügbar:
- Erweiterte Reasoning-Fähigkeiten
- Verbessertes Tool-Use
- Logische Zusammenfassungen
- Verfügbar in Copilot Chat
- Enterprise-Admins müssen das Modell via Policy aktivieren

### Vergleich mit bestehenden Lösungen

| Feature | GPT-5 Preview | Claude Opus 4.1 | GPT-4 (bisheriger Standard) |
|---------|---------------|-----------------|----------------------------|
| Verfügbarkeit | Alle User | Enterprise only | Alle User |
| Extended Reasoning | ✅ Stark | ✅ Sehr stark | ✅ Standard |
| Tool Use | ✅ Erweitert | ✅ Optimiert | ✅ Basic |
| Modes | Chat, Ask, Agent | Chat only | Chat, Ask, Agent |
| Mobile Support | ✅ | ❌ | ✅ |

## MCP-Integration: Game Changer für Copilot Agent

Die Integration des **Model Context Protocol (MCP)** ist eine der bedeutendsten Architektur-Änderungen:

### Was ist MCP?
MCP ist ein standardisiertes Protokoll, das es Copilot ermöglicht, mit externen Datenquellen und Tools zu interagieren - ähnlich wie ein USB-C Port für AI-Integrationen.

**Kernfunktionen**
- Konfiguration und Nutzung von MCP-Servern (built-in oder custom)
- Erweiterte Kontextinformationen aus externen Quellen
- Integration mit Tools wie Playwright, Sentry, Notion
- Cross-Platform-Support (VS Code, JetBrains, Claude Desktop)

### Praktische Anwendungsfälle
- **Playwright Integration**: Automatisierte UI-Tests direkt aus Copilot
- **Sentry Connection**: Fehleranalyse mit Live-Daten
- **Notion Sync**: Dokumentation im Coding-Flow abrufen
- **Custom APIs**: Eigene Unternehmenssysteme anbinden

## Vereinfachtes Preismodell

GitHub hat das Kostenmodell für den Copilot Agent radikal vereinfacht:

**Vorher**: Komplexe Berechnung basierend auf Task-Komplexität
**Neu**: Ein einzelner "Copilot Premium Request" pro Session

- ✅ Kosten vorab bekannt
- ✅ Mehr Tasks im monatlichen Limit möglich
- ✅ Keine Überraschungen bei komplexen Aufgaben

## Was bedeutet das für die Praxis?

### Für Entwickler
- **Sofort nutzbar**: GPT-5 Preview in allen Copilot-Modi testen
- **Erweiterte Workflows**: MCP-Server für eigene Tools konfigurieren
- **Bessere Kostenkontrolle**: Klare Preisstruktur ohne versteckte Kosten
- **Migration**: Keine Breaking Changes - alle Features sind additiv

### Für Unternehmen
- **Claude Opus 4.1**: Premium-Modell für komplexe Enterprise-Anforderungen
- **MCP-Integration**: Proprietäre Systeme nahtlos einbinden
- **Compliance**: Verbesserte IP-Schutzrechte für Preview-Features
- **ROI**: Klarere Kostenkalkulation durch neues Preismodell

## IDE-Updates

### Agent Mode überall verfügbar
Der beliebte Agent Mode ist jetzt GA (Generally Available) in:
- ✅ JetBrains IDEs
- ✅ Xcode
- ✅ Eclipse
- ✅ VS Code (bereits länger verfügbar)

### Open Source VS Code Extension
Microsoft hat die Copilot Chat Extension für VS Code open-sourced:
- Community kann Bugs schneller finden und fixen
- Möglichkeit für Custom Extensions
- Transparenz über Funktionsweise

## Weitere Highlights

### GitHub Spark
Die AI-powered App-Development-Plattform ist jetzt in Public Preview:
- Komplette Apps aus natürlicher Sprache generieren
- Integration mit den neuen AI-Modellen
- Fokus auf Rapid Prototyping

### Dependabot Improvements
- Organisation-weite Konfiguration von Private Registry Entries
- Zentrale Verwaltung statt Repository-by-Repository
- Vereinfachte Administration für große Teams

## Roadmap & Ausblick

**Q3 2025**: Weitere Modell-Integrationen geplant
**Q4 2025**: MCP-Ecosystem-Ausbau
**2026**: Vollständige Agent-Autonomie als Ziel

## Verfügbarkeit & Preise

- **GPT-5 Preview**: Ab sofort für alle Copilot-User
- **Claude Opus 4.1**: Enterprise-Plans only
- **MCP-Support**: GA in VS Code, Preview in anderen IDEs
- **Dokumentation**: [docs.github.com/copilot](https://docs.github.com/copilot)

## Quick Links & Ressourcen

- 📚 [MCP Documentation](https://docs.github.com/en/copilot/concepts/about-mcp)
- 🐙 [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- 🎥 [Copilot Agent Demo](https://github.com/features/copilot)
- 💬 [GitHub Community Discussion](https://github.com/orgs/community/discussions)
- 📰 [Official Announcement](https://github.blog)

## Fazit

Mit diesem Update macht GitHub einen gewaltigen Schritt in Richtung vollautonomer Coding-Assistenten. Die Kombination aus leistungsfähigeren Modellen (GPT-5, Claude Opus 4.1), erweiterbarer Architektur (MCP) und verbessertem Pricing macht Copilot zu einem noch mächtigeren Werkzeug für moderne Softwareentwicklung.

**Next Steps für Interessierte:**
1. GPT-5 Preview in VS Code aktivieren und testen
2. MCP-Server für eigene Tools evaluieren
3. Bei Enterprise-Lizenz: Claude Opus 4.1 Policy aktivieren

---

*Letzte Aktualisierung: 13. August 2025*
*Quellen: GitHub Newsletter, GitHub Blog, GitHub Documentation*