---
layout: '../../../layouts/BlogLayout.astro'
title: 'Warum KI-Coding-Tools kein REST mögen'
description: 'Warum KI-Coding-Tools kein REST mögen'
pubDate: '2026-05-08'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1752848695999-81b646f30eb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw3fHxXYXJ1bSUyMEtJQ29kaW5nVG9vbHMlMjBrZWluJTIwUkVTVCUyMFRMRFIlMjBLSUNvZGluZ0Fzc2lzdGVudGVuJTIwZ2VuZXJpZXJlbnxlbnwxfDB8fHwxNzc4MjIyNDU1fDA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** KI-Coding-Assistenten generieren beobachtbar häufiger RPC-artige POST-Endpoints als saubere RESTful APIs – eine HackerNews-Diskussion beleuchtet die wahrscheinlichen Ursachen und was das für AI-unterstützte Projekte bedeutet.

Eine aktuelle Diskussion auf HackerNews greift eine Beobachtung auf, die viele Entwickler kennen, aber selten explizit benennen: KI-Coding-Tools wie GitHub Copilot, Cursor oder Claude Code tendieren dazu, RPC-artige POST-Endpoints zu generieren – selbst dann, wenn ein einfaches GET semantisch korrekt und ausreichend wäre. Der Thread-Autor fasst es prägnant zusammen: „Ist das Absicht? Oder ein Nebenprodukt von Token-Effizienz?"

## Was ist neu?

Die Diskussion liefert drei plausible Erklärungsansätze, die sich gegenseitig nicht ausschließen. Erstens der **Trainingsdaten-Bias**: REST-APIs sind in der Praxis notorisch inkonsistent implementiert – unterschiedliche Teams handhaben Auth, Pagination und Fehlerbehandlung komplett verschieden. KI-Modelle haben demnach keine einheitliche „korrekte" REST-Vorlage internalisiert, sondern ein breites Spektrum divergierender Muster. Zweitens der **Token-Effizienz-Faktor**: POST-Requests mit JSON-Body sind strukturell vorhersagbarer und konsistenter zu generieren als die ressourcenorientierte Logik von REST mit ihren unterschiedlichen HTTP-Verben und URL-Strukturen. Drittens – und das ist der interessanteste Punkt – könnte es sich um eine implizite **Modellpräferenz für strikte Contracts** handeln: GraphQL und gRPC haben formal definierte Schemata, die für Sprachmodelle einfacher zu „verstehen" und zu replizieren sind als das flexible, aber uneinheitliche REST-Paradigma.

Ein Community-Kommentar bringt es auf den Punkt: „REST hat keine Standards – und genau deshalb hat REST auch so viele Sicherheitslücken."

## Was bedeutet das für Automation Engineers?

Wer KI-Coding-Tools produktiv in API-Projekten einsetzt – ob über Cursor, Claude Code oder n8n-Workflow-Generierung – sollte dieses Verhalten als Default-Bias verstehen, nicht als Fehler. Das hat konkrete Implikationen für den Stack: Generierte Backends, die intern ausschließlich über POST kommunizieren, funktionieren technisch einwandfrei, können aber API-Gateways, Caching-Layers und Tool-Integrationen (z. B. Zapier, Make) belasten, die auf HTTP-Semantik (GET für lesende Operationen, idempotente Requests) angewiesen sind. Die Gegenmaßnahme ist simpel, aber erfordert bewusstes Prompting: Explizite Constraints wie „use RESTful conventions, GET for read operations, resource-based URL structure" im System-Prompt oder in der Regel-Datei des jeweiligen Tools (`.cursor/rules/*.mdc`, `CLAUDE.md`) verankern das gewünschte Muster zuverlässig – wie mehrere HN-Kommentatoren bestätigen.

## Quellen & Weiterführende Links

- 📰 [HackerNews-Diskussion: Why don't AI coding tools like REST?](https://news.ycombinator.com/item?id=47939342)
- 📚 [POST-only debate: RPC vs. REST im Überblick](https://blog.logto.io/post-only-debate)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [KI Software Engineer: Modul 1 – Language Models, Agents, Workflows](https://workshops.de/seminare-schulungen-kurse/ki-dev-modul-1) — LLMs verstehen und Prompting-Strategien für Engineering-Kontext
💡 Passende Kurse zu Claude Agents und Workflows befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote.