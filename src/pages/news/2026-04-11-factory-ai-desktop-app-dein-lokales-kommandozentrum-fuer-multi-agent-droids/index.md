---
layout: '../../../layouts/BlogLayout.astro'
title: 'Factory.ai Desktop App: Dein lokales Kommandozentrum für Multi-Agent Droids'
description: 'Factory.ai Desktop App: Dein lokales Kommandozentrum für Multi-Agent Droids'
pubDate: '2026-04-11'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=600&fit=crop'
---

**TL;DR:** Factory.ai hat am 8. April 2026 eine native Desktop-App für macOS und Windows veröffentlicht. Sie ermöglicht das parallele Ausführen mehrerer KI-Agenten (Droids) mit persistentem Zustand, Computer-Use-Fähigkeiten, tiefer VS Code-Integration und lokalem Modell-Support via Ollama – ein echter Game-Changer für Automatisierungs-Teams in regulierten Branchen.

Factory.ai baut seit Jahren an dem Konzept, Software-Entwicklung durch spezialisierte KI-Agenten – sogenannte Droids – grundlegend zu automatisieren. Mit der neuen Desktop-App bekommt dieser Ansatz jetzt ein natives Interface, das direkt auf dem eigenen Rechner läuft und Multi-Agent-Workflows auf ein neues Level hebt.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Ab sofort für macOS (Apple Silicon & Intel) und Windows – in allen bestehenden Factory-Plänen enthalten
- 🎯 **Zielgruppe**: Automation Engineers, Tech Leads, Enterprise-Teams, besonders in regulierten Branchen (Fintech, Healthcare, Government)
- 💡 **Kernfeature**: Parallele Multi-Agent-Sessions mit persistentem Zustand (Droid Computers) + Computer Use
- 🔧 **Tech-Stack**: Ollama, vLLM, VS Code Server, MCP/Skills/Hooks-Ökosystem, CLI-Kompatibilität

## Was bedeutet das für Automation Engineers?

Wer bisher mit n8n, Make oder anderen Automatisierungs-Stacks gearbeitet hat, kennt das Problem: KI-Agenten verlieren zwischen Sessions ihren Zustand, müssen immer wieder von vorne konfiguriert werden und können nicht wirklich parallel und unabhängig arbeiten. Die Factory Desktop-App löst genau diese Pain Points.

Das Konzept ist dabei radikal: Jeder Droid bekommt eine eigene persistente Maschine – einen sogenannten **Droid Computer**. Er merkt sich installierte Pakete, geklonte Repos, Credentials und laufende Services. Kein Reset zwischen den Sessions, kein Verlust von Kontext.

Im Automatisierungs-Workflow bedeutet das konkret:

**Feature-Build → Migration → Code Review → Test → Deploy**

Statt einen monolithischen Agenten durch diese Pipeline zu schicken, kann jeder Schritt einem spezialisierten Droid übergeben werden – parallel und ohne gegenseitige Interferenz.

### Technische Details

**Multi-Agent Sessions**

Die Sidebar der Desktop-App listet alle laufenden Droid-Sessions mit eigenem Kontext, Fortschritt und History. Starte einen Droid auf einem Feature-Build, kicke gleichzeitig einen zweiten für eine Migration an – beide laufen unabhängig, du wechselst per Klick zwischen ihnen.

**Droid Computers: Drei Modi**

- **Cloud Computers**: Managed Machines, direkt aus der Factory-App provisioniert. Create, wake, sleep, checkpoint, restore – mit Persistent Storage und SSH-Zugang.
- **BYO Machine**: Eigene Hardware als Droid Computer registrieren via `droid computer register`. Workstation, On-Prem-Server, GPU-Rig – ein Befehl, und der Droid hat dort sein Zuhause.
- **Local Model Support**: GPU-Maschine registrieren, BYOK-System konfigurieren, Ollama/vLLM als Endpoint eintragen – der Droid läuft vollständig lokal. **Kein Datentransfer nach außen.**

**Computer Use: Echter Desktop-Zugriff**

Das ist der vielleicht interessanteste Aspekt für Automation Engineers: Droids können tatsächlich andere Applikationen auf dem Desktop steuern. Sie navigieren VS Code, interagieren mit Browser-Tabs, lesen Dokumente, bedienen Terminals – so wie ein Mensch es tun würde.

Konkrete Anwendungsfälle:
- Staging-Umgebung im Browser öffnen → User-Flow durchklicken → Report generieren
- VS Code öffnen → Extension-Command ausführen → Output lesen → Handeln
- Daten aus Spreadsheet ziehen → Sales Deck erstellen → Design-Datei aktualisieren

Das ist keine Text-Generierung in einer Sandbox. Der Droid übernimmt die Kontrolle.

**VS Code Integration**

Verbindung zu einem VS Code Server – lokal oder remote – direkt aus der Desktop-App. Files browsen, Terminal nutzen, Code editieren, Extensions ausführen – alles verknüpft mit der Droid-Session.

## Der ROI-Faktor: Was die Daten sagen

Factory.ai veröffentlicht interessante interne Zahlen:

- **2x schnellere Adoption** in Enterprise-Teams, wenn sowohl CLI als auch Desktop verfügbar ist
- **4,6x mehr Sessions** bei Usern, die beide Interfaces nutzen (CLI + Desktop) im Vergleich zu reinen CLI-Usern

Das ist kein Trade-off zwischen den Interfaces – es ist additiver Wert. Teams, die den Desktop-Zugang haben, erledigen schlicht mehr Arbeit insgesamt.

Besonders relevant: Die Desktop-App öffnet Factory für Personas, die nicht primär im Terminal leben – Designer, Product Manager, Data Scientists, Account Executives. Wenn AEs Droids für Deal-Summaries nutzen und PMs für Spec-Drafts, verschiebt sich der Value Prop von "Engineering Productivity" zu "Organisational Leverage".

## Regulierte Branchen: Der Air-Gap-Faktor

Für Teams in Fintech, Healthcare und Government ist das lokale Modell-Feature entscheidend: Factory hat bereits vollständige Air-Gapped-Deployments bei einigen der größten Finanz-, Healthcare- und Government-Institutionen der Welt umgesetzt.

Das BYOK-System (Bring Your Own Key) verbindet sich mit Ollama, vLLM oder einem kompatiblen Endpoint auf der eigenen Maschine. **Kein Code verlässt das Netzwerk.** Das ist genau das, was Compliance-Teams brauchen.

## Integration in bestehende Automatisierungs-Stacks

Die Desktop-App bringt das volle Plugin-Ökosystem mit:

- **MCP** (Model Context Protocol): Bereits vorhandene MCP-Server werden unterstützt
- **Skills**: Portierbar über alle Factory-Surfaces – ins Repo einchecken, und das gesamte Team hat Zugang
- **Hooks**: Automatisierungen, die bei bestimmten Droid-Aktionen ausgelöst werden (z.B. Tests bei Code-Änderungen)
- **Plugins**: Erweiterungen des Droid-Verhaltens für spezifische Use Cases

Wer bereits mit dem Factory CLI oder der IDE-Extension arbeitet: Sessions, Settings und Skills werden automatisch übertragen. Null Migrationsaufwand.

## Praktische Nächste Schritte

1. **Jetzt herunterladen**: [factory.ai/news/factory-desktop](https://factory.ai/news/factory-desktop) – verfügbar für macOS (Apple Silicon/Intel) und Windows, in bestehenden Subscriptions enthalten
2. **Quickstart durcharbeiten**: [docs.factory.ai/web/getting-started/quickstart](https://docs.factory.ai/web/getting-started/quickstart) – die offizielle Dokumentation führt durch die ersten Schritte
3. **BYO Machine evaluieren**: Prüfe, welche eigene Hardware als Droid Computer in Frage kommt – besonders interessant für Teams mit GPU-Rigs oder On-Prem-Servern
4. **Skills ins Repo integrieren**: Starte mit einem Use Case (z.B. automatisierte Test-Coverage), definiere einen Skill, checke ihn ein – und mach ihn dem Team zugänglich

## Quellen & Weiterführende Links

- 📰 [Original-Announcement: The Factory Desktop App](https://factory.ai/news/factory-desktop)
- 📚 [Offizielle Dokumentation](https://docs.factory.ai/web/getting-started/overview)
- 📚 [Quickstart Guide](https://docs.factory.ai/web/getting-started/quickstart)
- 🔒 [Security Model](https://docs.factory.ai/cli/account/security)

## 🎓 Workshops & Kurse

- 🎓 [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare/n8n-multi-agent-systeme-mcp-server) — Vertiefe Multi-Agent-Architekturen und MCP-Server-Development; direkt anwendbar auf Factory-Droids-Workflows
- 🎓 [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/seminare/ki-agenten-mit-n8n) — Einstieg in KI-gestützte Automatisierung, der die konzeptionellen Grundlagen für den Einsatz von Tools wie Factory.ai legt

---