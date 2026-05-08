---
layout: '../../../layouts/BlogLayout.astro'
title: 'TOON: Bis zu 40 % weniger Tokens – das clevere JSON für LLM-Prompts'
description: 'TOON: Bis zu 40 % weniger Tokens – das clevere JSON für LLM-Prompts'
pubDate: '2026-05-08'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1726916817036-09ed4feb5bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw3fHxUT09OJTIwQmlzJTIwenUlMjB3ZW5pZ2VyJTIwVExEUiUyMFRPT04lMjBUb2tlbk9yaWVudGVkfGVufDF8MHx8fDE3NzgyMjI0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** TOON (Token-Oriented Object Notation) ist ein kompaktes, für LLMs optimiertes Datenformat, das JSON lossless ersetzen kann. In Benchmarks erreicht es ~40 % weniger Token-Verbrauch bei gleichzeitig höherer Parsing-Genauigkeit (74 % vs. 70 % bei JSON) – ein direkter Hebel für Kosten und Zuverlässigkeit in KI-Workflows.

Token-Kosten fressen Marge. Wer täglich große Mengen strukturierter Daten an LLMs schickt – etwa in Agenten-Pipelines, Datenextraktions-Workflows oder beim Function Calling – zahlt für jede überflüssige geschweifte Klammer und jedes wiederholte Key-Label mit. TOON, ein neues Open-Source-Format von Johann Schopplich, löst genau dieses Problem auf elegante Weise: Es kodiert das vollständige JSON-Datenmodell, braucht aber im Schnitt 40 % weniger Tokens dafür. Version 2.1.0 ist aktuell verfügbar.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: TOON v2.1.0, MIT-lizenziert, sofort einsetzbar
- 🎯 **Zielgruppe**: KI-Entwickler, Automatisierungsprofis, LLM-Workflow-Ingenieure
- 💡 **Kernfeature**: ~40 % weniger Tokens, explizite Längen-Header für zuverlässigeres Parsing
- 🔧 **Tech-Stack**: TypeScript/npm, Python – offizielle Implementierungen; Community-Support für weitere Sprachen
- 📊 **Benchmark**: 74 % Accuracy (vs. JSON 70 %) über 4 getestete Modelle

## Was bedeutet das für AI-Automation-Engineers?

Wer Automation-Pipelines in n8n, LangChain, Make oder Zapier betreibt und dabei strukturierte Daten zwischen Steps per LLM verarbeitet, kennt das Problem: JSON ist verbose. Jeder Key wird in jedem Array-Element wiederholt, jede Klammer kostet Token, und komplexe Payloads treiben die Kosten in die Höhe.

TOON schlägt hier mit einer eleganten Idee ein: **Statt Key-Value-Pairs in jedem Objekt zu wiederholen, deklariert TOON den Schema-Header einmal** und streamt dann nur noch die Werte – CSV-artig kompakt, aber mit voller JSON-Kompatibilität.

Im Workflow bedeutet das konkret:
- Ein `HTTP Request`-Node in n8n kodiert ausgehende Daten vor dem LLM-Call ins TOON-Format
- Das LLM antwortet mit einem kompakteren, strukturierten TOON-Output
- Ein Decode-Step wandelt den Output deterministisch zurück in JSON
- **Ergebnis**: Weniger Token-Kosten, besseres Parsing, gleicher Downstream-Datenfluss

Besonders stark spielt TOON bei **uniformen Arrays** – also Tabellen gleichartiger Objekte. Genau die Art von Daten, die in Reporting-, ETL- oder Datenextraktions-Workflows dominiert.

## Technische Details

### Wie TOON-Syntax aussieht

TOON kombiniert YAML-artige Einrückung für verschachtelte Objekte mit einem CSV-ähnlichen Tabellen-Format für gleichförmige Arrays. Der entscheidende Mechanismus: **explizite `[N]`-Längenangaben und `{fields}`-Header**.

Ein Beispiel aus der offiziellen Dokumentation verdeutlicht den Unterschied:

```
// JSON (verbose)
{"users": [{"id": 1, "name": "Alice", "role": "admin"}, {"id": 2, "name": "Bob", "role": "editor"}]}

// TOON (kompakt)
users[2]{id,name,role}:
1,Alice,admin
2,Bob,editor
```

Die `[2]`-Angabe teilt dem Modell vorab mit, wie viele Zeilen folgen. Das `{id,name,role}`-Header-Set wird **nur einmal** deklariert. Keine wiederholten Quotes, keine wiederholten Keys – der LLM bekommt trotzdem einen klaren Schema-Kontext.

### Warum das Parsing zuverlässiger wird

Das ist der unterschätzte Vorteil: JSON lässt LLMs raten, wann ein Objekt endet. TOON gibt explizite Ankerpunkte vor – Länge und Felder sind vorab bekannt. Das reduziert Halluzinationen beim Strukturieren von Outputs und macht nachgelagerte Parser robuster.

### Das Ecosystem

TOON ist spec-getrieben und inzwischen in mehreren Sprachen implementiert:

| Sprache | Einsatz |
|---|---|
| TypeScript (`@toon-format/toon`) | Frontend, Node.js, n8n Custom Nodes |
| Python | LangChain-Pipelines, FastAPI-Backends |
| Go | High-Performance-APIs |
| Rust | Edge-Computing, WASM |
| .NET | Enterprise-Backends, Azure Functions |

Das Format garantiert **deterministische, verlustfreie Round-Trips**: JSON → TOON → JSON ohne Datenverlust.

## Direkter ROI für Automation-Stacks

Die Rechnung ist einfach: Bei einem typischen LLM-basierten Extraktions-Workflow, der täglich 1 Million Token verarbeitet, spart TOON ~400.000 Token pro Tag – bei GPT-4o-Preisen entspricht das mehreren Hundert Euro monatlich allein durch das Format.

Darüber hinaus:

- **Weniger Retries** durch zuverlässigeres Parsing senkt Latenz und Fehlerquoten
- **Kleinere Prompts** ermöglichen größere Kontextfenster für eigentliche Nutzdaten
- **Standardisiertes Format** vereinfacht Monitoring und Debugging in Multi-Step-Pipelines

Für Teams, die auf Token-Budget-Limits stoßen oder teure Modelle für Strukturierungsaufgaben einsetzen, lohnt sich der TOON-Test definitiv.

## Wann TOON weniger Sinn macht

Fair ist fair: TOON glänzt bei uniformen Arrays und flachen Objekten. Bei **tief verschachtelten, heterogenen Datenstrukturen** kann YAML token-effizienter sein. Für komplett flache Datasets bleibt CSV die kompakteste Option. TOON ist der Sweet Spot dazwischen – mit dem entscheidenden Vorteil, das vollständige JSON-Datenmodell abzudecken.

## Praktische Nächste Schritte

1. **TOON-Playground ausprobieren**: [toonformat.dev/playground](https://toonformat.dev/playground) – eigene Daten sofort konvertieren und Token-Ersparnis messen
2. **npm-Paket installieren**: `npm install @toon-format/toon` und in bestehende Node.js- oder n8n-Flows integrieren
3. **Benchmarks lesen**: [toonformat.dev/guide/benchmarks](https://toonformat.dev/guide/benchmarks) für detaillierte Modell-Vergleiche
4. **GitHub-Repo**: [github.com/toon-format/toon](https://github.com/toon-format/toon) – Spezifikation, Implementations-Links und Release Notes

## Quellen & Weiterführende Links

- 📰 [TOON Official Website](https://toonformat.dev/)
- 📚 [Getting Started Guide](https://toonformat.dev/guide/getting-started.html)
- 📊 [Benchmarks](https://toonformat.dev/guide/benchmarks.html)
- 🔧 [GitHub Repository](https://github.com/toon-format/toon)
- 📖 [InfoQ: New Token-Oriented Object Notation Hopes to Cut LLM Costs](https://www.infoq.com/news/2025/11/toon-reduce-llm-cost-tokens/)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/seminare-schulungen-kurse/ki-agenten-mit-n8n) — LLM-Agenten und strukturierte Outputs in n8n-Workflows
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/lernpfade/n8n-solution-engineer) — Fortgeschrittene Agent-Architekturen mit strukturiertem Datenaustausch
  - [KI für Anwender: Schulungen & Kurse](https://workshops.de/schulungsthemen/kuenstliche-intelligenz) — Grundlagen für LLM-basierte Entwicklung und Automatisierung

---