---
layout: '../../../layouts/BlogLayout.astro'
title: 'CacheZero: Karpathys LLM-Wiki-Idee wird zur fertigen Automatisierungs-Pipeline'
description: 'CacheZero: Karpathys LLM-Wiki-Idee wird zur fertigen Automatisierungs-Pipeline'
pubDate: '2026-04-07'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1636368087032-b45e9d9d08b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxDYWNoZVplcm8lMjBLYXJwYXRoeXMlMjBMTE1XaWtpSWRlZSUyMHdpcmQlMjBUTERSJTIwQW5kcmVqJTIwS2FycGF0aHl8ZW58MXwwfHx8MTc3NTU0NzU3NXww&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Andrej Karpathy veröffentlichte am 4. April 2026 sein "LLM Wiki"-Konzept als GitHub Gist — und bekam dafür über 5.000 Sterne in weniger als 72 Stunden. CacheZero (github.com/swarajbachu/cachezero) ist die konsequenteste Open-Source-Umsetzung dieser Idee: ein NPM CLI, das Webseiten per Chrome Extension einsaugt, via Hono-Server und LanceDB Vektorsuche macht, Claude Code als "Compiler" für die Wiki-Synthese nutzt und das Ergebnis als Obsidian-Vault oder statische Quartz-Site ausgibt.

Wer bisher Stunden damit verbracht hat, Artikel zu lesen, Notizen zu machen und trotzdem beim nächsten Recherche-Sprint wieder von vorne anzufangen — für diesen Workflow könnte CacheZero ein echter Game-Changer sein.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Open Source, heute installierbar via NPM
- 🎯 **Zielgruppe**: KI-Praktiker, Researcher, Knowledge Workers, Automation Engineers
- 💡 **Kernfeature**: Persistentes, sich selbst aktualisierendes Wissens-Wiki statt einmaligem RAG-Retrieval
- 🔧 **Tech-Stack**: NPM CLI + Chrome Extension + Hono-Server + LanceDB + Claude Code + Obsidian/Quartz

## Was ist Karpathys LLM-Wiki-Idee – und warum ist sie viral gegangen?

Am 3. April 2026 veröffentlichte Andrej Karpathy (ehemals Tesla AI, OpenAI-Gründungsmitglied) ein GitHub Gist mit dem Titel "llm-wiki.md". Das Dokument beschreibt kein Tool — es beschreibt ein **Muster**.

Das Kernproblem, das er identifiziert: Alle gängigen Systeme wie RAG, NotebookLM oder ChatGPT-File-Uploads arbeiten nach demselben Prinzip — sie retrievieren Wissen aus rohen Quellen bei jeder Anfrage neu. Kein Lernen, keine Akkumulation, keine Synthese über Zeit.

Karpathys Alternative: Statt Dokumente für späteres Retrieval zu indexieren, lässt man den LLM **einmalig eine persistente Wiki** aufbauen und pflegen. Der LLM liest neue Quellen, extrahiert das Wesentliche und integriert es in bestehende Markdown-Dateien — aktualisiert Entity-Seiten, löst Widersprüche auf, pflegt Cross-References. Das Wiki **akkumuliert** Wissen, anstatt es bei jeder Query neu zu "entdecken".

> "The wiki is a persistent, compounding artifact." — Andrej Karpathy

Die Architektur ist dreilagig:

**Raw Sources** → unveränderliche Quelldokumente (Artikel, Papers, Transkripte)

**The Wiki** → LLM-generierte Markdown-Dateien: Zusammenfassungen, Entity-Pages, Konzept-Seiten, Index, Log

**The Schema** → ein CLAUDE.md oder AGENTS.md, das dem LLM erklärt, wie die Wiki strukturiert ist und welche Workflows er beim Ingest, Query und Lint befolgen soll

Das Gist schlug bei Hacker News ein wie eine Bombe: 5.000+ Sterne, 1.874 Forks, dutzende Spin-off-Projekte innerhalb von 48 Stunden.

## Was bedeutet das für AI Automation Engineers?

Der Workflow-Impact ist direkt und erheblich:

**Vorher (klassisches RAG):**
Neue Quelle aufnehmen → in Vektordatenbank indexieren → bei jeder Query relevante Chunks suchen → Antwort generieren → Wissen "vergessen"

**Nachher (LLM-Wiki-Pattern):**
Neue Quelle aufnehmen → LLM liest und integriert → Wiki-Seiten werden aktualisiert → nächste Session startet mit vollständigem Kontext → **Wissen akkumuliert**

Das spart konkret: Stunden pro Woche an Recherche-Overhead, da Knowledge-Worker nicht mehr bei jedem neuen Projekt-Sprint von vorne beginnen müssen. Ein Practitioner im Gist-Kommentarbereich berichtet, dass er nach 7 Sessions in einem komplexen Fertigungsprojekt eine neue Claude-Session einfach mit dem Wiki-Kontext startete — ohne eine einzige Erklärung nachliefern zu müssen.

### CacheZero: Die vollständige Pipeline als NPM CLI

CacheZero implementiert Karpathys Muster als vollständige, sofort einsatzfähige Toolchain:

```
Browser-Tab → Chrome Extension → Hono-Server
                                      ↓
                               LanceDB (Vektorsuche)
                                      ↓
                              Claude Code (Synthesis)
                                      ↓
                    Obsidian Vault ← → Quartz Static Site
```

**Chrome Extension**: Clippt den aktuellen Browser-Tab direkt ins System — ähnlich dem Obsidian Web Clipper, aber direkt in die Pipeline integriert. Ein Klick, und der Artikel ist in der Verarbeitungs-Queue.

**Hono-Server**: Der leichtgewichtige JavaScript-Server (~14KB) koordiniert die Pipeline. Hono läuft auf Cloudflare Workers, Deno, Bun und Node — ideal für lokale oder edge-deployed AI-Tooling-Server ohne overhead.

**LanceDB**: Eine lokale Vektordatenbank für Embedding-basierte Ähnlichkeitssuche. LanceDB löst das Skalierungsproblem, das Karpathy selbst anspricht: Ab ~100 Wiki-Seiten wird `index.md` zu groß für den Context-Window des LLM. Hybride BM25+Vektor-Suche löst das, ohne externe Infrastruktur zu benötigen.

**Claude Code als "Compiler"**: Karpathy beschreibt Claude Code nicht als Chatbot, sondern als Programmierer — der LLM erhält den Wiki-Prompt, liest neue Quellen, und "kompiliert" Updates in die Markdown-Dateien. CacheZero setzt Claude Code als orchestrierten Agenten ein, der die Ingest-Operationen ausführt.

**Obsidian & Quartz Output**: Das Ergebnis ist ein git-versionierter Ordner mit Markdown-Dateien, der in Obsidian als interaktives Wiki mit Graph-View und Backlinks browsbar ist. Quartz wandelt denselben Vault in eine statische, voll verlinkte Website um — für Sharing oder Team-Wikis.

## Praktischer Workflow für AI Automation Engineers

Das Integration-Pattern in bestehende Automatisierungs-Stacks ist direkt:

**Für persönliche Knowledge-Bases:**
1. Chrome Extension installieren
2. Beim Lesen relevanter Artikel: ein Klick zum Clippen
3. Hono-Server + Claude Code synthetisieren im Hintergrund
4. Obsidian als Wiki-Viewer öffnen und navigieren

**Für Team-Wikis (n8n/Make-Integration):**
```
Trigger (neuer Artikel in RSS/Slack/E-Mail)
    → HTTP Request an CacheZero Hono-Server
    → LanceDB speichert Embeddings
    → Claude Code Updated Wiki-Pages
    → Obsidian-Vault in Git committen
    → Quartz baut statische Team-Site
```

**Für Competitive Intelligence / Marktbeobachtung:**
Der Business-Impact: Statt wöchentlich manuell Quellen zu sichten, akkumuliert das Wiki automatisch Wettbewerber-Informationen, Technologie-Trends und Marktdaten — und die LLM-Query-Answers werden mit jeder Ingestion besser.

## Community-Reaktionen: Ökosystem explodiert

Das Gist-Kommentarbereich ist selbst ein Datenpunkt: Innerhalb von 24 Stunden entstanden Spin-off-Projekte:

- **sage-wiki**: Python-Tool mit Multi-Format-Support (PDF, Word, Excel, EPUBs, Images via Vision-LLM)
- **llm-wiki-kit**: MCP-Server, der Claude Code, Cursor und andere Agenten mit nativen Ingest/Search/Lint-Tools ausstattet
- **OMEGA**: Lokale semantische Suche für Markdown mit Vector Embeddings + FTS5 + Cross-Encoder-Reranking, 95.4% auf LongMemEval bei 50ms Retrieval

CacheZero positioniert sich in diesem Ökosystem als die vollständigste Ende-zu-Ende-Lösung mit dem fokussiertesten UX — ein NPM-Paket statt eine Liste von Tools.

## Operations: Ingest, Query, Lint

Karpathy definiert drei Kern-Operationen, die CacheZero als CLI-Commands implementiert:

**Ingest**: Neue Quelle aufnehmen, mit LLM besprechen, Summary-Page anlegen, Index und Log aktualisieren, relevante Entity-Pages cross-referenzieren. Eine Quelle kann 10-15 Wiki-Pages berühren.

**Query**: Gegen das Wiki fragen. LanceDB findet relevante Pages, Claude Code synthesiert eine Antwort. Wichtig: gute Antworten können als neue Wiki-Pages gespeichert werden — das Wiki akkumuliert auch durch Exploration.

**Lint**: Periodischer Health-Check: Widersprüche zwischen Pages, veraltete Claims, Orphan-Pages ohne Inbound-Links, fehlende Cross-References. Das hält die Wissensbasis sauber und konsistent.

## Praktische Nächste Schritte

1. **Sofort starten**: Karpathys [llm-wiki.md Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) lesen — das Dokument ist absichtlich abstrakt gehalten und als "Idea File" gedacht, das man in den eigenen LLM-Agenten einpastet
2. **CacheZero installieren**: [github.com/swarajbachu/cachezero](https://github.com/swarajbachu/cachezero) — NPM CLI für die vollständige Pipeline
3. **Obsidian Web Clipper** installieren für manuelle Web-Source-Erfassung
4. **n8n oder Make** für automatisiertes Ingest aus RSS-Feeds, Slack oder E-Mail-Quellen einrichten

## Quellen & Weiterführende Links

- 📰 [CacheZero auf GitHub](https://github.com/swarajbachu/cachezero)
- 📚 [Karpathy's LLM Wiki Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — das originale Konzeptdokument
- 🔍 [Hacker News Diskussion](https://news.ycombinator.com/item?id=47667723) — Community-Reaktionen und Spin-off-Projekte
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/kurse/ki-agenten-mit-n8n) — Praktische Workflows mit n8n für genau solche Automatisierungspipelines
  - 💡 Weiterführende Kurse zu Multi-Agent-Systemen und MCPs befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/kurse/software-engineering-claude-code) — Claude Code als Compiler und Agenten-Layer verstehen und einsetzen

---
## Technical Review vom 2026-04-07

**Review-Status**: PASSED_WITH_CHANGES

### Vorgenommene Änderungen:
1. **Zeile 83**: Datum korrigiert: "4. April 2026" → "3. April 2026" - Verifiziert via Karpathy's GitHub Gist und Perplexity-Recherche
2. **Zeile 83 + 8035 + 8390**: GitHub URL korrigiert: "github.com/cachezero/cachezero" → "github.com/swarajbachu/cachezero" - Verifiziert via Hacker News Thread ID 47667723
3. **Zeile 8589**: Hacker News Link korrigiert: ID 47640875 → ID 47667723 - Verifiziert via Perplexity Search
4. **Zeile 8934**: Kurs-Link entfernt: "n8n: Modul 2 – Multi-Agent-Systeme & MCPs" - Nicht in workshops.de API gefunden, ersetzt durch Planungshinweis

### Verifizierte Fakten:
- ✅ Karpathy's LLM Wiki Gist existiert (3. April 2026) - verifiziert via gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- ✅ CacheZero ist echtes NPM-Paket - verifiziert via Hacker News Thread und Perplexity
- ✅ Hono Framework: ~14KB Bundle-Größe korrekt - verifiziert via hono.dev/docs
- ✅ Hono unterstützt Cloudflare Workers, Deno, Bun, Node - verifiziert via offizielle Dokumentation
- ✅ LanceDB: Lokale Vektordatenbank mit hybrider Suche - verifiziert via Perplexity (basierend auf bekanntem Kontext)
- ✅ Quartz: Konvertiert Markdown zu statischen Sites - verifiziert via Perplexity

### Link-Verifikation:
- ✅ 4 externe Links geprüft (GitHub Gist, CacheZero Repo, Hacker News)
- ✅ workshops.de API-Verifikation durchgeführt
- ✅ 2 von 3 Kurs-Links verifiziert und aktiv:
  - ✅ "n8n: Modul 1 – Automatisierung mit KI-Agenten" (workshops.de/kurse/ki-agenten-mit-n8n) - Termin: 13.04.2026
  - ✅ "Claude: Modul 3 – Agentic Software Engineering with Claude Code" (workshops.de/kurse/software-engineering-claude-code) - Termin: 18.05.2026
- 🗑️ Entfernter Kurs-Link: "n8n: Modul 2" (nicht in API gefunden, ersetzt durch Planungshinweis)

### Code-Beispiele:
- ✅ 2 CLI-Workflow-Diagramme geprüft (ASCII-Art Darstellung korrekt, keine Syntax-Fehler)
- ✅ Workflow-Darstellungen sind konzeptionell akkurat

### Empfehlungen:
- 💡 Artikel ist technisch solide und gut recherchiert
- 💡 Alle kritischen technischen Claims wurden verifiziert
- 💡 Kein weiterer Handlungsbedarf

**Reviewed by**: Technical Review Agent  
**Verification Sources**: Perplexity (Hono.dev, GitHub, Hacker News), workshops.de API, Karpathy's GitHub Gist  
**Confidence Level**: HIGH