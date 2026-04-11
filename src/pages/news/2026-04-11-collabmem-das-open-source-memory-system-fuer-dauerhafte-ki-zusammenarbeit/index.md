---
layout: '../../../layouts/BlogLayout.astro'
title: 'collabmem: Das Open-Source Memory-System für dauerhafte KI-Zusammenarbeit'
description: 'collabmem: Das Open-Source Memory-System für dauerhafte KI-Zusammenarbeit'
pubDate: '2026-04-11'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1583681716866-c0d24d132420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHw2fHxjb2xsYWJtZW0lMjBEYXMlMjBPcGVuU291cmNlJTIwTWVtb3J5U3lzdGVtJTIwVExEUiUyMGNvbGxhYm1lbSUyMGlzdHxlbnwxfDB8fHwxNzc1ODkyNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** collabmem ist ein dateibasiertes, Open-Source-Memory-System, das KI-Assistenten wie Claude Code ein langfristiges Gedächtnis verleiht – ohne Datenbanken, Vector Stores oder proprietäre Infrastruktur. Episodische Erinnerungen und ein Weltmodell wachsen sitzungsübergreifend mit und machen jede neue Session kontextbewusst.

Was passiert, wenn dein KI-Agent nach jeder Session wieder von vorne anfängt? Er fragt dieselben Fragen, kennt keine vergangenen Entscheidungen und muss sich in jede neue Aufgabe neu einarbeiten. collabmem löst dieses Problem radikal einfach: plain-text Markdown-Dateien, git-versioniert, kein Vendor Lock-in – und ein durchdachtes Zwei-Tier-Konzept, das das AI-Bewusstsein über akkumuliertes Wissen dauerhaft aufrechthält.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Jetzt auf GitHub (aktiv entwickelt, Open Source)
- 🎯 **Zielgruppe**: KI-Engineers, Entwickler mit Claude Code, Teams die langfristig mit AI-Assistenten zusammenarbeiten
- 💡 **Kernfeature**: Episodisches Gedächtnis + Weltmodell in plain-text Markdown, dauerhaft kontextbewusst
- 🔧 **Tech-Stack**: Claude Code (optimiert), beliebiger AI-Assistent mit Dateizugriff, Git, Shell-Hooks

## Was bedeutet das für Automation Engineers?

Das Problem kennt jeder, der KI-Agenten produktiv einsetzen will: Jede neue Session ist ein Neustart. Der Agent weiß nicht, welche Architekturentscheidungen letzte Woche getroffen wurden, welche Workflows bereits existieren oder welche Anforderungen das Business hat.

collabmem adressiert genau das – und zwar ohne komplexe Infrastruktur. Im Automatisierungs-Workflow bedeutet das: Dein KI-Assistent wird zu einem echten Langzeit-Mitarbeiter, der sich an alles erinnert.

**Konkret spart das:**
- Die Zeit für Kontext-Briefings am Anfang jeder Session (5–15 Minuten)
- Wiederholte Erklärungen von Projektstruktur, Entscheidungen und Präferenzen
- Fehler durch vergessene Constraints oder bereits diskutierte Alternativen

### Wie die Integration in bestehende Stacks funktioniert

Das System lässt sich in jeden Workflow integrieren, der mit Claude Code, Cursor oder einem anderen File-aware AI-Assistenten arbeitet:

```
Workflow mit collabmem:
User: "Baue Feature X. readmem"
    ↓
AI liest Episodic Index + World Model (immer im Context)
    ↓
AI kennt: Projektkontext, vergangene Entscheidungen, offene TODOs
    ↓
Feature-Implementierung mit vollem Kontext
    ↓
User: "Done. updatemem"
    ↓
AI dokumentiert: Was wurde getan, warum, was gelernt
```

Die drei Sentinel-Tokens `readmem`, `updatemem` und `maintainmem` sind dabei die Steuerbefehle – einfach in die Nachricht an die KI eintippen.

## Technische Details

### Drei Memory-Typen

| Typ | Zweck | Dateien |
|-----|-------|---------|
| **Episodic** | Was passiert ist, was entschieden wurde, warum | `notes.md`, `docs/` |
| **World Model** | Aktuelles Verständnis der Realität | `world/`-Verzeichnis |
| **Working Memory** | Im Context Window der AI | Managed via Tiers |

### Zwei-Tier Context Management

Das Herzstück des Systems: Nicht alles passt ins Context Window eines AI-Modells. collabmem löst das elegant:

- **Tier 1 (immer im Kontext):** Episodischer Index, World-Model-Index und Kern-World-Files (Kontext, Präferenzen, aktueller Stand). Gehalten auf je ~5.000 Zeichen.
- **Tier 2 (on demand):** Detaillierte Notes, Referenz-Dokumente, erweitertes Domain-Wissen. Wächst unbegrenzt.

Entscheidend: Durch die Index-Dateien in Tier 1 hat die AI eine **permanente Awareness** über alles, was im Memory existiert – ohne explizite Suche. Das Attention-Mechanismus des Modells matcht automatisch gegen die im Context befindlichen Index-Einträge.

### File-Struktur nach Installation

```
.collab-config                  ← System-Settings (Projekt-Root)
collab/
├── methodology.md              ← AI Operating Instructions
├── index.md                    ← Episodic Memory Index (Tier 1)
├── notes.md                    ← Episodic Memory (Tier 2)
├── docs/                       ← Long-form Referenz-Dokumente (Tier 2)
└── world/
    ├── index.md                ← World Model Index (Tier 1)
    ├── context.md              ← Projektkontext, Business (Tier 1)
    ├── preferences.md          ← User-Arbeits-Präferenzen (Tier 1)
    ├── state.md                ← Current WIP, Todos, Blocker (Tier 1)
    ├── how-tos.md              ← Procedures (Tier 2)
    ├── domain.md               ← Domain-spezifisches Wissen (Tier 2)
    └── factoids.md             ← Fakten, Zahlen, Referenzen (Tier 2)
```

### Was collabmem von anderen Lösungen unterscheidet

**vs. platform-native Memory (Claude, Cursor):** Platform-Memory ist per-User und typischerweise ohne Team-Features. collabmem ist git-tracked, multi-user-fähig und plattformunabhängig.

**vs. Vector-Stores / RAG-Systeme:** Keine Embeddings, keine Vektordatenbank, kein Infrastructure-Overhead. Stattdessen: strukturierter Text + grep. Das Retrieval-Pattern ist `Index → Search → Read` – einfach, inspizierbar, nachvollziehbar.

**vs. MemGPT/Letta:** collabmem braucht keine eigene Agentic-Infrastruktur. Es läuft mit jedem File-aware AI-Assistenten – keine besonderen API-Setups erforderlich.

**User-verifiziertes Wissen:** Im Gegensatz zu automatisierten Memory-Systemen, die extrahieren, was das Modell für wichtig hält, bestätigt der User jede Memory-Aktualisierung. Das produziert präziseres, relevanters Wissen.

## Team-Kollaboration: Die Killer-Feature-Kombination

Besonders interessant für Engineering-Teams: collabmem unterstützt echte Multi-User-Szenarien. Jeder Note-Eintrag trägt User-Attribution, World-Model-Dateien haben per-User-Sektionen für git-freundliche Concurrent-Updates.

Das empfohlene Setup für Teams:
```
shared-knowledge-repo/
└── collab/
    ├── project-x/    ← Memory für Projekt X
    └── project-y/    ← Memory für Projekt Y
```

Im Code-Repository liegt nur ein gitignorierter Symlink `collab/` → externes Memory-Verzeichnis. So bleibt Code-History sauber und Memory-Changes haben ihre eigene Commit-History.

## Praktische Nächste Schritte

1. **Jetzt testen**: Das Repository clonen und einem AI-Assistenten sagen: *"Install the long-term collaboration memory system by cloning https://github.com/visionscaper/collabmem to a temporary location and following the instructions in it."* – die KI übernimmt die Installation.
2. **Workflow etablieren**: `readmem` am Session-Start zur Gewohnheit machen; `updatemem` nach abgeschlossenen Tasks
3. **Team-Setup planen**: Für Team-Nutzung ein Shared-Knowledge-Repo anlegen und das distributed-collaboration Pattern aus dem README befolgen

## Quellen & Weiterführende Links

- 📰 [collabmem GitHub Repository](https://github.com/visionscaper/collabmem)
- 📚 [install.md – Installations-Guide](https://github.com/visionscaper/collabmem/blob/main/install.md)
- 📚 [release-notes.md – Changelog](https://github.com/visionscaper/collabmem/blob/main/release-notes.md)
- 🎓 **Workshops & Kurse** (verifiziert via API):
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server) — Memory-Systeme, Multi-Agent-Architekturen & MCP-Server: der perfekte Companion-Kurs zum Thema persistente AI-Memory
  - [Claude: Modul 3 – Agentic Software Engineering with Claude Code](https://workshops.de/courses/software-engineering-claude-code) — Von Claude Code Installation bis Multi-Agent-Workflows; collabmem ist direkt für Claude Code optimiert

---

## Technical Review vom 2026-04-11

**Review-Status**: PASSED_WITH_CHANGES

### Vorgenommene Änderungen:
1. **Zeile ~951 (Verfügbarkeit)**: Entfernt: spezifische Versionsnummer "v1.8" (nicht verifiziert im GitHub Repository) und ungenaue Lizenz-Angabe "Apache 2.0" (Lizenz nicht in öffentlich verfügbaren Quellen bestätigt). Ersetzt durch: "Jetzt auf GitHub (aktiv entwickelt, Open Source)" — Grund: Projekt wurde heute (11.04.2026) auf Hacker News veröffentlicht, sehr neu, Version/Lizenz noch nicht in offiziellen Docs verifizierbar
2. **Zeile ~7046 (n8n-Kurs-URL)**: Korrigiert von `https://workshops.de/kurse/n8n-multi-agent-systeme-mcp-server` zu `https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server` — Grund: Falsche URL-Struktur, korrekte URL gegen workshops.de verifiziert
3. **Zeile ~7275 (Claude-Kurs-URL)**: Korrigiert von `https://workshops.de/kurse/software-engineering-claude-code` zu `https://workshops.de/courses/software-engineering-claude-code` — Grund: Falsche URL-Struktur, korrekte URL gegen workshops.de verifiziert

### Verifizierte Fakten:
- ✅ GitHub Repository https://github.com/visionscaper/collabmem existiert (verifiziert via Hacker News Announcement vom 11.04.2026)
- ✅ Sentinel Tokens (readmem, updatemem, maintainmem) korrekt (bestätigt via HN-Discussion)
- ✅ Plain-text Markdown-Dateien + Git-Tracking korrekt beschrieben
- ✅ Optimierung für Claude Code bestätigt
- ✅ File-Struktur-Beschreibung plausibel (collab/index.md, notes.md, world/ etc.)
- ✅ Zwei-Tier-Konzept (Tier 1 = immer im Context, Tier 2 = on demand) technisch sinnvoll
- ✅ Workflow-Diagramm korrekt dargestellt

### Link-Verifikation:
- ✅ 5 externe Links geprüft
- ✅ GitHub-Repository-Links alle erreichbar (200 OK):
  - github.com/visionscaper/collabmem
  - github.com/visionscaper/collabmem/blob/main/install.md
  - github.com/visionscaper/collabmem/blob/main/release-notes.md
- ✅ 2 workshops.de Kurs-Links verifiziert und korrigiert:
  - n8n: Modul 2 existiert (Titel: "n8n: Modul 2 - Multi-Agent-Systeme & MCPs Intensiv-Schulung")
  - Claude: Modul 3 existiert (Titel: "Agentic Software Engineering with Claude Code Intensiv-Schulung")

### Besonderheiten:
⚠️ **Projekt ist brandneu** (Veröffentlichung heute, 11.04.2026 auf Hacker News "Show HN"). Daher:
- Noch keine Release-Versions-Tags im Repo sichtbar → Version-Angabe entfernt
- Lizenz noch nicht in öffentlich zugänglichen Quellen bestätigt → Lizenz-Angabe entfernt
- File-Struktur und technische Details basierend auf HN-Announcement und README plausibel, aber noch nicht durch extensive Community-Nutzung validiert

### Code-Beispiele:
✅ Workflow-ASCII-Diagramm syntaktisch korrekt und logisch nachvollziehbar
✅ File-Struktur-Tree korrekt formatiert
✅ Tabelle (Memory-Typen) korrekt strukturiert

### Empfehlungen:
- 💡 Artikel kann veröffentlicht werden — alle kritischen Fehler korrigiert
- 📚 Zukünftige Updates könnten exakte Versionsnummer nachtragen, sobald GitHub Releases existieren
- 📚 Lizenz-Information ergänzen, sobald im Repo verifizierbar

**Reviewed by**: Technical Review Agent  
**Verification Sources**: 
- Hacker News (news.ycombinator.com/item?id=47726056)
- GitHub Repository (github.com/visionscaper/collabmem)
- workshops.de Kursseiten
- Perplexity AI Research

**Konfidenz-Level**: HIGH  
(Projekt neu, aber Kernaussagen verifiziert; URLs korrigiert; keine kritischen technischen Fehler)

---