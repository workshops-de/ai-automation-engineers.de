---
layout: '../../../layouts/BlogLayout.astro'
title: 'Black-hat LLMs: Wenn KI eigenständig Sicherheitslücken findet und angreift'
description: 'Black-hat LLMs: Wenn KI eigenständig Sicherheitslücken findet und angreift'
pubDate: '2026-04-02'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1631128028285-953f85b273fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxCbGFja2hhdCUyMExMTXMlMjBXZW5uJTIwS0klMjBUTERSJTIwTmljaG9sYXMlMjBDYXJsaW5pfGVufDF8MHx8fDE3NzUwOTk2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Nicholas Carlini, Research Scientist bei Anthropic, zeigt auf der [un]prompted 2026 Konferenz, dass aktuelle LLMs ohne Sicherheitsfilter eigenständig Zero-Day-Vulnerabilities in Software identifizieren und ausnutzen können – und das in einem Maßstab, der bisherige Bedrohungsmodelle grundlegend verändert.
Wer LLMs in Automatisierungs-Workflows integriert, steht vor einer neuen Realität: Dieselben Modelle, die produktive Workflows beschleunigen, können – ohne die richtigen Guardrails – zur autonomen Angriffswaffe werden. Was lange wie Science Fiction klang, ist seit wenigen Monaten Realität.
## Die wichtigsten Punkte
- 📅 **Vortrag**: [un]prompted 2026, präsentiert am 25. März 2026
- 🎯 **Zielgruppe**: Alle, die LLMs in Produktiv-Systeme, Automations oder APIs integrieren
- 💡 **Kernaussage**: Ungefilterte LLMs finden und exploiten autonom Zero-Day-Lücken in realer, jahrzehntelang getesteter Software
- 🔧 **Tech-Stack**: LLM-Pipelines, n8n, Make, Zapier, Custom-AI-Agents, API-Integrationen
## Was das konkret für Automation-Engineers bedeutet
Carlinis Demo trifft die AI-Automation-Community ins Mark: Wer LLM-Nodes in n8n-Workflows, Make-Automations oder Zapier-Integrationen einbindet, arbeitet mit Systemen, die potenziell in der Lage sind, Sicherheitslücken im eigenen Stack zu identifizieren und zu nutzen – sofern keine strikten Sicherheitsmaßnahmen greifen.
Der zentrale Schock: Es braucht kein spezielles Scaffolding, keine feinabgestimmten Angriffs-Prompts. State-of-the-Art-Modelle können das heute out-of-the-box – wenn die Sicherheitsfilter deaktiviert oder umgangen werden.
### Was sind „Black-hat LLMs"?
Carlini beschreibt LLMs ohne Sicherheitsfilter, die sich wie offensive Hacker verhalten. Sie scannen Codebases, analysieren APIs und generieren funktionale Exploits – vollständig autonom. Das Bedrohungsmodell ähnelt laut Carlini dem Aufkommen des Internets: ein Wendepunkt, der Angriffe massenweise skalierbar und drastisch günstiger macht.
Konkrete Angriffsvektoren aus dem Vortrag:
- **Autonome Zero-Day-Exploits**: LLMs scannen Code und generieren direkt einsatzbereite Exploits – ohne menschliche Begleitung
- **Skalierung auf tausende Systeme parallel**: Ein einzelnes Modell kann Unmengen an Endpunkten gleichzeitig testen
- **Umgehung von Filtern (Jailbreaks)**: Selbst mit Guardrails existieren bekannte Bypässe, die aktiv erforscht und ausgenutzt werden
- **Supply-Chain-Angriffe**: Dynamisch generierter Code in LLM-Workflows kann manipulierte Dependencies oder schädliche Snippets einschleusen
### Das Risiko in deinem Automation-Stack
```
[n8n Workflow] → [LLM-Node] → [API-Call] → [Code-Execution]
                     ↑
            Kein Sandboxing = Einfallstor
```
Wenn ein LLM in deinem Workflow dynamisch Code generiert und dieser direkt ausgeführt wird, entsteht ein direktes Angriffsfenster. Reale Risiken:
- **RCE (Remote Code Execution)** durch ungefilterte Code-Generierung in Automation-Schritten
- **Datenlecks** durch LLM-generierte Queries, die unberechtigt auf interne Datenbanken oder APIs zugreifen
- **Privilege Escalation** durch autonome Modelle, die Credentials aus dem Workflow-Kontext extrahieren
- **Lateral Movement**: LLM-gesteuerte Agents, die ihren Aktionsraum eigenständig erweitern
## Praktische Schutzmaßnahmen für deinen Stack
Carlini und die Security-Community sind sich einig: Das Threat Landscape hat sich verändert. Die Antwort ist kein Verzicht auf LLMs – sondern ein grundlegendes Rethinking der Security-Architektur.
**1. Striktes Sandboxing aller LLM-Executions**
Kein LLM-Node darf direkte Code-Execution oder uneingeschränkte API-Calls auslösen. Isoliere LLM-Outputs in einer Sandbox-Umgebung, bevor sie den nächsten Workflow-Step beeinflussen.
**2. Human-in-the-Loop für kritische Aktionen**
Gerade in n8n oder Make: Füge zwischen LLM-Outputs und kritischen Actions (Datenbankschreibzugriffe, externe API-Calls, Code-Execution) einen manuellen Bestätigungsschritt ein – zumindest in der Entwicklungsphase.
**3. Input-Validierung und Output-Sanitization**
Behandle LLM-Outputs wie User-Inputs: niemals blind vertrauen. Validierung auf erlaubte Aktionen, Schema-Checks, Allowlists statt Blocklists.
**4. Principle of Least Privilege für AI-Agents**
LLM-gesteuerte Agents erhalten nur die minimalen Berechtigungen, die für ihren Task notwendig sind. Kein Zugriff auf Credentials, die außerhalb des Workflows liegen.
**5. Regelmäßiges Red-Teaming deiner Automation-Pipelines**
Teste deine Workflows aktiv auf autonome Exploit-Fähigkeiten – gerade wenn du Drittanbieter-Modelle oder ungefilterte APIs einsetzt.
## Der größere Kontext: LLM-Security als Wettbewerbsvorteil
Carlinis Vortrag markiert eine Zäsur. AI-Automation-Engineers, die Security jetzt ernst nehmen, bauen robustere Systeme als die, die es ignorieren. Das Thema LLM-Security wird in den nächsten 12–18 Monaten zum Qualitätsmerkmal professioneller Automation-Stacks.
Die Community auf Hacker News diskutiert bereits intensiv: Wer heute in n8n oder Make produktive AI-Agents baut, trägt Verantwortung für die Security-Architektur – genauso wie ein Backend-Entwickler sie für APIs trägt.
## Praktische Nächste Schritte
1. **Vortrag ansehen**: [Nicholas Carlini – Black-hat LLMs | [un]prompted 2026](https://www.youtube.com/watch?v=1sd26pWhfmg) – 100% pflichtanschauen für jeden, der LLMs produktiv einsetzt
2. **Security-Audit deiner Workflows**: Prüfe alle n8n/Make/Zapier-Workflows auf direkte Code-Execution nach LLM-Output
3. **Sandboxing einführen**: Isoliere LLM-Nodes konsequent – keine direkten Datenbankzugriffe, keine ungesandboxten Code-Runs
4. **Team sensibilisieren**: Die Bedrohung durch ungefilterte LLMs ist kein theoretisches Risiko mehr – bring das Thema in dein nächstes Team-Meeting
## Quellen & Weiterführende Links
- 📹 [Nicholas Carlini – Black-hat LLMs | [un]prompted 2026](https://www.youtube.com/watch?v=1sd26pWhfmg)
- 🧵 [Hacker News Diskussion zum Vortrag](https://news.ycombinator.com/item?id=47581390)
- 📰 [Weitere technische Diskussion auf Hacker News](https://news.ycombinator.com/item?id=47580478)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 1 - Automatisierung mit KI-Agenten](https://workshops.de/kurse/ki-agenten-mit-n8n) — Lerne sichere KI-Agent-Workflows mit n8n
  - [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/kurse/n8n-multi-agent-systeme-mcp-server) — Fortgeschrittene Agent-Architekturen inkl. Security-Aspekte
  - [KI-Transformation für Unternehmen](https://workshops.de/kurse/ki-transformation-fuer-unternehmen) — Strategischer Einsatz von KI mit Fokus auf sichere Integration
---