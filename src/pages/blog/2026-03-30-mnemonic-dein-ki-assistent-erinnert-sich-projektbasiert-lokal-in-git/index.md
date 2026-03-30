---
layout: '../../../layouts/BlogLayout.astro'
title: 'Mnemonic: Dein KI-Assistent erinnert sich – projektbasiert, lokal, in Git'
description: 'Mnemonic: Dein KI-Assistent erinnert sich – projektbasiert, lokal, in Git'
pubDate: '2026-03-30'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1542195830-ecee75a73ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxNbmVtb25pYyUyMERlaW4lMjBLSUFzc2lzdGVudCUyMGVyaW5uZXJ0JTIwVExEUiUyME1uZW1vbmljJTIwaXN0fGVufDF8MHx8fDE3NzQ4NzM5MTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Mnemonic ist ein lokaler MCP-Server, der KI-Memories als Plain Markdown in Git speichert – mit projektbasierter semantischer Suche via Ollama, ohne Datenbank und ohne Cloud-Abhängigkeit. Ein ernstzunehmendes Tool für alle, die ihren KI-Workflow dauerhaft mit Kontext anreichern wollen.
Eines der größten Reibungsprobleme in KI-gestützten Entwicklungsworkflows: Jede neue Session beginnt bei null. Claude Code, Cursor, Copilot – sie alle „vergessen" alles zwischen den Sitzungen. Mnemonic löst genau dieses Problem – und zwar auf eine Art, die perfekt in bestehende Entwicklungsinfrastruktur passt.
## Die wichtigsten Punkte
- 📅 **Verfügbarkeit**: Jetzt als Early-Stage-Projekt verfügbar via `npm install @danielmarbach/mnemonic-mcp`, Homebrew und Docker
- 🎯 **Zielgruppe**: Entwickler und KI-Practitioner, die mit Claude Code, Cursor, VS Code oder OpenCode arbeiten
- 💡 **Kernfeature**: Projektbasiertes Memory-System – Erinnerungen leben in `.mnemonic/` direkt im Repo und reisen mit dem Code
- 🔧 **Tech-Stack**: Node.js 18+, Ollama (lokale Embeddings), Git als Datenbank, MCP (Model Context Protocol) via stdio
## Was bedeutet das für KI-Automation-Workflows?
Das Problem ist bekannt: Du erklärst deinem KI-Assistenten morgens die Architektur deines Projekts, die wichtigsten Design-Entscheidungen, die Besonderheiten im Setup – und am nächsten Tag startet die nächste Session wieder bei einem leeren Kontext. Das kostet Zeit, erzeugt Inkonsistenzen und bremst den Flow.
Mnemonic adressiert das mit einem eleganten Ansatz: Statt einer proprietären Datenbank oder einem Cloud-SaaS-Service wird **Git selbst zur Datenbank**. Jede gespeicherte Erinnerung ist eine Markdown-Datei mit YAML-Frontmatter. Jeder `remember`-, `update`- oder `consolidate`-Aufruf erzeugt einen semantischen Git-Commit. Das Memory-Log ist damit genauso versionierbar, inspizierbar und portabel wie der Quellcode selbst.
Im Workflow bedeutet das konkret: Ein neuer Entwickler klont das Repo – und bekommt automatisch auch den gesamten Entscheidungskontext des Teams mitgeliefert.
### Zwei Vault-Typen, ein mentales Modell
Mnemonic unterscheidet zwischen zwei Speicherorten:
**Main Vault** (`~/mnemonic-vault`) → Privates, globales Memory. Cross-Projekt-Wissen, persönliche Präferenzen, Tool-Konfigurationen.
**Project Vault** (`.mnemonic/` im Repo) → Projektspezifisches Memory. Architekturentscheidungen, Bug-Fix-Kontext, Team-Wissen – direkt im Repository committed und für alle Teammitglieder zugänglich.
Die Recall-Logik priorisiert automatisch Projektmemories mit einem Similarity-Boost von +0.15 gegenüber globalen Memories, ohne globale Memories auszuschließen.
### Semantische Suche – vollständig lokal
Der entscheidende Unterschied zu Cloud-Memory-Lösungen: Embeddings werden **via Ollama lokal generiert**. Kein Datentransfer an externe Services. Die empfohlenen Embedding-Modelle sind `nomic-embed-text-v2-moe` (Standard) und `qwen3-embedding:0.6b` (für längere Notizen).
Die Embeddings selbst werden in `.gitignore` geführt – sie sind ableitbare Daten, die bei jedem `sync` auf der jeweiligen Maschine neu berechnet werden. Merge-Konflikte in Float-Arrays sind damit strukturell ausgeschlossen.
## Das MCP-Tool-Set im Überblick
Mnemonic stellt über das MCP-Protokoll einen vollständigen Satz an Tools bereit:
**Capture & Retrieve:**
`remember` → `recall` → `update` → `forget` → `list` → `recent_memories`
**Knowledge Graph:**
`relate` → `unrelate` → `memory_graph` → `consolidate`
**Project Context:**
`detect_project` → `project_memory_summary` → `move_memory` → `set_project_memory_policy`
**Vault Operations:**
`sync` → `list_migrations` → `execute_migration`
Der `recall`-Befehl nutzt eine Projektion des Notizinhalts (Titel, Lifecycle, Tags, Zusammenfassung, Überschriften) vor dem Embedding – das reduziert Rauschen und erhöht die Suchqualität deutlich gegenüber rohem Volltext-Embedding.
## Integration in bestehende KI-Stacks
Die Integration in den MCP-Config-Block ist in wenigen Minuten erledigt – für Claude Code, Cursor, VS Code und OpenCode:
```json
{
  "mcpServers": {
    "mnemonic": {
      "command": "npx",
      "args": ["@danielmarbach/mnemonic-mcp"],
      "env": {
        "VAULT_PATH": "/Users/you/mnemonic-vault"
      }
    }
  }
}
```
Kein Daemon, kein dauerhaft laufender Service: Der MCP-Server startet on-demand über stdio und beendet sich mit der Session. Zero Hintergrundprozesse im Idle-Zustand.
### Was Mnemonic von anderen Memory-Ansätzen unterscheidet
| Kriterium | Mnemonic | Cloud-Memory (mem0 etc.) | Flat-File MEMORY.md |
|---|---|---|---|
| Datensouveränität | ✅ Vollständig lokal | ❌ Cloud-abhängig | ✅ Lokal |
| Semantische Suche | ✅ Via Ollama | ✅ | ❌ Nur Keyword |
| Team-Sharing | ✅ Via Git | ✅ Via Cloud | Manuell |
| Versionshistorie | ✅ Git-native | Vendor-abhängig | ❌ |
| Offline-fähig | ✅ | ❌ | ✅ |
## Zeitersparnis und ROI im Automatisierungs-Alltag
Konkret spart das Mnemonic-Modell pro Entwicklungssession im Schnitt 5–15 Minuten Kontext-Reproduktion – je nach Projektkomplexität. Bei Teams mit 3+ Entwicklern, die täglich KI-Assistenten einsetzen, summiert sich das auf erhebliche Produktivitätsgewinne.
Besonders relevant sind drei Szenarien:
1. **Onboarding**: Neue Teammitglieder erhalten Architekturkontext und Entscheidungshistorie automatisch via `project_memory_summary`
2. **Bug-Context**: Vergangene Bugfix-Entscheidungen sind via `recall` sofort abrufbar – keine langen Commit-Message-Suchen
3. **Konsistenz**: Einmal gemachte Technologieentscheidungen bleiben im Memory und verhindern, dass der KI-Assistent inkonsistente Alternativen vorschlägt
## Hinweis: Early Stage & Projektdokumentation
Das Projekt befindet sich explizit in einem frühen Stadium (aktuell Version 0.13.1). Das Storage-Format stabilisiert sich noch, Formatmigrationen werden automatisch erkannt und angeboten. Für produktive Teams empfiehlt sich daher, das Changelog im Blick zu behalten und vor Updates stets `mnemonic migrate --dry-run` auszuführen.
**Wichtig**: Die offizielle Dokumentation ist über das NPM-Package verfügbar. GitHub-Repository und Projektseite befanden sich zum Zeitpunkt der Artikelerstellung möglicherweise noch im Aufbau oder unter einem anderen Namespace.
## Praktische Nächste Schritte
1. **Ollama einrichten** und Embedding-Modell laden: `ollama pull nomic-embed-text-v2-moe`
2. **Mnemonic installieren**: `npm install @danielmarbach/mnemonic-mcp` und in den MCP-Config-Block des bevorzugten KI-Tools eintragen
3. **Bestehende Claude-Memories migrieren**: `mnemonic import-claude-memory --dry-run` zeigt, was aus Claude Code's auto-memory importiert werden kann
4. **Team-Onboarding**: `.mnemonic/`-Verzeichnis im Repo commiten und Kolleg:innen die Nutzung von `project_memory_summary` zum Session-Start empfehlen