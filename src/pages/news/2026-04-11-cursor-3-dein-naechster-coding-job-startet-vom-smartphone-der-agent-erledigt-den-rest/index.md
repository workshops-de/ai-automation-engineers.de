---
layout: '../../../layouts/BlogLayout.astro'
title: 'Cursor 3: Dein nächster Coding-Job startet vom Smartphone – der Agent erledigt den Rest'
description: 'Cursor 3: Dein nächster Coding-Job startet vom Smartphone – der Agent erledigt den Rest'
pubDate: '2026-04-11'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1656711103646-b1a400b48b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwzfHxDdXJzb3IlMjBEZWluJTIwbiVDMyVBNGNoc3RlciUyMENvZGluZ0pvYiUyMFRMRFIlMjBDdXJzb3IlMjBpc3R8ZW58MXwwfHx8MTc3NTg4Mjc0OHww&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Cursor 3 ist kein Update – es ist ein Paradigmenwechsel. Mit dem neuen Agents Window, paralleler Multi-Agent-Ausführung und der nahtlosen Übergabe zwischen lokaler Umgebung und Cloud verändert sich, wie wir Software bauen, grundlegend. Du definierst die Aufgabe, der Agent übernimmt die Ausführung – auch wenn dein Laptop längst zugeklappt ist.

Am 2. April 2026 hat das Team hinter Cursor (Anysphere Inc.) die Version 3 des KI-gestützten Code-Editors veröffentlicht. Die neue Version ist von Grund auf neu gebaut und stellt nicht mehr das IDE-Erlebnis in den Mittelpunkt, sondern die Agenten. Was bedeutet das konkret für Automatisierungs-Engineers und KI-Praktiker?

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Ab sofort – Update über die bestehende Cursor-Installation (`Cmd+Shift+P → Agents Window`)
- 🎯 **Zielgruppe**: Entwickler und Automatisierungs-Engineers, die mehrere parallele Tasks effizient steuern wollen
- 💡 **Kernfeature**: Agents Window mit paralleler Multi-Agent-Ausführung über lokale und Cloud-Umgebungen hinweg
- 🔧 **Tech-Stack**: Cursor 3, Composer 2 (eigenes Frontier-Coding-Modell), MCP-Plugins, Cloud Agents API

## Was bedeutet das für Automatisierungs-Engineers?

Der klassische Workflow war bisher: Du öffnest deinen Editor, schreibst Code, lässt den Agenten einzelne Tasks übernehmen, wartest auf das Ergebnis, steuerst nach. Mit Cursor 3 verschiebt sich das Verhältnis fundamental.

**Du bist jetzt der Orchestrator, nicht der Ausführende.**

Das Agents Window bündelt alle laufenden Agenten – lokal gestartete, Cloud-Agenten, solche die per Slack-Nachricht, GitHub-Webhook oder sogar vom Smartphone ausgelöst wurden – in einer einzigen Übersicht. Kein Tab-Switching mehr, keine parallelen Terminals, kein manuelles Tracking von Conversations.

Das spart konkret: Statt sequenziell Bug A zu fixen, dann Feature B zu bauen, können beide Agenten gleichzeitig laufen. Wer bisher 3-4 Stunden für iterative Entwicklungszyklen eingeplant hat, kann diese Arbeit jetzt in der Hintergrundausführung delegieren.

### Das Agents Window im Detail

Das neue Interface wurde von Grund auf neu entwickelt – Cursor hat hier nicht ein VS Code-Plugin gebaut, sondern die gesamte UI-Schicht um das Agent-Konzept herum neu geschrieben. Die Sidebar zeigt alle aktiven Agenten auf einen Blick:

- Lokal laufende Agenten (auf deinem Desktop)
- Cloud Agents (laufen auf Cursor-Infrastruktur)
- Agenten, die über externe Trigger gestartet wurden (Slack, GitHub, Linear)

Cloud-Agenten erzeugen dabei automatisch Demos und Screenshots ihrer Arbeit zur Verifikation – du siehst nicht nur Logs, sondern echte Ergebnisse.

### Der Mobile-Trigger: Coding-Job vom Smartphone starten

Das ist der Workflow, der in der Community besonders für Gesprächsstoff sorgt: Du bist im Meeting, hast eine Idee, tippst auf deinem Smartphone eine Aufgabenbeschreibung in Cursor – und der Cloud Agent fängt sofort an zu arbeiten. Wenn du zurück am Laptop bist, wartet bereits ein fertiger PR auf dein Review.

Für Automatisierungs-Engineers bedeutet das: Jeder Task, der klar beschreibbar ist, kann delegiert werden – unabhängig davon, ob du gerade am Rechner sitzt.

### Nahtlose Local-Cloud-Übergabe

```
Mobile/Slack/GitHub → Cloud Agent startet Task
         ↓
Cloud Agent arbeitet (auch wenn Laptop offline)
         ↓
Ergebnis: Demo + Screenshots + Diff
         ↓
Übergabe an Local Agent → Testen & Verfeinern
         ↓
Commit → PR → Merge
```

Die Übergabe funktioniert in beide Richtungen:
- **Cloud → Local**: Wenn du selbst in den Code eingreifen oder lokal testen willst
- **Local → Cloud**: Wenn du einen länger laufenden Task weiterlaufen lassen willst, ohne deinen Rechner offen halten zu müssen

### Self-Hosted Cloud Agents

Für Teams und Enterprise-Umgebungen besonders relevant: Cursor unterstützt jetzt auch Self-hosted Cloud Agents. Das bedeutet, die Agenten laufen auf eigener Infrastruktur – wichtig für Datenschutz-Anforderungen oder regulierte Umgebungen. Dazu kommen Admin-Controls mit Audit Logs und organisationsweite Attribution-Settings.

## Praktische Integration in bestehende Automatisierungs-Stacks

Cursor 3 bringt einen eigenen **Cursor Marketplace** mit Hunderten von Plugins, die Agenten über MCPs (Model Context Protocols), Skills und Subagenten erweitern. Das eröffnet direkte Anknüpfungspunkte:

**Mit n8n / Make / Zapier:**
Der bevorzugte Weg ist die externe Trigger-Logik: n8n-Workflows können über GitHub-Events oder Webhooks Cloud-Agenten in Cursor anstoßen. Der Agent bearbeitet den Code-Task, das Ergebnis (Diff, PR-Link) wird per Webhook zurück in den n8n-Flow gespielt.

**Mit Slack:**
Cursor 3 unterstützt nativ das Starten von Agenten über Slack-Nachrichten. Das bedeutet, du kannst bestehende Slack-Workflows ("Bitte implementiere Feature X") direkt mit dem Coding-Agent verbinden.

**Mit GitHub Actions:**
Automations (ein weiteres Cursor-Feature) können auf Codebase-Änderungen reagieren und automatisch Agenten starten – z.B. bei jedem PR-Öffnen, um automatisch Code-Reviews oder Dokumentations-Updates anzustoßen.

### Der neue Diffs-View

Ein oft unterschätztes Feature: Der neue Diffs-View macht Code-Reviews deutlich schneller. Agenten produzieren strukturierte Diffs, die du direkt reviewen, bearbeiten, committen und als PR pushen kannst – alles aus der gleichen Oberfläche.

## Business-Impact: Was das für Teams bedeutet

Der Business-Case ist klar: Cursor 3 erlaubt es, einen Entwickler auf die Effizienz eines kleinen Engineering-Teams zu skalieren. Parallele Agent-Ausführung bedeutet, dass die theoretische Schranke "ein Mensch kann nur einen Task gleichzeitig bearbeiten" aufgebrochen wird.

Konkrete Szenarien:
- **Incident Response**: Automatisches Starten von Debug-Agenten bei PagerDuty-Alerts
- **Wöchentliche Wartung**: Timer-basierte Agenten für Dependency-Updates oder Code-Cleanup
- **Feature-Entwicklung**: Paralleles Arbeiten an mehreren Features in getrennten Repos

Composer 2, Cursors eigenes Frontier-Coding-Modell mit hohen Usage-Limits, ist dabei der Motor für die lokale Iteration. Für Cloud-Workloads können externe Modelle über die gewohnte Model-Auswahl genutzt werden.

## Praktische Nächste Schritte

1. **Jetzt upgraden**: Cursor-Update laden und mit `Cmd+Shift+P → Agents Window` das neue Interface aktivieren
2. **Ersten Cloud Agent ausprobieren**: Einen klar definierten, abgegrenzten Task an einen Cloud Agent delegieren und den Workflow testen
3. **Marketplace erkunden**: [cursor.com/marketplace](https://cursor.com/marketplace) – passende MCP-Plugins für bestehende Tools (GitHub, Slack, Linear) installieren
4. **n8n-Integration aufbauen**: Cursor-Webhooks als Trigger in n8n-Workflows einbinden für vollständig automatisierte Pipelines

## Quellen & Weiterführende Links

- 📰 [Original-Blogpost: Meet the new Cursor](https://cursor.com/blog/cursor-3)
- 📚 [Cursor Docs: Agents Window](https://cursor.com/docs/agent/agents-window)
- 📚 [Cursor Docs: Plugins & Marketplace](https://cursor.com/docs/plugins)
- 📚 [Cursor Cloud Agents](https://cursor.com/agents)
- 🎓 **Workshops & Kurse** (via API verifiziert):
  - [KI: Modul 1 - Language Models, Agents, Workflows](https://workshops.de/kurse/ki-dev-modul-1) — Grundlagen für KI-Agenten-Entwicklung, ideal als Einstieg in agentic Workflows
  - [KI: Modul 2 - Evals, Multi-Agentic-Workflows](https://workshops.de/kurse/ki-dev-modul-2) — Direkt relevant: Multi-Agent-Architekturen und Evaluierung
  - 💡 Weitere Kurse zu n8n und Multi-Agent-Systemen befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote

---

## Technical Review vom 11.04.2026

**Review-Status**: PASSED_WITH_CHANGES

### Vorgenommene Änderungen:
1. **Zeile 1305**: Typo korrigiert: "lässtden" → "lässt den"
2. **Kurs-Links**: Nicht-existierenden Kurs "n8n: Modul 2 - Multi-Agent-Systeme & MCPs" entfernt (nicht in workshops.de verifizierbar) und durch Fallback-Hinweis ersetzt

### Verifizierte Fakten:
- ✅ Release-Datum (2. April 2026) korrekt (verifiziert via cursor.com/blog/cursor-3, cursor.com/changelog)
- ✅ Self-hosted Cloud Agents existieren (Release: 25. März 2026, verifiziert via cursor.com/blog/self-hosted-cloud-agents)
- ✅ Composer 2 als Frontier-Coding-Modell korrekt beschrieben
- ✅ Agents Window Feature akkurat dargestellt
- ✅ Enterprise Features (Admin Controls, Audit Logs) korrekt

### Link-Verifikation:
- ✅ 5 externe Cursor-Links geprüft (alle erreichbar, kein 404)
- ✅ 2 workshops.de Kurs-Links verifiziert:
  - ✅ ki-dev-modul-1 existiert und ist buchbar
  - ✅ ki-dev-modul-2 existiert und ist buchbar
- 🗑️ Entfernter Kurs-Link: "n8n-multi-agent-systeme-mcp-server" (nicht in workshops.de gefunden)

### Code-Beispiele:
- ✅ 1 ASCII-Workflow-Diagramm (kein ausführbarer Code, konzeptionell korrekt)

### Empfehlungen:
- 📚 Artikel ist technisch korrekt und gut recherchiert
- 💡 Alle technischen Claims wurden gegen autoritative Quellen verifiziert
- ✅ Keine weiteren Korrekturen erforderlich

**Reviewed by**: Technical Review Agent  
**Verification Sources**: cursor.com (official blog, docs, changelog), workshops.de, Perplexity AI Research  
**Review Confidence**: HIGH

---