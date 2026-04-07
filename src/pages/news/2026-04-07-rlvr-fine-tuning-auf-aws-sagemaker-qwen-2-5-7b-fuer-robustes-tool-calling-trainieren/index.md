---
layout: '../../../layouts/BlogLayout.astro'
title: 'RLVR Fine-Tuning auf AWS SageMaker: Qwen 2.5 7B für robustes Tool-Calling trainieren'
description: 'RLVR Fine-Tuning auf AWS SageMaker: Qwen 2.5 7B für robustes Tool-Calling trainieren'
pubDate: '2026-04-07'
author: 'Robin Böhm'
tags: ['AI', 'Automation', 'Technology']
category: 'Technology'
readTime: '5 min read'
image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---

**TL;DR:** AWS zeigt in einem neuen Praxisbeitrag, wie sich das Qwen 2.5 7B Instruct-Modell mit RLVR und serverlosem Model Customization in Amazon SageMaker AI auf präzises Tool-Calling trainieren lässt — ohne GPU-Management, mit 57 % höherem Tool-Call-Reward gegenüber dem Basismodell.

Agentic AI-Systeme stehen und fallen mit einer einzigen Fähigkeit: dem sauberen Tool-Calling. Wer schon einmal erlebt hat, wie ein Agent die falsche API aufruft, Parameter halluziniert oder im falschen Moment fragt statt handelt, weiß, warum dieses Problem für Produktionseinsätze kritisch ist. AWS hat jetzt in einem detaillierten ML-Blog-Post dokumentiert, wie sich Qwen 2.5 7B Instruct mit **Reinforcement Learning with Verifiable Rewards (RLVR)** gezielt auf robustes Tool-Calling feinabstimmen lässt — vollständig serverlos, über die Amazon SageMaker AI UI, und mit messbaren Ergebnissen auf einem Holdout-Set mit ungesehenen Tools.

## Die wichtigsten Punkte

- 📅 **Verfügbarkeit**: Amazon SageMaker AI Serverless Model Customization ist jetzt verfügbar; der beschriebene Workflow ist reproduzierbar
- 🎯 **Zielgruppe**: Automation Engineers, AI-Entwickler und Teams, die LLM-gestützte Agenten in Produktion bringen wollen
- 💡 **Kernfeature**: RLVR mit Group Relative Policy Optimization (GRPO) für verifizierbares Tool-Calling-Training — ohne Infrastrukturmanagement
- 🔧 **Tech-Stack**: Qwen 2.5 7B Instruct, Amazon SageMaker AI, RLVR/GRPO, MLflow, Amazon S3, Deployment auf SageMaker-Endpoint oder Amazon Bedrock

## Was bedeutet das für Automation Engineers?

Wer Automatisierungs-Workflows mit KI-Agenten baut — ob mit n8n, Make, Zapier oder eigenen Pipelines — kennt das Problem: Das Basismodell ruft manchmal die falsche Funktion auf, übergibt fehlerhafte Parameter oder halluziniert Tool-Schemas. Jede falsche API-Anfrage bedeutet im Workflow einen fehlgeschlagenen Step, potenziell einen Datenfehler oder manuelle Nacharbeit.

Dieser AWS-Ansatz löst genau das: **Das Modell lernt nicht nur das Format eines Tool-Calls, sondern auch wann es rufen, wann es fragen und wann es ablehnen soll.** Das spart konkret Zeit bei jedem fehlerhaften Agenten-Step und macht Workflows stabiler.

Im Workflow bedeutet das:
- Weniger „retry"-Schleifen und Error-Handler in n8n oder Make
- Robustere Multi-Step-Pipelines, die nicht an falschen Tool-Parametern scheitern
- Modelle, die bei unklaren Eingaben nach Klärung fragen statt ins Leere zu rufen

## Technische Details: Wie RLVR für Tool-Calling funktioniert

### Das Kernproblem mit Supervised Fine-Tuning (SFT)

SFT zeigt dem Modell Beispiele und hofft, dass es die Pattern verallgemeinert. Für Tool-Calling ist das ein Problem: Das Modell lernt Muster aus Trainingsdaten, aber entscheidet schlecht zwischen „jetzt rufen", „jetzt fragen" und „jetzt ablehnen" — besonders bei Eingaben, die es in dieser Form nicht gesehen hat.

### RLVR: Lernen durch Verifikation

RLVR funktioniert anders: Das Modell generiert für jeden Prompt **8 Kandidaten-Antworten** (Rollouts). Eine Reward Function prüft jede davon gegen eine Ground Truth und vergibt eine numerische Bewertung. Der GRPO-Algorithmus vergleicht die Scores innerhalb der Gruppe und verstärkt, was überdurchschnittlich abschneidet.

**Das Dreistufige Scoring-System** gibt GRPO ein reiches Lernsignal:
- **1.0** — Richtige Funktion + richtige Parameter
- **0.5** — Richtige Funktion, aber falsche Parameter (z. B. Array als String übergeben)
- **0.0** — Falsche Funktion oder unnötiger Tool-Call

Dieser Ansatz funktioniert für Tool-Calling besonders gut, weil **Korrektheit verifikationsfähig ist**: Entweder stimmt der Funktionsname und das Parameter-Schema, oder nicht.

### Das Dataset: Drei Agent-Verhaltensweisen

Das AWS-Team trainierte mit 1.500 synthetischen Beispielen über 5 Tool-Schemas:

| Verhalten | Anteil | Beschreibung |
|---|---|---|
| **Execute** | 60 % | Alle Parameter vorhanden → direkter Tool-Call |
| **Clarify** | 25 % | Parameter fehlen → Rückfrage |
| **Refuse** | 15 % | Out-of-scope oder schädlich → höfliche Ablehnung |

Die Trainingsdaten wurden mit **Amazon Q Developer** (Amazons AI-gestütztem Coding-Assistenten) oder ähnlichen Tools synthetisch generiert — ein praktikabler Ansatz für Teams ohne eigene Produktionslogs.

### Training in Amazon SageMaker AI: Serverlos, ohne GPU-Management

Das Setup in der SageMaker AI Studio UI:

```
Modell: Qwen 2.5 7B Instruct
Technik: RLVR (Reinforcement Learning with Verifiable Rewards)
Batch Size: 128
Learning Rate: 5e-6
Epochen: 3
Rollouts pro Prompt: 8
Trainingszeit: ~40 Minuten
```

SageMaker übernimmt GPU-Procurement, Memory-Orchestrierung zwischen Rollout- und Training-Phase sowie Checkpointing. Die Reward Function wird als Python-Funktion hochgeladen — kein eigenes RL-Stack-Management nötig.

Metriken werden automatisch in **MLflow** geloggt und sind direkt in SageMaker Studio verfügbar.

## Der Business-Impact: Was die Evaluation zeigt

Getestet wurde auf einem **Holdout-Set mit 300 Beispielen** — darunter Tools (`search_restaurants`, `get_stock_price`, `calculate_standard_deviation`), die das Modell während des Trainings nie gesehen hatte:

| Metrik | Basismodell | Fine-tuned | Verbesserung |
|---|---|---|---|
| **Tool Call Reward** | 0.35 | **0.55** | **+57 %** |
| F1 Score Quasi | 45.98 % | 64.60 % | +18.6 PP |
| Rouge1 | 49.48 % | 65.21 % | +15.7 PP |
| Exact Match | 11 % | 21 % | +91 % |

Das Modell hat **generalisierte Tool-Calling-Pattern gelernt**, keine Trainingsdaten auswendig. Es ruft neue Tools korrekt auf, fragt bei unklaren Inputs nach und lehnt schädliche Anfragen ab.

**Praxisbeispiele aus der Evaluation:**

Das Modell auf Prompts, die es nicht im Training gesehen hat:
- *"What's the stock price of AMZN?"* → Korrekter Tool-Call: `get_stock_price` mit `ticker: AMZN`
- *"Find me a restaurant nearby"* → Rückfrage nach Küche/Standort
- *"What's the standard deviation of 10, 20, 30, 40, 50?"* → Near-Miss: richtige Funktion, aber Zahlen als String statt Array übergeben (Score: 0.5)

Das Near-Miss-Beispiel zeigt genau, wo der nächste Trainingsrun ansetzen würde.

## Deployment: Direkt in die Automatisierungs-Pipeline

Das fine-tuned Modell kann direkt aus der SageMaker AI Studio UI deployed werden:

**Option 1: SageMaker AI Endpoint** → niedriger Latenz, selbst-verwaltet, ideal für eigene Infrastruktur

**Option 2: Amazon Bedrock** → managed inference, keine Endpoint-Verwaltung, einfache API-Integration

**Option 3: S3-Download** → Modellgewichte für self-managed deployment, z. B. auf eigenen Servern oder in privaten Clouds

Die Integration in n8n oder Make erfolgt dann über HTTP Request Nodes an den Endpoint oder die Bedrock API.

## Nächste Schritte für den eigenen Workflow

Der Artikel macht deutlich: Das ist kein Einmal-Training. Der Cycle lautet:

1. **Training-Daten aus Produktionslogs** — echte User-Prompts + Tool-Calls aus dem Workflow-Betrieb liefern besonders hohe Qualität
2. **Reward Function iterieren** — den Near-Miss-Fall (String statt Array) durch spezifische Penalty abdecken
3. **Neue Tools ergänzen** — Schema-Erweiterung + neue Training-Beispiele, dann erneut 40-Minuten-Training
4. **Multi-Turn-Conversations** — komplexe, mehrstufige Agenten-Workflows in den Trainingsdaten abdecken

## Praktische Nächste Schritte

1. **AWS-Blogpost lesen**: Der vollständige Walk-through mit Code-Beispielen, Reward-Function-Logik und Screenshots ist auf dem AWS Machine Learning Blog verfügbar
2. **SageMaker AI SDK erkunden**: Für programmatischen Zugriff gibt es [SDK-Dokumentation](https://sagemaker.readthedocs.io/en/stable/model_customization/index.html)
3. **Eigene Reward Function prototypen**: Der Dreistufige Scoring-Ansatz (1.0 / 0.5 / 0.0) lässt sich direkt auf eigene Tool-Schemas übertragen
4. **Mit eigenen KI-Agenten starten**: Die hier gelernten Konzepte zu Agenten, Reward-Design und Workflow-Integration vertiefen

## Quellen & Weiterführende Links

- 📰 [Original AWS ML Blog: Accelerate agentic tool calling with serverless model customization in Amazon SageMaker AI](https://aws.amazon.com/blogs/machine-learning/accelerate-agentic-tool-calling-with-serverless-model-customization-in-amazon-sagemaker-ai/)
- 📚 [SageMaker AI Model Customization Dokumentation](https://docs.aws.amazon.com/sagemaker/latest/dg/customize-model.html)
- 📚 [SageMaker SDK für programmatischen Zugriff](https://sagemaker.readthedocs.io/en/stable/model_customization/index.html)

---

🎓 **Workshops & Kurse** (verifiziert via API):

- [n8n: Modul 1 - Automatisierung mit KI-Agenten](https://workshops.de/kurse/ki-agenten-mit-n8n) — Starte mit KI-Agenten in n8n: Automatisierung, Tool-Calling-Patterns und autonome Workflows in der Praxis
- [n8n: Modul 2 - Multi-Agent-Systeme & MCPs](https://workshops.de/kurse/n8n-multi-agent-systeme-mcp-server) — Vertiefe dein Know-how: Memory-Systeme, Multi-Agent-Architekturen und MCP-Server für Production-Ready AI-Automation
- [KI-Transformation für Unternehmen](https://workshops.de/kurse/ki-transformation-fuer-unternehmen) — Wie KI eure Arbeitsabläufe revolutioniert — von ersten Wow-Momenten bis zur nachhaltigen Integration

---