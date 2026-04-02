---
layout: '../../../layouts/BlogLayout.astro'
title: 'Mit Agents Agents bauen: Was GitHub-Researcher Tyler McGoffin über Agentic Development gelernt hat'
description: 'Mit Agents Agents bauen: Was GitHub-Researcher Tyler McGoffin über Agentic Development gelernt hat'
pubDate: '2026-04-01'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200&h=600'
---

**TL;DR:** Tyler McGoffin vom GitHub Copilot Applied Science Team hat Coding Agents genutzt, um Agents zu bauen – und dabei ein Framework aus Prompting-, Architektur- und Iterations-Strategien entwickelt, das sein Team in unter drei Tagen zu +28.858 Zeilen Code in 345 Dateien gebracht hat. Die Kernbotschaft: Die Prinzipien, die großartige Engineers ausmachen, sind dieselben, die Agents großartig machen.
Am 31. März 2026 veröffentlichte Tyler McGoffin, Senior Applied Researcher im Copilot Applied Science Team bei GitHub, einen Erfahrungsbericht, der die Automatisierungs-Community aufhorchen lässt: Er hat seinen Job – die Analyse von Hunderttausenden von Zeilen Agent-Trajektorie-Daten – mit Coding Agents teilweise automatisiert. Und das Werkzeug dabei war GitHub Copilot selbst.
## Die wichtigsten Punkte
- 📅 **Veröffentlicht**: 31. März 2026 (GitHub Blog)
- 🎯 **Zielgruppe**: Developer, Automatisierungs-Engineers, AI-Praktiker
- 💡 **Kernfeature**: Praktisches Framework für agentic Development mit drei Säulen: Prompting, Architektur, Iteration
- 🔧 **Tech-Stack**: GitHub Copilot CLI, Claude Opus 4.6, VSCode, Copilot SDK, MCP-Server
## Was bedeutet das für Automatisierungs-Engineers?
Agentic Development ist kein Buzzword mehr – es ist eine neue Art, Software zu bauen. Und McGoffins Bericht liefert die bisher praxisnächste Beschreibung, wie dieser Paradigmenwechsel in einem professionellen Research-Kontext aussieht.
Das Setup seines Projekts `eval-agents` gibt den Ton vor:
- **Coding Agent**: Copilot CLI
- **Model**: Claude Opus 4.6
- **IDE**: VSCode
- **SDK**: Copilot SDK (nutzt MCP-Server und bietet Tools out-of-the-box)
Das Ergebnis nach wenigen Tagen agentic Development mit fünf Teammitgliedern: **11 neue Agents, 4 neue Skills und +28.858 Zeilen Code** – in unter drei Tagen.
Im Workflow bedeutet das: Wer das richtige Setup hat, kann die Delivery-Geschwindigkeit seines Teams um Größenordnungen skalieren.
## Die drei Säulen des Agentic Developments
### 1. Prompting-Strategien: Gesprächig, nicht terse
Agents performen am besten, wenn man sie wie Senior Engineers behandelt. McGoffins wichtigste Erkenntnis: **`/plan` vor `/autopilot`**.
Statt knapper Anweisungen setzt er auf verbose, stream-of-consciousness Prompts:
> *„Ich habe beobachtet, dass Copilot gerne Tests aktualisiert, um neuen Paradigmen zu folgen, obwohl diese Tests nicht angepasst werden sollten. Wie kann ich einen geschützten Test-Bereich erstellen, den Copilot nicht anfassen darf?"*
Dieser Ansatz führte zu einem Contract-Testing-System, das nur von Menschen bearbeitet werden kann – eine Guardrail, die durch echten Dialog entstanden ist.
**Im Automations-Workflow bedeutet das:**
Prompt → Plan → Diskussion → Implementation → Autopilot → Code Review Loop → Human Review
### 2. Architektur-Strategien: Refactoring ist jetzt Hauptarbeit
In einem agent-first Repository ist saubere Architektur kein Nice-to-have, sondern die wichtigste Investition. McGoffin verbringt den Großteil seiner Zeit mit:
- Refactoring von Namen und File-Strukturen
- Dokumentation neuer Features und Patterns
- Hinzufügen von Test Cases für entdeckte Probleme
- Aufräumen von Dead Code
**Der ROI:** Wenn Copilot eine gut strukturierte Codebase mit klarer Dokumentation vorfindet, sinkt die Zeit zur Feature-Delivery dramatisch. Das Argument für technische Schulden zu zahlen war noch nie überzeugender.
### 3. Iterations-Strategien: „Blame process, not agents"
Das ist der konzeptuell wichtigste Shift. McGoffin überträgt das Prinzip der **blameless culture** (bekannt aus Site Reliability Engineering) auf Agents: Wenn ein Agent einen Fehler macht, ist das kein Agent-Problem – es ist ein Prozess-Problem.
Die Konsequenz:
- Strict Typing → Agent conformiert zu Interfaces
- Robuste Linter → gute Patterns werden erzwungen
- Integration-Tests, End-to-End-Tests, Contract Tests → werden günstiger, weil Agents beim Erstellen helfen
**Der Automatisierungs-Loop sieht konkret so aus:**
```
/plan → Feature-Plan mit Tests + Docs
  ↓
/autopilot → Implementation
  ↓
Copilot Code Review → Selbst-Review-Schleife
  ↓
Human Review → Pattern-Enforcement
  ↓
Weekly: /plan Review für fehlende Tests, Duplikate, Docs-Gaps
```
## Die Rolle von MCP-Servern im Stack
McGoffin nutzt das **Copilot SDK**, das unter der Haube vom Copilot CLI angetrieben wird. Das gibt ihm direkten Zugang zu:
- Bestehenden Tools und MCP-Servern
- Registrierung neuer Tools und Skills
- Agentic Goodness out-of-the-box – ohne Reinvention
Das Model Context Protocol (MCP) ist dabei der Klebstoff zwischen verschiedenen Tools im Automatisierungs-Stack. In der Praxis heißt das: Jeder neue Skill, jeder neue Agent kann bestehende MCP-Server nutzen – ein echter Multiplikator für Automatisierungs-Workflows.
## Der Business Impact – konkret in Zahlen
| Metrik | Wert |
|--------|------|
| Beteiligte Teammitglieder | 5 |
| Neue Agents erstellt | 11 |
| Neue Skills erstellt | 4 |
| Lines of Code (netto) | +28.858 / -2.884 |
| Geänderte Files | 345 |
| Zeitraum | < 3 Tage |
Das entspricht einer Delivery-Geschwindigkeit, die mit klassischen Entwicklungszyklen schlicht nicht erreichbar wäre.
## Praktische nächste Schritte
1. **Jetzt ausprobieren**: [Copilot CLI herunterladen](https://github.com/features/copilot/cli), in ein beliebiges Repo wechseln und `/plan` mit einem konkreten Architektur-Problem starten
2. **Codebase agent-ready machen**: Refactoring, Dokumentation, Tests – heute investieren, morgen mit Agents ernten
3. **Guardrails aufbauen**: Contract Tests definieren, die nur Menschen ändern können – dann dem Agent vertrauen
4. **Wöchentliche Hygiene-Prompts einführen**:
   - `/plan Review the code for any missing tests and dead code`
   - `/plan Review the code for duplication or abstraction opportunities`
   - `/plan Review documentation gaps and update copilot-instructions.md`
5. **Tiefgang aufbauen**: Claude Code und MCP-Server in die eigene Automatisierungs-Pipeline integrieren
## Quellen & Weiterführende Links
- 📰 [Original-Artikel: Agent-driven development in Copilot Applied Science](https://github.blog/ai-and-ml/github-copilot/agent-driven-development-in-copilot-applied-science/) — Tyler McGoffin, GitHub Blog (31. März 2026)
- 📚 [GitHub Copilot CLI Docs](https://github.com/features/copilot/cli)
- 📚 [GitHub Actions CI/CD Documentation](https://docs.github.com/actions)
- 🎓 **Workshops & Kurse**:
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Von Installation bis Multi-Agent-Workflow mit MCP-Server-Integration (Advanced, 3 Tage)
  - [Claude: Modul 2 – Agents mit Claude, CoWork, Skills und Plugins](https://workshops.de/seminare-schulungen-kurse/claude-agents-cowork-skills-plugins) — Eigene Skills und Plugins entwickeln, die du im Team teilen kannst (Advanced, 3 Tage)
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server) — Memory-Systeme, Multi-Agent-Architekturen & MCP-Server Development (Advanced, 5 Tage)
---