---
layout: '../../../layouts/BlogLayout.astro'
title: 'Popsa: 5,5 Mio. Titel mit Multi-Model RAG auf Amazon Bedrock'
description: 'Popsa: 5,5 Mio. Titel mit Multi-Model RAG auf Amazon Bedrock'
pubDate: '2026-04-28'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1711929639928-c5a06a20e8ed?w=1200&h=600&fit=crop'
---

**TL;DR:** Der Fotoprodukt-Anbieter Popsa hat eine produktionsreife RAG-Pipeline mit Amazon Nova Lite/Pro und Claude 3 Haiku über Amazon Bedrock aufgebaut – das Ergebnis: 5,5 Millionen personalisierte Titel in 12 Sprachen, 13% mehr positives Nutzerfeedback und 35% kürzere Antwortzeiten.

Popsa kombiniert On-Device Computer Vision, Metadaten-Extraktion und Retrieval-based Few-Shot Prompting, um Foto-Books automatisch mit kreativen Titeln zu versehen. Was 2021 als regelbasierter Graph-Algorithmus startete, ist 2025 eine Multi-Model-Pipeline auf Amazon Bedrock – mit messbaren Business-KPIs und einer Architektur, die sich direkt als Blueprint eignet.

## Was ist neu?

Der entscheidende Architektur-Wechsel: Popsa nutzt die **ConverseStream API von Amazon Bedrock**, um Tokens zu streamen und bereits den ersten validierten Titelvorschlag auszuliefern, bevor die komplette Antwort vorliegt. Die Time to First Suggestion (TTFS) sank damit von 1,41 auf 0,92 Sekunden – ein Rückgang von 35%, der direkt auf UX und Kaufrate einzahlt.

Für die Modellwahl führte Popsa multivariate A/B-Tests durch: **Amazon Nova Lite** liefert nahezu identische Qualität wie Claude 3 Haiku, ist aber rund 72% günstiger und knapp dreimal so schnell. **Nova Pro** erzielte den höchsten positiven Feedback-Score (73% vs. 71% bei Haiku), bleibt aber teurer. Das zeigt, wie die unified API von Amazon Bedrock direktes Modell-Switching ermöglicht – Model-IDs tauschen, Experiment shippen, Entscheidung treffen.

Die RAG-Komponente basiert auf **Retrieval-based Few-Shot Prompting**: Eine Datenbank ähnlicher Photo Books wird abgefragt, die Few-Shot-Beispiele landen als User-Assistant-Paare im Prompt, bevor das Nutzerdokument als finale User-Message angehängt wird. Gleichzeitig validiert eine **LLM-as-Judge**-Evaluation mit definierten Metriken (Zeichenlimit, Kategorie, JSON-Format) systematisch Qualität und Regression.

## Was bedeutet das für Automatisierungs-Teams?

Das Popsa-Case zeigt drei Muster, die sich 1:1 in eigene Workflows übertragen lassen. Erstens: Streaming-APIs verändern die wahrgenommene Latenz dramatischer als reine Modell-Optimierung – wer mit n8n, FastAPI oder ähnlichen Stacks arbeitet, sollte ConverseStream früh evaluieren. Zweitens: Multi-Model-Orchestrierung über eine einheitliche API (Bedrock, aber analog auch über Anthropic-Claude direkt oder OpenAI) macht A/B-Testing zwischen Modellen zur Routine statt zum Projekt. Drittens: LLM-as-Judge als automatisierte Eval-Stufe ist kein Nice-to-Have, sondern die Voraussetzung dafür, Modellwechsel datengetrieben statt bauchgefühlgetrieben zu treffen. Wer strukturierte Outputs (JSON mit definierten Keys und Constraints) kombiniert mit automatisierter Validierung, schafft eine Pipeline, die auch ohne Human Review skaliert.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel: How Popsa used Amazon Nova to inspire customers with personalised title suggestions](https://aws.amazon.com/blogs/machine-learning/how-popsa-used-amazon-nova-to-inspire-customers-with-personalised-title-suggestions/)
- 📚 [Amazon Bedrock Dokumentation & Preise](https://aws.amazon.com/bedrock/pricing/)
- 🎓 **Workshops & Kurse** (verifiziert via workshops.de API):
  - [KI Software Engineer: Modul 2 – Evals, Multi-Agentic Workflows](https://workshops.de/courses/ki-dev-modul-2) — RAG-Systeme, Evals & Qualitätssicherung, Multi-Agent-Architekturen
  - [KI Software Engineer: Modul 1 – Language Models, Agents, Workflows](https://workshops.de/courses/ki-dev-modul-1) — LLMs verstehen, Prompt- & Context-Engineering, Agentic Workflows
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/courses/ki-agenten-mit-n8n) — KI-Agenten und komplexe Workflows mit n8n