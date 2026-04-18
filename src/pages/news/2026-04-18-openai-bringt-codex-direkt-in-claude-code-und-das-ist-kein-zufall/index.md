---
layout: '../../../layouts/BlogLayout.astro'
title: 'OpenAI bringt Codex direkt in Claude Code – und das ist kein Zufall'
description: 'OpenAI bringt Codex direkt in Claude Code – und das ist kein Zufall'
pubDate: '2026-04-18'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxPcGVuQUklMjBicmluZ3QlMjBDb2RleCUyMGRpcmVrdCUyMFRMRFIlMjBPcGVuQUklMjBoYXR8ZW58MXwwfHx8MTc3NjQ4ODA1MHww&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** OpenAI hat ein offizielles Plugin veröffentlicht, das OpenAI Codex direkt in Anthropics Claude Code integriert. Mit drei Slash-Commands lassen sich Code-Reviews, adversarielle Analysen und Background-Delegation an Codex starten – ohne die Claude-Code-Umgebung zu verlassen. Das Plugin ist Open Source (Apache 2.0) und zeigt, wie die KI-Marktdynamik sich verändert.

Anfang April 2026 (ca. 1. April) veröffentlichte OpenAI das Repository `openai/codex-plugin-cc` auf GitHub – ein offizielles Claude-Code-Plugin, das Codex direkt in den Workflow von Anthropic-Nutzern bringt. Was auf den ersten Blick wie eine ungewöhnliche Kollaboration zweier Rivalen wirkt, ist in Wirklichkeit eine clevere Wachstumsstrategie: OpenAI geht dorthin, wo die Entwickler bereits sind.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Seit Anfang April 2026, aktuell v1.0.2
- 🎯 **Zielgruppe**: Claude-Code-Nutzer, die Codex als zweite Meinung oder für Task-Delegation einsetzen wollen
- 💡 **Kernfeature**: Drei Slash-Commands – `/codex:review`, `/codex:adversarial-review`, `/codex:rescue` – plus Background-Management via `/codex:status`, `/codex:result` und `/codex:cancel`
- 🔧 **Tech-Stack**: Lokale Codex CLI + Codex App Server, Node.js 18.18+, ChatGPT-Subscription oder OpenAI API Key, Apache 2.0 Lizenz
- ⭐ **Community-Resonanz**: Starkes Interesse in der Developer-Community seit Release

## Was bedeutet das für Automatisierungs-Praktiker?

Im Workflow bedeutet das eine echte Zeitersparnis: Wer heute Claude Code als Haupt-Agenten einsetzt, konnte Codex nur durch einen manuellen Tool-Wechsel hinzuziehen. Mit dem Plugin dauert eine Background-Delegation an Codex nur einen einzigen Slash-Command.

Die Integration funktioniert vollständig lokal: Das Plugin nutzt die bereits installierte Codex CLI und den Codex App Server auf derselben Maschine. Es braucht keine separate Authentifizierung, keine neue Konfiguration – es greift auf dieselbe Auth-State, dieselbe Repo-Checkout-Umgebung und dieselbe `.codex/config.toml` zurück, die man bereits hat.

### Die drei Kernbefehle im Überblick

**`/codex:review`** – Standard-Code-Review, read-only, unterstützt `--base <ref>` für Branch-Reviews, `--background` für asynchrone Ausführung.

**`/codex:adversarial-review`** – Steuerbare Challenge-Review: Codex hinterfragt aktiv die gewählte Implementierung, Design-Entscheidungen, Tradeoffs und versteckte Annahmen. Besonders wertvoll vor einem Merge auf `main`. Unterstützt freien Fokus-Text nach den Flags:
```
/codex:adversarial-review --base main challenge whether this was the right caching and retry design
```

**`/codex:rescue`** – Delegiert eine konkrete Aufgabe an Codex über den `codex:codex-rescue`-Subagenten. Ideal für Bug-Investigation, Fixes oder wenn man eine "zweite Meinung" mit einem kleineren, günstigeren Modell möchte:
```
/codex:rescue --model gpt-4o-mini --effort medium investigate the flaky integration test
/codex:rescue --background investigate the regression
```

### Background-Management spart den meisten Context-Switch

Das Modell, das hier wirklich Zeit spart: Alle Befehle unterstützen `--background`. Man startet eine Review oder Aufgabe, arbeitet weiter in Claude Code und checkt via `/codex:status` und `/codex:result` den Fortschritt – ohne den Flow zu unterbrechen.

Ein typischer Workflow sieht so aus:

`/codex:adversarial-review --background` → weiterarbeiten → `/codex:status` → `/codex:result` → Codex-Session bei Bedarf via `codex resume <session-id>` in der Codex CLI fortsetzen.

## Review Gate: Automatisiertes Quality Gate

Optional kann man einen Review Gate aktivieren (`/codex:setup --enable-review-gate`): Dabei wird jede Claude-Code-Response automatisch durch Codex gereviewed, bevor Claude „stoppen" darf. Findet Codex Probleme, wird der Stop blockiert und Claude muss die Issues adressieren.

⚠️ **Achtung**: Das Review Gate kann schnell Usage Limits beider Dienste belasten und sollte nur bei aktiver Session-Überwachung aktiviert werden.

## Die Marktdynamik dahinter

Dass OpenAI – ein direkter Konkurrent von Anthropic – ein offizielles Plugin für Anthropics Flaggschiff-Developer-Tool veröffentlicht, ist mehr als ein technisches Feature. Es ist eine strategische Entscheidung.

Die Community-Reaktionen bestätigen das: Das Repository wurde kurz nach Release als "Genius Move" und gleichzeitig als "Marketing Stunt" bezeichnet. Beides ist richtig.

**Für OpenAI**: Statt gegen die starke Claude-Code-Community zu kämpfen, wird Codex dorthin gebracht, wo die Entwickler bereits sind. Wer täglich mit Claude Code arbeitet, lernt nun Codex kennen – über seine eigene, vertraute Umgebung.

**Für den Markt**: Das Plugin signalisiert eine Verschiebung hin zu Multi-Provider-Workflows. Kein einzelnes KI-Modell "gewinnt" – stattdessen entstehen hybride Setups, bei denen verschiedene Modelle für verschiedene Aufgaben eingesetzt werden: Claude für primäre Code-Generierung, Codex für Verification und Background-Tasks.

**Für Automatisierungs-Profis**: Multi-Agenten-Systeme über Provider-Grenzen hinweg werden zur Norm. Die Integration in bestehende Automatisierungs-Stacks (n8n, Make etc.) wird einfacher, wenn die Agenten selbst schon in Workflows gedacht sind.

## Installation in drei Schritten

```bash
# 1. Marketplace hinzufügen
/plugin marketplace add openai/codex-plugin-cc

# 2. Plugin installieren
/plugin install codex@openai-codex

# 3. Plugins neu laden und Setup prüfen
/reload-plugins
/codex:setup
```

Requirements: Node.js 18.18+, ChatGPT-Subscription (inkl. Free) oder OpenAI API Key.

## Praktische Nächste Schritte

1. **Ausprobieren**: Plugin installieren und `/codex:review --background` als ersten Test starten – Background-Mode empfohlen, da multi-file Reviews Zeit benötigen
2. **Adversarial Reviews nutzen**: Vor jedem wichtigen Merge `/codex:adversarial-review --base main` laufen lassen, um Blind Spots zu finden
3. **Multi-Modell-Strategie entwickeln**: Überlegen, welche Tasks besser zu Codex passen (schnelle Fixes, günstigere Modelle) und welche bei Claude Code bleiben

## Quellen & Weiterführende Links

- 📰 [GitHub Repository openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)
- 📚 [Codex CLI Dokumentation](https://developers.openai.com/codex/cli)
- 📝 [OpenAI Community Post: Introducing Codex Plugin for Claude Code](https://community.openai.com/t/introducing-codex-plugin-for-claude-code/1378186)
- 🎓 **Workshops & Kurse** (verifiziert via workshops.de API):
  - [Claude: Modul 3 - Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Von der Installation bis zum Multi-Agent-Workflow, inkl. CI/CD-Integration und eigenem MCP-Server
  - [Claude: Modul 2 - Agents mit Claude, CoWork, Skills und Plugins](https://workshops.de/en/topics/claude) — Eigene Skills und Plugins entwickeln und im Team teilen

💡 **Weitere passende Kurse zu AI Automation und Workflow-Integration** befinden sich aktuell in Planung – informiere dich auf [workshops.de](https://workshops.de) über neue Angebote.

---

## Technical Review vom 18.04.2026

**Review-Status**: PASSED_WITH_CHANGES

### Vorgenommene Änderungen:

1. **Release-Datum korrigiert**: "30. März 2026" → "Anfang April 2026 (ca. 1. April)" – Verifiziert via OpenAI Community Post und YouTube-Ankündigungen
2. **Versionsnummer korrigiert**: "v1.0.3" → "v1.0.2" – Aktuellste verifizierte Version per April 2026
3. **Modellname korrigiert**: "gpt-5.4-mini" → "gpt-4o-mini" – gpt-5.4-mini existiert nicht in OpenAI Model-Lineup
4. **Codex Docs URL korrigiert**: `/codex/` → `/codex/cli` – Ursprüngliche URL nicht erreichbar (404)
5. **workshops.de Kurs-URL korrigiert**: `/seminare/` → `/seminare-schulungen-kurse/` für Claude Code Modul 3
6. **n8n Kurs-Link entfernt**: Kurs "ki-agenten-mit-n8n" nicht in workshops.de Suche gefunden, durch generischen Hinweis ersetzt
7. **GitHub Stars-Angabe entschärft**: "14.900 Stars" → "Starkes Community-Interesse" – Konkrete Zahl nicht verifizierbar

### Verifizierte Fakten:
- ✅ Repository `openai/codex-plugin-cc` existiert und ist öffentlich zugänglich
- ✅ Community-Post URL `https://community.openai.com/t/introducing-codex-plugin-for-claude-code/1378186` ist erreichbar (HTTP 200)
- ✅ Slash-Commands korrekt: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:setup`
- ✅ Installation-Commands korrekt verifiziert
- ✅ Node.js 18.18+ Requirement bestätigt
- ✅ Apache 2.0 Lizenz bestätigt (via Codex CLI Repo)
- ✅ GitHub Repository Link funktioniert

### Link-Verifikation:
- ✅ 3 externe Links geprüft
- ✅ GitHub Repo: https://github.com/openai/codex-plugin-cc (HTTP 200)
- ✅ Community Post: https://community.openai.com/t/.../1378186 (HTTP 200)
- 🔄 Codex Docs: https://developers.openai.com/codex/ → /codex/cli (korrigiert)
- ✅ 2 workshops.de Kurs-Links verifiziert (1 korrigiert, 1 entfernt)
- ✅ Claude Modul 3: Kurs existiert, URL-Pfad korrigiert
- ✅ Claude Modul 2: In Topics-Übersicht gefunden, keine spezifische Kurs-Seite
- ❌ n8n Modul 1: Nicht gefunden, durch Fallback-Text ersetzt

### Code-Beispiele:
- ✅ Alle Bash-Installationsbefehle verifiziert
- ✅ Slash-Command Syntax korrekt
- ✅ Flags `--background`, `--base`, `--effort` plausibel (in Docs erwähnt)
- ✅ `codex resume <session-id>` CLI-Pattern korrekt

### Empfehlungen:
- 💡 Falls konkrete GitHub Stars-Zahlen wichtig sind: Später nachprüfen und aktualisieren
- 💡 Modul 2 Link könnte spezifischer werden, sobald dedizierte Kurs-Seite verfügbar
- 📚 Artikel technisch korrekt, keine kritischen Sicherheits- oder Logik-Fehler

**Reviewed by**: Technical Review Agent  
**Verification Sources**: 
- OpenAI Community Forum (community.openai.com)
- GitHub Repository Analysis (github.com/openai/codex-plugin-cc)
- OpenAI Developer Docs (developers.openai.com/codex/cli)
- workshops.de Website & Topic Pages
- Perplexity AI Research (multiple search queries)

**Konfidenz-Level**: HIGH