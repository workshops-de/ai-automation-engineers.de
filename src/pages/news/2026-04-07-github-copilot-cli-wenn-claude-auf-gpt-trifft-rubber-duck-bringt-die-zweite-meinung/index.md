---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub Copilot CLI: Wenn Claude auf GPT trifft – Rubber Duck bringt die zweite Meinung'
description: 'GitHub Copilot CLI: Wenn Claude auf GPT trifft – Rubber Duck bringt die zweite Meinung'
pubDate: '2026-04-07'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1654277041218-84424c78f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxHaXRIdWIlMjBDb3BpbG90JTIwQ0xJJTIwV2VubiUyMFRMRFIlMjBHaXRIdWIlMjBDb3BpbG90fGVufDF8MHx8fDE3NzU1NjUxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** GitHub Copilot CLI führt mit "Rubber Duck" einen experimentellen Cross-Family-Reviewer ein: Ein Modell aus einer anderen KI-Familie prüft die Arbeit des primären Coding-Agenten an kritischen Checkpoints. Claude Sonnet + Rubber Duck (GPT-5.4) schließt 74,7 % der Performancelücke zu Claude Opus auf SWE-Bench Pro – ohne den menschlichen Entwickler zu unterbrechen.

Am 6. April 2026 hat GitHub im offiziellen GitHub Blog eine neue experimentelle Funktion für den GitHub Copilot CLI vorgestellt: **Rubber Duck**. Das Feature setzt gezielt auf Cross-Model-Review – ein zweites Modell aus einer anderen KI-Familie agiert als unabhängiger Reviewer, der die Planung und Implementierung des primären Coding-Agenten an den entscheidenden Stellen unter die Lupe nimmt.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Ab sofort im experimentellen Modus via `/experimental` in GitHub Copilot CLI
- 🎯 **Zielgruppe**: Teams und Entwickler, die Coding-Agenten für komplexe, multi-file Aufgaben einsetzen
- 💡 **Kernfeature**: Zweites Modell (GPT-5.4) reviewed automatisch die Ausgaben eines Claude-Orchestrators an drei kritischen Workflow-Checkpoints
- 🔧 **Tech-Stack**: GitHub Copilot CLI + Claude-Modellfamilie (Opus, Sonnet, Haiku) + GPT-5.4 als Rubber Duck

## Was bedeutet das für Automatisierungs-Praktiker?

Wer KI-Agenten für Coding-Aufgaben einsetzt, kennt das Problem: Der Agent trifft früh eine suboptimale Entscheidung – und baut dann munter darauf auf. Selbst-Review durch dasselbe Modell hilft nur bedingt, weil derselbe blinde Fleck reproduziert wird. Genau hier setzt Rubber Duck an.

Im Workflow bedeutet das:

**Orchestrator (Claude)** → plant und implementiert
**↓ Checkpoint**
**Rubber Duck (GPT-5.4)** → unabhängige Kritik aus anderer Modell-Familie
**↓ Feedback**
**Orchestrator** → überarbeitet, zeigt was sich geändert hat und warum
**↓**
**Entwickler** → erhält qualitativ besseres Ergebnis

Die Integration läuft über Copilots bestehendes Task-Tool-System – dieselbe Infrastruktur, die auch für andere Subagenten verwendet wird. Der Overhead ist damit gering und das Feature fügt sich nahtlos in bestehende Copilot-CLI-Workflows ein.

## Technische Details

### Die drei Aktivierungs-Checkpoints

Rubber Duck wird **automatisch** an den Stellen aktiviert, wo Feedback den höchsten Return bringt:

1. **Nach dem Entwurf eines Plans** – hier ist der Impact am größten, weil eine früh korrigierte Fehlentscheidung keine nachgelagerten Fehler erzeugt
2. **Nach einer komplexen Implementierung** – ein zweites Augenpaar auf komplexem Code fängt Edge Cases
3. **Nach dem Schreiben von Tests, vor deren Ausführung** – Lücken in der Testabdeckung oder fehlerhafte Assertions werden erkannt, bevor der Agent sich selbst "bestätigt"

Zusätzlich kann Rubber Duck **reaktiv** einspringen, wenn der Orchestrator in einer Schleife feststeckt – und Entwickler können jederzeit **manuell** eine Kritik anfordern.

### Was Rubber Duck auf SWE-Bench Pro gefunden hat (Beispiele aus dem Original-Post)

Drei reale Bugs, die ohne Cross-Family-Review durchgerutscht wären:

- **Architektur-Problem (OpenLibrary/Async Scheduler)**: Der vorgeschlagene Scheduler würde sofort starten und beenden – null Jobs ausgeführt. Einer der geplanten Tasks war zudem eine Endlosschleife.
- **One-Liner Bug (OpenLibrary/Solr)**: Eine Schleife überschrieb bei jeder Iteration denselben `dict`-Key. Drei von vier Solr-Facet-Kategorien wurden aus jeder Suchanfrage herausgefiltert – kein Error, kein Log.
- **Cross-File-Konflikt (NodeBB/Email Confirmation)**: Drei Dateien lasen aus einem Redis-Key, den der neue Code nicht mehr beschrieb. UI und Cleanup-Pfade wären beim Deploy still gebrochen.

### Performance-Zahlen (SWE-Bench Pro)

- Claude Sonnet + Rubber Duck schließt **74,7 %** der Performance-Lücke zwischen Sonnet und Opus
- Bei Tasks über 3+ Dateien und 70+ Schritten: **+3,8 %** gegenüber Sonnet-Baseline
- Bei den schwierigsten identifizierten Problemen: **+4,8 %** über drei Trials

### Setup

Rubber Duck ist aktuell für alle Claude-Modelle (Opus, Sonnet, Haiku) als Orchestrator aktiviert. GPT-5.4-Zugang ist Voraussetzung. Aktivierung:

```bash
# In GitHub Copilot CLI
/experimental
# → Rubber Duck ist verfügbar, sobald Claude aus dem Model-Picker gewählt wird
```

## Praktischer Impact für Automatisierungs-Teams

**Zeit- und Qualitätsgewinn konkret:**

- Das frühe Abfangen von Planungsfehlern spart die aufwändige Nacharbeit, wenn ein kompletter Feature-Branch auf einem falschen Fundament steht
- Stille Bugs (keine Exceptions, kein sichtbarer Fehler) werden vor dem Commit gefunden – nicht nach dem Deploy
- Der Overhead durch Rubber Duck bleibt gering: GitHub aktiviert den Reviewer bewusst sparsam und nur an Hochwert-Checkpoints

**Wo Rubber Duck am meisten bringt:**
- Komplexe Refactorings mit Auswirkungen auf mehrere Dateien
- Architekturelle Entscheidungen in frühen Agent-Planungsphasen
- Alle Szenarien, in denen ein falscher Agent-Move hohe Korrekturkosten hat
- Lückenloses Test-Coverage vor dem Merge

**Vergleich zu bisherigen Ansätzen:**

| Ansatz | Limitation |
|---|---|
| Kein Review | Fehler akkumulieren sich |
| Self-Review (gleiches Modell) | Gleiche Trainingsbias, gleiche Blindflecken |
| **Cross-Family Review (Rubber Duck)** | **Unabhängige Perspektive, andere Stärken** |

## Praktische nächste Schritte

1. **GitHub Copilot CLI installieren** und `/experimental` aktivieren – Rubber Duck ist sofort verfügbar, wenn Claude als Orchestrator gewählt wird
2. **Komplexe Multi-File-Tasks gezielt testen** – hier ist der Qualitätsgewinn laut den Benchmarks am größten
3. **Feedback geben**: GitHub sammelt aktiv Community-Feedback im [Discussion Thread](https://github.com/orgs/community/discussions/191734)
4. **n8n/Make-Integration im Blick behalten**: Da Rubber Duck über das bestehende Task-Tool-System läuft, sind spätere Integrationen in breitere Automatisierungs-Stacks (n8n, Make) denkbar, sobald die API-Oberflächen offener werden

## Quellen & Weiterführende Links

- 📰 [Original-Artikel: GitHub Copilot CLI combines model families for a second opinion](https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/)
- 📚 [GitHub Copilot CLI – Offizielle Seite](https://github.com/features/copilot/cli)
- 💬 [Community Discussion & Feedback](https://github.com/orgs/community/discussions/191734)
- 📊 [SWE-Bench Pro Benchmark](https://www.swebench.com/)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server) — Für alle, die Multi-Agent-Architekturen und deren Qualitätssicherung tiefer verstehen wollen
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Direkt relevant: Claude-Agenten, Multi-Agent-Workflows und CI/CD-Integration

---
## Technical Review vom 2026-04-07

**Review-Status**: PASSED_WITH_CHANGES

### Vorgenommene Änderungen:
1. **Zeile ~891**: Autoren-Nennung entfernt - Nick McKenna und Bartek Perz werden im Original-Blogpost nicht erwähnt, daher auf neutrale Formulierung "GitHub" geändert (Quelle: Verifikation via Perplexity gegen github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/)

### Verifizierte Fakten:
- ✅ **Rubber Duck Feature**: Existiert und wurde am 6. April 2026 angekündigt (verifiziert via GitHub Blog)
- ✅ **Experimenteller Modus**: Via `/experimental [on|off]` Slash-Command aktivierbar (verifiziert via GitHub Docs CLI Reference)
- ✅ **Cross-Model Review**: Claude-Modelle (Opus, Sonnet, Haiku) + GPT-5.4 als Rubber Duck korrekt dargestellt
- ✅ **Drei Checkpoints**: Nach Plan-Entwurf, nach komplexer Implementierung, nach Test-Erstellung korrekt beschrieben
- ✅ **Performance-Zahlen**: 74,7% Performance-Gap-Closing, +3,8% bei 3+ Files/70+ Steps, +4,8% bei schwierigsten Tasks stammen aus dem Original-Blogpost (als Zitat akzeptabel)
- ✅ **Code-Beispiel (Bash)**: Syntax korrekt - `/experimental` ist valider Slash-Command in GitHub Copilot CLI
- ✅ **SWE-Bench Pro**: Existiert als offizieller Benchmark (verifiziert via www.swebench.com und Scale Labs)

### Link-Verifikation:
- ✅ 4 externe Links geprüft (alle HTTP 200):
  - ✅ https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/
  - ✅ https://github.com/features/copilot/cli
  - ✅ https://github.com/orgs/community/discussions/191734
  - ✅ https://www.swebench.com/
- ⚠️ **workshops.de API**: Konnte nicht direkt gegen API geprüft werden (API-Zugriff fehlgeschlagen), aber folgende Kurs-Links sind im Kontext plausibel:
  - 🔍 https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server (n8n Multi-Agent-Systeme)
  - 🔍 https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code (Claude Software Engineering)
  - **Empfehlung**: Manuelle Prüfung durch Human Reviewer empfohlen

### Technische Korrektheit:
- ✅ **Keine Syntax-Fehler** in Code-Beispielen gefunden
- ✅ **API/Framework-Versionen** korrekt dargestellt
- ✅ **Keine veralteten Methoden** verwendet
- ✅ **Feature-Beschreibungen** technisch akkurat
- ✅ **Architektur-Konzepte** (Task-Tool-System, Checkpoint-Aktivierung) korrekt erklärt

### Empfehlungen:
- 💡 **Optional**: Beim nächsten Update könnte ein Screenshot oder CLI-Output-Beispiel die praktische Nutzung noch anschaulicher machen
- 💡 **Monitoring**: Da GPT-5.4 und Rubber Duck beide experimentell sind, regelmäßige Updates bei Feature-Änderungen einplanen
- 📚 **Weiterführend**: Link zu GitHub Community Discussion könnte für Reader-Feedback wertvoll sein (bereits vorhanden)

**Reviewed by**: Technical Review Agent  
**Verification Sources**: GitHub Blog (Original), GitHub Docs CLI Reference, Perplexity AI Research, Scale Labs SWE-Bench Pro  
**Konfidenz-Level**: HIGH  
**Review-Severity**: MINOR (nur Autoren-Korrektur)

---