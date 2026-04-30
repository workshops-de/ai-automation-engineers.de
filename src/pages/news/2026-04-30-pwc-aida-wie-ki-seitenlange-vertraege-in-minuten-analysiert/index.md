---
layout: '../../../layouts/BlogLayout.astro'
title: 'PwC AIDA: Wie KI seitenlange Verträge in Minuten analysiert'
description: 'PwC AIDA: Wie KI seitenlange Verträge in Minuten analysiert'
pubDate: '2026-04-30'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1684941062179-c5e9ee14f885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw0fHxQd0MlMjBBSURBJTIwV2llJTIwS0klMjBUTERSJTIwUHdDJTIwaGF0fGVufDF8MHx8fDE3Nzc1Mzk0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** PwC hat auf AWS eine Annotation-Pipeline gebaut, die Legal- und Compliance-Teams bis zu 90 % Zeitersparnis bei der Vertragsanalyse bringt – und zeigt damit ein Architektur-Muster, das sich direkt auf andere Dokumenten-intensive Workflows übertragen lässt.

Vertragsanalyse ist ein klassisches Skalierungsproblem: Je mehr Verträge, desto mehr manueller Aufwand. PwC hat mit AIDA (AI-Driven Annotation) eine Lösung gebaut, die genau hier ansetzt – und am 29. April 2026 im AWS Machine Learning Blog die Architektur dahinter offengelegt. Das Ergebnis in der Praxis: Ein großes Film- und TV-Studio hat die Zeit für die Recherche zu Lizenzrechten um 90 % reduziert.

## Was ist neu?

AIDA kombiniert drei Kernmechanismen auf AWS: Erstens **template-basierte Extraktion**, bei der Legal-Teams einmalig Regeln und Labels definieren (z. B. "Kündigungsfristen", "Renewal-Klauseln") und diese dann parallel über tausende Verträge laufen lassen. Zweitens **dokumentenbasierter Chat** über einen einzelnen Vertrag, der die relevantesten Passagen semantisch findet und über Amazon Bedrock als kontextgebundene Antwort mit Zitatverweis zurückgibt. Drittens **globaler Chat** über mehrere Dokumente hinweg – für projektweite Auswertungen oder Vergleiche across Collections.

Die Architektur dahinter ist direkt lesbar: Dokumente werden per OCR aufbereitet und in Amazon S3 abgelegt, Embeddings über Amazon Bedrock Embedding Models erzeugt und in **Amazon OpenSearch Serverless** vektorisiert. Für Inferenz greift das AIDA-System auf die vektorisierte Wissensbasis zu und kombiniert semantische mit metadatenbasierter Filterung – Retrieval Augmented Generation (RAG) also, aber mit expliziten Guardrails (PII-Schutz, Prompt Safety) über **Amazon Bedrock Guardrails**. Die Skalierung der Extraction-Pipelines läuft asynchron über Amazon ECS mit Fargate und Amazon SQS, sodass große Vertragsvolumen parallel verarbeitet werden können.

## Was bedeutet das für AI-Automation-Engineers?

Das verändert konkret, wie Dokumenten-Analyse-Workflows gebaut werden: AIDA ist kein Produkt, sondern ein Architektur-Pattern – OCR → strukturierter Store → Embeddings → hybride semantische Suche → LLM-Orchestrierung mit menschlichem Review-Queue vor Downstream-Integration. Dieses Muster ist auf jede Branche übertragbar, in der unstrukturierte Dokumente in strukturierte, durchsuchbare Insights umgewandelt werden müssen: Medizinische Berichte, Compliance-Dokumente, Ausschreibungsunterlagen.

Für Teams, die solche Pipelines in n8n, Make oder eigenen Stacks aufbauen, zeigt AIDA konkret, wo die Grenzen von reinem Keyword-Matching liegen und warum das Zusammenspiel aus Rule-based Extraction und LLM-Interpretation für Skalierbarkeit entscheidend ist. Der Human-in-the-Loop-Review-Queue vor der Downstream-Übergabe ist dabei kein optionaler Nachsatz, sondern zentrales Design-Element für rechtliche und Compliance-Anforderungen.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel: Extracting contract insights with PwC's AI-driven annotation on AWS](https://aws.amazon.com/blogs/machine-learning/extracting-contract-insights-with-pwcs-ai-driven-annotation-on-aws/)
- 📚 [PwC AIDA – Offizielle Produktseite](https://www.pwc.com/us/en/technology/alliances/amazon-web-services/ai-driven-annotation.html)
- 📚 [Amazon Bedrock Knowledge Bases – Offizielle Docs](https://aws.amazon.com/bedrock/knowledge-bases/)
- 🎓 **Workshops & Kurse**:

💡 Passende Kurse zu diesem Thema befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote.