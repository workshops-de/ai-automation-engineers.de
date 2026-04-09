---
layout: '../../../layouts/BlogLayout.astro'
title: 'Anthropic Managed Agents: Warum Brain/Hands-Decoupling deine Agent-Architektur revolutioniert'
description: 'Anthropic Managed Agents: Warum Brain/Hands-Decoupling deine Agent-Architektur revolutioniert'
pubDate: '2026-04-09'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1515183729608-37b5a92f9f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MTM4MjZ8MHwxfHNlYXJjaHwxfHxBbnRocm9waWMlMjBNYW5hZ2VkJTIwQWdlbnRzJTIwV2FydW0lMjBUTERSJTIwQW50aHJvcGljJTIwaGF0fGVufDF8MHx8fDE3NzU3MTA1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
---

**TL;DR:** Anthropic hat mit Managed Agents einen gehosteten Service veröffentlicht, der langläufige AI-Agents durch ein radikal neues Architekturmuster betreibt – der "Brain" (Claude + Harness) wird vollständig von den "Hands" (Sandboxes + Tools) und dem "Session Log" entkoppelt. Das Ergebnis: p50 TTFT –60%, p95 TTFT –90%, horizontale Skalierbarkeit ohne Zustandsverlust und Security by Design statt Security by Policy.

Wer heute Production-Grade AI-Automation baut, steht früher oder später vor denselben Problemen: Agents, die beim Container-Absturz den gesamten Sitzungskontext verlieren. Credentials, die im selben Execution-Environment liegen wie untrusted Code. Container, die stets provisioniert werden müssen – auch wenn die Session sie nie braucht. Anthropics Engineering-Team hat diese Probleme systematisch gelöst und die Architektur öffentlich dokumentiert. Was dahintersteckt und was das für deine Workflows bedeutet.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Managed Agents ist als gehosteter Service auf der Claude Platform verfügbar – Zugang über die [offizielle Dokumentation](https://platform.claude.com/docs/en/managed-agents/overview)
- 🎯 **Zielgruppe**: Teams, die langläufige, production-kritische AI-Agents betreiben oder bauen
- 💡 **Kernkonzept**: Drei entkoppelte Schichten – Brain (Reasoning), Hands (Execution), Session (Durable Context)
- 🔧 **Tech-Stack**: Claude API, MCP, OAuth-Vault, stateless Harness, externe Session-Logs

## Was bedeutet das für Automation Engineers?

Das Brain/Hands-Muster löst ein fundamentales Problem klassischer Agent-Architekturen: Wenn Reasoning, Execution und State alle im selben Container leben, wird dieser Container zum **Pet** – einem zerbrechlichen Einzelsystem, das man nicht verlieren darf und nicht einfach ersetzen kann.

Anthropic hat die drei Komponenten in eigenständige Interfaces aufgeteilt:

**Reasoning Layer (Claude + Harness)** = Stateless, horizontal skalierbar
→ Der Harness routet Tool Calls an die Execution Layer und verwaltet den Agentic Loop

**Execution Layer (Sandboxes)** = Container, Custom Tools, MCP-Server
→ werden nur bei Bedarf provisioniert, laufen isoliert und können jederzeit ersetzt werden

**Session (Append-only Event Log)** = Durables Persistenz-System außerhalb der anderen Layer
→ Der Harness kann jederzeit Events aus dem Log abrufen und Sessions nahtlos fortsetzen

Das Ergebnis: Stirbt ein Container, bekommt der Harness einen Tool-Call-Fehler zurück und kann Claude entscheiden lassen, ob und wie neu provisioniert wird. Stirbt der Harness selbst, startet er neu, liest den Session Log und setzt nahtlos fort. Kein State-Verlust, kein "Nursing" defekter Container mehr.

## Technische Details

### Session als externer Kontextspeicher

Long-horizon Tasks überschreiten regelmäßig das Context Window von Claude. Klassische Lösungen – Komprimierung, selektives Trimming – treffen irreversible Entscheidungen. Die Managed Agents Session ist eine andere Philosophie:

Der Session Log ist **durable und außerhalb des Context Windows**. Der Harness kann selektive Slices des Event Logs abfragen: die letzten N Events, Events vor einem bestimmten Zeitpunkt, oder gezielt Events vor einer kritischen Action. Diese Slices werden im Harness transformiert – Context Engineering, Prompt Cache Optimierung – bevor sie in Claudes Context Window geladen werden.

Das trennt sauber: Was gespeichert wird (Session, garantiert durable) von dem, wie es verarbeitet wird (Harness, austauschbar). Zukünftige Modelle können andere Context Engineering Strategien erfordern – der Session Layer muss dafür nicht angefasst werden.

### Security-Architektur: Credential-Isolation

Ein zentrales Design-Prinzip von Managed Agents ist die strukturelle Trennung von Credentials und Execution Environment:

**Herkömmliche Ansätze:** Credentials leben im selben Container wie der Code, den Claude generiert. Ein erfolgreicher Prompt-Injection-Angriff könnte Tokens aus der Umgebung auslesen.

**Managed Agents Isolation:**
- Git-Tokens: Werden beim Sandbox-Init einmalig zum Klonen des Repos genutzt und in das lokale Git-Remote eingetragen. `push` und `pull` funktionieren ohne dass der Agent den Token jemals sieht.
- MCP/Custom Tools: OAuth-Tokens werden außerhalb der Sandbox gespeichert und verwaltet. MCP-Tool-Aufrufe laufen über eine geschützte Schicht, die Credentials niemals an den Sandbox oder direkt an Claude weitergibt.

Der strukturelle Fix ist entscheidend: Tokens sind architektonisch nicht erreichbar vom Sandbox, in dem Claudes Code läuft – nicht weil Scoping korrekt konfiguriert ist, sondern weil die Schichten es unmöglich machen.

### Lazy Provisioning: Performance-Impact

Solange Reasoning und Execution im selben Container lebten, zahlte **jede Session den vollen Container-Setup-Preis upfront** – Repo klonen, Prozesse starten, Events fetchen – auch wenn die Session den Sandbox vielleicht nie brauchte. Dieses tote Warten schlägt direkt auf den TTFT (Time to First Token) durch, die Latenz, die User am stärksten wahrnehmen.

Nach dem Decoupling: Container werden erst dann via Tool Call provisioniert, wenn sie gebraucht werden. Inference startet, sobald der Orchestration Layer die pending Events aus dem Session Log gelesen hat.

**Performance-Verbesserungen:**
Anthropic berichtet von signifikanten Latenz-Verbesserungen durch das Decoupling, da Container nur bei Bedarf provisioniert werden. Konkrete Metriken variieren je nach Workload – Sessions ohne Sandbox-Nutzung starten deutlich schneller, da keine Container-Initialisierung erforderlich ist.

Skalierung auf viele Sessions bedeutet jetzt schlicht: viele stateless Harnesses starten. Sandboxes werden nur provisioniert, wenn tatsächlich Code ausgeführt werden muss.

## Vergleich zu bestehenden Agent-Frameworks

Für Automation Engineers, die bereits mit anderen Tools arbeiten:

**n8n AI Agents**: Node-basierte Architektur, bei der Logik und Execution oft im selben Workflow-Context leben. Kein nativer Vault-Mechanismus, Credentials in Node-Configs. Stark für einfachere Multi-Step-Automation, aber ohne strukturelle Separation für long-horizon Tasks.

**LangGraph**: Stateful Graphs mit Nodes für Reasoning und Tools. Context Management und Security obliegen dem Entwickler. Kein architektonisches Äquivalent zum Session-Log als externem durable Context Store.

**AutoGen**: Konversationelle Multi-Agent-Architektur, Agents mit gekoppeltem State. Skalierung erfordert eigene Orchestrierung. Stärke liegt in Group-Chat-ähnlicher Koordination, nicht in Infrastructure-Entkopplung.

Anthropics Ansatz ist nicht "besser" in allen Situationen – er ist spezifisch optimiert für **production-ready, langläufige, security-kritische Workloads**. Für einfache Automations ist n8n oder LangGraph weiterhin pragmatischer.

## Praktische Nächste Schritte

1. **Architektur-Review**: Prüfe deine bestehenden Agent-Pipelines auf "Pet"-Container – gibt es Single Points of Failure, bei denen ein Container-Absturz den gesamten Sitzungskontext löscht?

2. **MCP-Security-Audit**: Liegen OAuth-Tokens oder API-Keys im selben Environment wie untrusted Code? Die Credential-Isolation lässt sich auch ohne Managed Agents als Design-Prinzip übernehmen.

3. **Anthropic Managed Agents Docs erkunden**: Die [offizielle Dokumentation](https://platform.claude.com/docs/en/managed-agents/overview) beschreibt die Session-, Harness- und Sandbox-Interfaces konkret. Die API ermöglicht session-basierte Interaktion und Event-Streaming.

4. **Context Engineering überdenken**: Statt Context-Trimming früh im Stack zu machen – könnte ein externer Session Log das Problem eleganter lösen?

## Quellen & Weiterführende Links

- 📰 [Anthropic Engineering – Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)
- 📚 [Offizielle Managed Agents Docs](https://platform.claude.com/docs/en/managed-agents/overview)
- 🔗 [Effective Context Engineering for AI Agents – Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- 🎓 **Workshops & Kurse** (via API verifiziert):
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/seminare-schulungen-kurse/n8n-multi-agent-systeme-mcp-server) — Memory-Systeme, Multi-Agent-Architekturen & MCP-Server Development. Direkt relevant für die im Artikel beschriebenen Patterns.
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/seminare-schulungen-kurse/ki-agenten-mit-n8n) — Grundlagen für komplexe Workflows mit autonomen AI-Agents.
  - [Agentic Software Engineering with Claude Code](https://workshops.de/seminare-schulungen-kurse/software-engineering-claude-code) — Multi-Agent-Workflows und CI/CD-Integration inklusive eigenem MCP-Server.

---