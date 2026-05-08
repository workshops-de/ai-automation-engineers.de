---
layout: '../../../layouts/BlogLayout.astro'
title: 'KI-Anbieter am Limit: Warum Claude Code und GitHub Copilot jetzt drosseln'
description: 'KI-Anbieter am Limit: Warum Claude Code und GitHub Copilot jetzt drosseln'
pubDate: '2026-05-08'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&h=600&fit=crop'
---

**TL;DR:** Anthropic schränkt Claude Code für Einstiegstarife ein, GitHub Copilot stoppt Neuanmeldungen – der Grund ist derselbe: Agentenbasierte Workflows sprengen die Kostenmodelle, die 2022 konzipiert wurden.

Innerhalb von 48 Stunden haben zwei der meistgenutzten KI-Tools für Entwickler und Automatisierer ihre Verfügbarkeit eingeschränkt. Am Sonntag, dem 20. April 2026, stoppte Microsofts GitHub Copilot vorübergehend Neuanmeldungen für Student-, Pro- und Pro+-Tarife und verschärfte gleichzeitig Nutzungsbeschränkungen. Einen Tag später prüfte Anthropic öffentlich, ob Claude Code für zahlen­de Abonnenten im Pro-Tarif ($20/Monat) weiterhin enthalten sein soll – und löste damit eine Welle der Empörung in der Community aus. Anthropic ruderte zurück, nannte es einen „Test" und versprach Vorankündigung bei größeren Änderungen. Der Schaden am Vertrauen war dennoch spürbar.

## Was ist neu?

Der Kern des Problems ist strukturell: Beide Anbieter haben ihre Tarifmodelle für klassische Chat-Nutzung kalkuliert – nicht für lang laufende, parallelisierte Agenten-Sessions. Joe Binder, Produktleitung bei GitHub, schrieb es in seinem Ankündigungspost klipp und klar: „Lang laufende, parallelisierte Sitzungen verbrauchen nun regelmäßig weitaus mehr Ressourcen, als die ursprüngliche Planstruktur unterstützen sollte." Einzelne Anfragen kosten heute mehr als der gesamte Monatspreis eines Tarifs.

Anthropics Head of Growth Amol Avasare bestätigte das auf X: „Als wir Max vor einem Jahr auf den Markt brachten, war Claude Code noch nicht enthalten, CoWork gab es noch nicht, und Agenten, die stundenlang laufen, waren kein Thema." Der Pro-Tarif war für intensive Chat-Nutzung konzipiert – nicht für das, was Power-User heute damit machen. Erschwerend kommt hinzu, dass Anthropic seit dem Konflikt mit der Trump-Regierung Ende Februar einen massiven Nutzerzustrom erlebt hat. Claude kletterte innerhalb eines Monats zur Nummer 1 im Apple App Store – auf Infrastruktur, die dafür nicht ausgelegt war.

Hinzu kommen regionale Kapazitätsgrenzen: Rechenzentren bedienen keine globalen Pools, sondern länderspezifische Cloud-Regionen. Nutzer in Europa treffen damit auf andere Engpässe als US-Nutzer – ein Faktor, der in Flat-Rate-Modellen schlicht nicht eingepreist war.

## Was bedeutet das für KI-Automatisierer?

Das verändert konkret, wie Workflows mit Claude Code, CoWork und n8n aufgebaut werden müssen. Wer heute Multi-Agent-Pipelines betreibt – etwa parallele Claude-Instanzen über CoWork oder lang laufende Codex-Agents über GitHub Copilot –, muss damit rechnen, dass Flat-Rate-Modelle für intensive Nutzung wegfallen oder deutlich teurer werden. Arun Chandrasekaran von Gartner bringt es auf den Punkt: Anbieter werden entweder Modelle effizienter machen, Anfragen intelligenter routen oder Nutzer nach Priorität sortieren – keine dieser Optionen ist für Power-User angenehm.

Für Automatisierungsworkflows bedeutet das konkret: Kosten-Monitoring wird Pflicht, Token-Verbrauch pro Agent-Run muss transparent sein, und Fallback-Strategien auf günstigere Modelle für weniger kritische Tasks werden relevant. OpenAI nutzt die Situation strategisch: Codex bleibt vorerst für alle Tarife verfügbar, und Sam Altman kündigte an, Ratenbeschränkungen für Codex-Nutzer zurückzusetzen – ein direktes Abwerbeangebot an frustrierte Claude-Code-Nutzer.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel – Business Insider DE](https://www.businessinsider.de/wirtschaft/microsoft-und-anthropic-unter-druck-ki-anbieter-am-limit/)
- 📚 [Anthropic – Statement zu Claude Code Verfügbarkeit (X, Amol Avasare)](https://x.com)
- 📚 [GitHub Blog – Änderungen zu GitHub Copilot Individual Plans (20. April 2026)](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/)
- 🎓 **Workshops & Kurse** (verifiziert via workshops.de API):
  - [Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Genau das richtige Timing: Claude Code von der Installation bis zum Multi-Agent-Workflow, inkl. CI/CD-Integration
  - [n8n: Modul 1 - Automatisierung mit KI-Agenten](https://workshops.de/seminare-schulungen-kurse/ki-agenten-mit-n8n) — Alternativer Stack: KI-Agenten mit n8n für produktionsreife Automatisierung
  - 💡 Passende Kurse zu Claude Agents und CoWork befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote.