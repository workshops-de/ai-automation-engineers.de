---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub MCP Server: Secret Scanning und Push Protection gegen Prompt Injection'
description: 'GitHub erweitert den MCP Server um Secret Scanning und Push Protection - automatische Blockierung von Secrets in Tool-Calls'
pubDate: '2025-09-09'
author: 'Robin Böhm'
tags: ['GitHub', 'Security', 'MCP', 'AI', 'DevSecOps', 'Secret Scanning']
category: 'AI Trends'
readTime: '8 min read'
image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---

**TL;DR:** GitHub's MCP Server scannt ab August 2025 automatisch alle Tool-Call-Eingaben in öffentlichen Repositories auf Secrets und blockiert diese standardmäßig. Zusätzlich gibt es neue Toolsets für GitHub Actions, Gists, Sub-Issues und verbesserte PR-Workflows.

Am 13. August 2025 hat GitHub bedeutende Sicherheitserweiterungen für den Remote MCP Server veröffentlicht. Die wichtigste Neuerung: **Automatisches Secret Scanning mit Push Protection** für alle Tool-Calls in öffentlichen Repositories. Aber das ist noch nicht alles - es gibt auch eine ganze Reihe neuer Tools und Verbesserungen, die die Arbeit mit dem GitHub MCP Server noch effizienter machen.

## Die wichtigsten Fakten

- 📅 **Zeitpunkt**: 13. August 2025
- 💰 **Kosten**: Kostenlos für alle Plan-Typen
- 🎯 **Zielgruppe**: Alle Nutzer des GitHub MCP Servers
- 🔧 **Technologie**: Secret Scanning, Push Protection, neue Toolsets
- 📊 **Impact**: Signifikante Verbesserung der Sicherheit gegen Prompt Injection

## Was ist neu?

### Secret Scanning & Push Protection

Der Remote GitHub MCP Server überprüft jetzt **alle Tool-Call-Eingaben in öffentlichen Repositories** auf exponierte Secrets. Wird ein geheimes Token oder Passwort erkannt, wird der Aufruf standardmäßig blockiert - mit klaren Details und der Option, bei Bedarf bewusst fortzufahren.

**Das Problem, das gelöst wird:** Öffentliche Inhalte wie READMEs, Issues oder PR-Kommentare können manipulierte Anweisungen enthalten, die AI-Agenten dazu bringen, Credentials in MCP Tool-Calls einzufügen. Diese neue Funktion kappt diesen häufigen Exfiltrationspfad, bevor Secrets die Kontrolle verlassen.

### Kernfunktionen im Überblick

**🛑 Blockierung mit Bypass-Option**
- Automatische Blockierung bei erkannten Secrets
- Klare Anzeige mit Details zum blockierten Secret
- Bypass-Links für bewusste Weitergabe (außer bei deaktivierter Push Protection)
- Agent-freundliche, maschinenlesbare Antworten

**🛡️ Schutz gegen Prompt Injection**
- Verhindert Secret-Leaks durch manipulierte Prompts
- Scannt Daten in beide Richtungen (read und write)
- Reduziert Risiko von Token-Exfiltration über Tool-Parameter

## Neue Tools und Verbesserungen

### GitHub Actions Toolset
Das neue Actions-Toolset revolutioniert die CI/CD-Integration:
- **Workflow Discovery & Dispatch**: Workflows direkt aus AI-Agenten starten
- **Status-Monitoring**: Live-Überwachung laufender Workflows
- **Log-Tailing**: Echtzeit-Logs für schnelleres Debugging
- **Agentic Debugging**: AI-gestütztes Debugging fehlgeschlagener Builds

### Gist Toolset
Schnelles Teilen ohne Repository-Overhead:
- Erstellen von Code-Snippets direkt aus dem MCP-Kontext
- Teilbare Artefakte ohne Repository-Zugriff
- Perfekt für Quick Shares und temporäre Code-Beispiele

### Sub-Issues Management
Granulare Aufgabenverwaltung mit neuen Tools:
- `add_sub_issue`: Unter-Issues anlegen
- `list_sub_issues`: Übersicht aller Sub-Issues
- `remove_sub_issue`: Löschen von Unter-Aufgaben
- `reprioritize_sub_issue`: Neuordnung der Prioritäten

### PR Workflow Upgrades
Erweiterte Pull Request Kontrolle:
- **Draft-Toggle**: PRs als Entwurf markieren/freigeben
- **Reviewer Management**: Automatisches Anfragen von Reviews
- **Erweiterte Metadaten**: Mehr Kontrolle über PR-Status

### Weitere Verbesserungen

**Discussions auf Org-Level**
- Organisationsweite Diskussionen verwalten
- Erweiterte Felder: Author, UpdatedAt, CreatedAt, Title
- Verbesserte Sortieroptionen

**GraphQL Migration & Pagination**
- `list_issues` nutzt jetzt GraphQL statt REST
- Zuverlässige Pagination für große Datenmengen
- Bessere Performance bei umfangreichen Abfragen

**File Retrieval Quality**
- Intelligenteres Path-Matching
- `/` als Standard-Verzeichnis
- SHA-Support in `get_file_contents`

**Search Clarity**
- Separate Tools für Issues und Pull Requests
- Getrennte Organisation- und User-Suche
- Optimierte `search_code` Parameter

## Technische Details

### Funktionsweise des Secret Scanning

Der MCP Server nutzt GitHubs bewährte Secret-Detection-Engine:

1. **Input-Analyse**: Alle eingehenden Tool-Calls werden gescannt
2. **Pattern-Matching**: Erkennung bekannter Secret-Patterns
3. **Blockierung**: Bei Match wird der Call blockiert
4. **Feedback**: Klare Fehlermeldung mit Bypass-Option

### Einschränkungen

- Funktioniert **nur für öffentliche Repositories** (Private Repos mit Secret Protection License folgen)
- Eliminiert nicht alle Risiken (keine Non-Secret-Datenlecks, Model-only Behaviors)
- Erfordert weiterhin Security Best Practices (Least-Privilege Tokens, regelmäßige Rotation)

## Was bedeutet das für die Praxis?

### Für Entwickler
- **Sicherere AI-Integration**: Reduziertes Risiko bei der Arbeit mit AI-Agenten
- **Mehr Automatisierung**: Neue Tools ermöglichen tiefere GitHub-Integration
- **Besseres Debugging**: Actions-Toolset beschleunigt CI/CD-Workflows

### Für Unternehmen
- **Compliance**: Verbesserte Sicherheit für regulierte Umgebungen
- **Risikominimierung**: Automatischer Schutz vor Secret-Leaks
- **Kosteneffizienz**: Features sind kostenlos verfügbar

## Vergleich mit bestehenden Lösungen

| Feature | GitHub MCP Server | Traditionelle Lösungen | Andere MCP Server |
|---------|-------------------|------------------------|-------------------|
| Secret Scanning | ✅ Automatisch | ❌ Manuell | ❌ Nicht vorhanden |
| Push Protection | ✅ Integriert | ⚠️ Separates Tool | ❌ Nicht verfügbar |
| Prompt Injection Schutz | ✅ Built-in | ❌ | ❌ |
| Kosten | Kostenlos | Kostenpflichtig | Variiert |

## Roadmap & Ausblick

**Q4 2025**: Secret Scanning für private Repositories (mit License)
**Q1 2026**: Erweiterte Pattern-Erkennung
**2026**: Integration weiterer Security-Features

## Verfügbarkeit & Preise

- **Beta-Zugang**: Sofort verfügbar
- **General Availability**: Bereits verfügbar für öffentliche Repos
- **Preismodell**: Kostenlos für alle GitHub-Pläne
- **Private Repos**: Coming Soon (mit Secret Protection License)

## Quick Links & Ressourcen

- 📚 [Offizielle Dokumentation](https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-and-the-github-mcp-server)
- 🐙 [GitHub MCP Server Repository](https://github.com/github/github-mcp-server)
- 🎥 [Release Notes](https://github.com/github/github-mcp-server/releases)
- 💬 [Community Discussion](https://github.com/orgs/community/discussions/categories/copilot-conversations)
- 📰 [Offizielles Announcement](https://github.blog/changelog/2025-08-13-github-mcp-server-secret-scanning-push-protection-and-more/)

## Fazit

GitHub setzt mit diesen Updates neue Standards für die sichere Integration von AI-Tools in Entwicklungsworkflows. Die Kombination aus automatischem Secret Scanning und den neuen Toolsets macht den MCP Server zu einem noch mächtigeren Werkzeug für moderne Entwicklungsteams.

Die wichtigste Erkenntnis: **Sicherheit muss nicht kompliziert sein**. Mit der automatischen Blockierung von Secrets und klaren Bypass-Optionen schafft GitHub eine Balance zwischen Sicherheit und Produktivität.

**Next Steps für Interessierte:**
1. MCP Server in eurem GitHub-Account aktivieren
2. Neue Actions- und Gist-Toolsets ausprobieren
3. Security-Policies für euer Team anpassen

Die Zukunft der AI-gestützten Entwicklung ist sicherer geworden – und das ist erst der Anfang! 🚀

---

*Letzte Aktualisierung: 09. September 2025*
*Quellen: GitHub Blog, GitHub Documentation, GitHub MCP Server Repository*