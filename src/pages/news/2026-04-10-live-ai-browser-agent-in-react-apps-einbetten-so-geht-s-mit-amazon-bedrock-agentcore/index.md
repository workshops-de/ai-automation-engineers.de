---
layout: '../../../layouts/BlogLayout.astro'
title: 'Live AI Browser Agent in React-Apps einbetten – So geht''s mit Amazon Bedrock AgentCore'
description: 'Live AI Browser Agent in React-Apps einbetten – So geht''s mit Amazon Bedrock AgentCore'
pubDate: '2026-04-10'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&h=600&fit=crop'
---

**TL;DR:** Mit dem `BrowserLiveView`-Komponenten aus dem Bedrock AgentCore TypeScript SDK lässt sich ein Live-Videostream einer KI-Browser-Session mit nur 3 Zeilen JSX in jede React-App einbetten. Nutzer sehen in Echtzeit, was der Agent tut – kein eigener Streaming-Stack nötig.

Amazon hat am 9. April 2026 ein Tutorial veröffentlicht, das zeigt, wie sich ein vollständig autonomer KI-Browser-Agent live in React-Anwendungen einbetten lässt. Das spart nicht nur erheblichen Entwicklungsaufwand bei agentengesteuerten Workflows – es löst auch ein kritisches Trust-Problem: Nutzer, die einem KI-Agenten Tasks delegieren, können dessen Aktionen jetzt live beobachten, ohne die eigene Anwendung zu verlassen.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Jetzt verfügbar über das `bedrock-agentcore` npm-Paket, unterstützt in 14+ AWS-Regionen
- 🎯 **Zielgruppe**: Automatisierungs-Engineers, die agentengesteuerte Workflows mit menschlicher Supervision bauen
- 💡 **Kernfeature**: `BrowserLiveView` React-Komponente – DCV-Protokoll überträgt den Browser-Stream direkt von AWS zum Client-Browser, ohne App-Server-Durchleitung
- 🔧 **Tech-Stack**: React + Vite, Node.js (Server), Amazon Bedrock Converse API, Playwright CDP, Amazon DCV, AWS SigV4

## Was bedeutet das für Automatisierungs-Engineers?

Im Workflow bedeutet das eine echte Verschiebung: Bislang waren autonome Browser-Agenten eine Blackbox – man startete einen Task und wartete auf das Ergebnis. Mit `BrowserLiveView` wird der Agent zur transparenten Einheit im eigenen UI.

Das Streaming-Modell ist dabei besonders clever gelöst: Der DCV-Videostream fließt **direkt** von Amazon Bedrock AgentCore zum Browser des Users. Der eigene App-Server generiert nur die SigV4-Presigned-URL und führt den Agenten aus – er ist **nicht** Teil des Video-Pfads. Das minimiert Latenz und reduziert Infrastrukturkosten erheblich.

**Konkrete Zeitersparnis:** Wer bisher einen eigenen Streaming-Stack für agentengesteuerte Browser-Sessions aufgebaut hat (WebRTC, eigene WebSocket-Infrastruktur, Frame-Encoding), spart mit diesem Ansatz Wochen an Entwicklungsaufwand. Die gesamte Streaming-Infrastruktur – WebSocket-Verbindung, DCV-Protokoll-Aushandlung, Video-Stream-Dekodierung und Frame-Rendering – übernimmt die Komponente automatisch.

### Die 3-Schritte-Architektur im Workflow

```
User-Browser (React App mit BrowserLiveView)
    ↕ WebSocket – DCV Stream (direkt von AWS, ohne App-Server)
Amazon Bedrock AgentCore Browser (Cloud-Browsersession)
    ↕ Playwright CDP
App-Server (AI Agent, Bedrock Converse API)
    ↕ REST/Polling
User-Browser
```

**Schritt 1 – Session starten & Live View URL generieren (Server-Side):**
```javascript
import { Browser } from 'bedrock-agentcore/browser'

const browser = new Browser({ region: 'us-west-2' })
await browser.startSession({ viewport: { width: 1920, height: 1080 } })
const signedUrl = await browser.generateLiveViewUrl()
// signedUrl via API an Frontend übergeben
```

**Schritt 2 – Live-View in React rendern (Client-Side):**
```jsx
import { BrowserLiveView } from 'bedrock-agentcore/browser/live-view'

<BrowserLiveView
  signedUrl={presignedUrl}
  remoteWidth={1920}
  remoteHeight={1080}
/>
```

**Schritt 3 – AI-Agent den Browser steuern lassen (Server-Side):**
Der Agent nutzt die Amazon Bedrock Converse API (z.B. Anthropic Claude oder Amazon Nova) und ruft Browser-Tools auf (`navigate`, `click`, `type`, `getText`, `getHtml`, `pressKey`). Jeder Tool-Call ist sofort im Live-View sichtbar.

## Praktischer Impact im Automatisierungs-Stack

### Supervision & Human-in-the-Loop

Für regulierte Workflows – Kundenkonto-Management, sensible Dateneingaben, Compliance-kritische Prozesse – ist Live-View ein entscheidender Enabler. Supervisoren können den Agenten in Echtzeit beobachten und bei Bedarf eingreifen, ohne die Anwendung zu wechseln.

### Integration in bestehende Automation-Stacks

Obwohl keine nativen Connectoren für n8n, Make oder Zapier existieren, lässt sich AgentCore über Standard-HTTP-Nodes in bestehende Automatisierungs-Stacks integrieren:

- **n8n / Make / Zapier**: HTTP-Request-Node triggert Session-Start via API Gateway/Lambda → Polling auf Session-Status → `signedUrl` wird an Frontend-Webhook geliefert → Live-View-Komponente rendert den Stream
- **Vercel AI SDK**: Das TypeScript-SDK enthält eine native `BrowserTools`-Integration für framework-nativen Tool-Use
- **LangChain / LangGraph / CrewAI**: AgentCore unterstützt beliebige Agent-Frameworks zum Steuern des Browsers

### Audit Trail und Compliance

Session-Recordings können nach Amazon S3 gespeichert werden – kombiniert mit dem Live-View ergibt sich sowohl Real-Time-Observation als auch Post-Hoc-Review. Für Audit-Anforderungen ein erheblicher Vorteil gegenüber reiner Text-Logging.

### Mehrere Sessions gleichzeitig

`BrowserLiveView` unterstützt mehrere Instanzen auf derselben Seite, jede mit einer eigenen Browser-Session. Das öffnet Türen für Monitoring-Dashboards, die parallele Agenten-Workflows überwachen.

## Praktische Nächste Schritte

1. **Sample-App klonen und ausprobieren**: Die vollständige Demo-Anwendung liegt auf GitHub unter `awslabs/bedrock-agentcore-samples-typescript/use-cases/browser-live-view-agent` – mit React-Dashboard, Activity-Log und Fastify-Server
2. **AWS-Credentials prüfen**: Benötigt werden Bedrock AgentCore Browser-Permissions (für Steps 1+2) und optional Bedrock Converse API Permissions (für Step 3 mit dem Sample-Agenten). Temporäre Credentials via AWS IAM Identity Center oder STS verwenden
3. **Bundler-Konfiguration beachten**: Vite benötigt drei Anpassungen – `resolve.alias` für DCV/DCV-UI, `resolve.dedupe` für React, `viteStaticCopy` für DCV Runtime Files (Workers, WASM Decoder). Die fertige `vite.config.ts` liegt in der Sample-App
4. **Modell frei wählen**: Das Sample nutzt Anthropic Claude, aber `BrowserLiveView` ist modell-agnostisch. Über `BEDROCK_MODEL_ID` lassen sich Amazon Nova oder andere Bedrock-Modelle mit Tool-Use-Unterstützung einsetzen
5. **Für Produktion hardenen**: API-Endpoint-Auth, HTTPS, CORS-Origin-Restriktionen, Rate Limiting – die Sample-App ist für lokale Demo-Zwecke ausgelegt

## Quellen & Weiterführende Links

- 📰 [Original AWS Blog Post](https://aws.amazon.com/blogs/machine-learning/embed-a-live-ai-browser-agent-in-your-react-app-with-amazon-bedrock-agentcore/)
- 📚 [Amazon Bedrock AgentCore Browser Dokumentation](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-tool.html)
- 💻 [Bedrock AgentCore TypeScript SDK (GitHub)](https://github.com/aws/bedrock-agentcore-sdk-typescript)
- 🚀 [Sample Application (GitHub)](https://github.com/awslabs/bedrock-agentcore-samples-typescript/tree/main/use-cases/browser-live-view-agent)
- 📖 [Live View Developer Guide](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/browser-dcv-integration.html)
- 🎓 **Workshops & Kurse** (via API verifiziert):
  - [n8n: Modul 1 – Automatisierung mit KI-Agenten](https://workshops.de/kurse/ki-agenten-mit-n8n) — Agentic Workflows mit n8n, direkt anwendbar für AgentCore-Integration
  - [n8n: Modul 2 – Multi-Agent-Systeme & MCPs](https://workshops.de/kurse/n8n-multi-agent-systeme-mcp-server) — Memory-Systeme, Multi-Agent-Architekturen & MCP-Server für Production-Ready AI-Automation
  - [KI: Modul 2 – Evals, Multi-Agentic-Workflows](https://workshops.de/kurse/ki-dev-modul-2) — Moderne AI-Tools und Multi-Agent-Workflows für Entwickler