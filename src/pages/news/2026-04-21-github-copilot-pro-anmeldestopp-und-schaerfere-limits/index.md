---
layout: '../../../layouts/BlogLayout.astro'
title: 'GitHub Copilot Pro: Anmeldestopp und schärfere Limits'
description: 'GitHub Copilot Pro: Anmeldestopp und schärfere Limits'
pubDate: '2026-04-21'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1676573408178-a5f280c3a320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw0fHxHaXRIdWIlMjBDb3BpbG90JTIwUHJvJTIwQW5tZWxkZXN0b3BwJTIwVExEUiUyMEdpdEh1YiUyMGhhdHxlbnwxfDB8fHwxNzc2NzU3MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** GitHub hat am 20. April 2026 neue Anmeldungen für Copilot Pro, Pro+ und Student pausiert, die Usage-Limits verschärft und Opus-Modelle aus dem Pro-Plan entfernt – Hintergrund sind massiv gestiegene Compute-Kosten durch agentic Workflows.

GitHub VP of Product Joe Binder erklärte die Änderungen am 20. April 2026 in einem offiziellen Blogpost. Konkret trifft Teams folgendes: Neue Einzelnutzer können sich nicht mehr für Copilot Pro, Pro+ oder die Studentenversion anmelden. Bestehende Pro-Nutzer erhalten schärfere Usage-Limits, während Pro+ mehr als das Fünffache dieser Limits bietet. Zusätzlich wurden Opus-Modelle vollständig aus dem Pro-Plan entfernt; Opus 4.7 ist nur noch in Pro+ verfügbar, Opus 4.5 und 4.6 werden auch dort abgekündigt. Der erklärte Grund: Agentic Workflows – also lang laufende, parallelisierte KI-Agenten-Sessions – haben den Compute-Bedarf so stark erhöht, dass einzelne Nutzersitzungen die monatlichen Plankosten übersteigen können.

## Was ist neu?

GitHub Copilot arbeitet nun mit zwei parallelen Limitierungsebenen: Session-Limits, die kurzzeitige Lastspitzen abfedern, und wöchentliche Token-Limits, die den Gesamtverbrauch deckeln. Beide sind vom Premium-Request-Kontingent getrennt – ein Nutzer kann also noch Premium-Requests übrig haben und trotzdem ein Usage-Limit erreichen. Pro+ bietet dabei mehr als fünfmal so viel Kapazität wie Pro. Neu ist auch, dass VS Code und Copilot CLI nun aktiv Warnungen einblenden, wenn ein Nutzer 75 % seines wöchentlichen Limits erreicht hat. Wird das Limit überschritten, wechselt Copilot automatisch auf „Auto"-Modellauswahl – manuell gewählte Modelle werden erst nach Reset der Wochenperiode wieder freigegeben.

Nutzer, die mit den Änderungen nicht einverstanden sind oder unerwartete Limits erfahren, können ihre Pro- oder Pro+-Subscription kündigen und erhalten auf Anfrage an den GitHub Support eine vollständige Erstattung der April-Nutzung – der Anspruch muss bis zum **20. Mai 2026** geltend gemacht werden.

## Was bedeutet das für Teams und Tech Leads?

Für Teams und Tech Leads ist relevant, dass Individual-Pläne strukturell unzuverlässiger werden, während Business- und Enterprise-Pläne davon unberührt bleiben. Wer Copilot in Entwicklerteams auf Individual-Plan-Basis betreibt, sollte jetzt die tatsächliche Usage monitoren – VS Code und CLI liefern dafür erstmals sichtbare Indikatoren – und prüfen, ob eine Migration auf Business- oder Enterprise-Lizenzen sinnvoll ist. Letztere bieten nicht nur höhere Limits, sondern auch zentrale Verwaltung, Compliance-Einstellungen und sind von der parallel eingeführten Opt-out-Regelung zur KI-Trainingsdatennutzung ausgenommen, was für DSGVO-sensible Umgebungen relevant sein kann. Darüber hinaus signalisiert die Ankündigung einen grundlegenden Shift in der Copilot-Preislogik: Weg von Flat-Rate, hin zu token-basierter Kapazitätssteuerung. Teams, die intensiv auf agentic Coding-Workflows setzen, sollten dies bei der mittel- bis langfristigen Toolstrategie einkalkulieren.

## Quellen & Weiterführende Links

- 📰 [Original-Artikel: Changes to GitHub Copilot Individual plans](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/)
- 📚 [GitHub Docs: Individual Copilot Plans](https://docs.github.com/en/copilot/concepts/billing/individual-plans)
- 📚 [GitHub Changelog: Changes to Copilot plans for individuals](https://github.blog/changelog/2026-04-20-changes-to-github-copilot-plans-for-individuals/)
- 🎓 **Workshops & Kurse** (verifiziert via API):

> 💡 Passende Kurse speziell zu GitHub Copilot befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote. Für einen breiten Einstieg in KI-gestütztes Arbeiten empfiehlt sich der [KI Software Engineer: Modul 1 - Language Models, Agents, Workflows](https://workshops.de/seminare/ki-dev-modul-1).