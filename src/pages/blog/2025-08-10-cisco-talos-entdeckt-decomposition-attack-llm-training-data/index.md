---
layout: '../../../layouts/BlogLayout.astro'
title: 'Cisco Talos enthüllt Decomposition-Angriff: LLMs geben Training-Daten preis'
description: 'Amy Chang von Cisco Talos demonstriert auf der Black Hat 2025 eine neue Angriffsmethode, die LLMs dazu bringt, verbatim ihre Trainingsdaten zu enthüllen.'
pubDate: '2025-08-10'
author: 'Robin Böhm'
tags: ['AI Security', 'LLM', 'Cybersecurity', 'Black Hat', 'Data Privacy']
category: 'Industry Insights'
readTime: '6 min read'
image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop'
---

**TL;DR:** Cisco Talos Forscherin Amy Chang präsentiert auf der Black Hat 2025 die "Decomposition"-Technik, die LLMs systematisch dazu bringt, exakte Fragmente ihrer Trainingsdaten preiszugeben - ein Game-Changer für AI-Sicherheit und Datenschutz.

Amy Chang von Cisco Talos hat auf der Black Hat 2025 eine Methode vorgestellt, die die AI-Security-Community aufschreckt: Mit der sogenannten "Decomposition"-Technik können Large Language Models (LLMs) dazu gebracht werden, wörtliche Fragmente ihrer Trainingsdaten preiszugeben - inklusive urheberrechtlich geschützter oder sensibler Informationen.

## Die wichtigsten Fakten

- 📅 **Zeitpunkt**: Präsentation auf der Black Hat 2025 (August)
- 🎯 **Zielgruppe**: Alle LLM-basierten Systeme potentiell betroffen
- 🔧 **Technologie**: Decomposition-Angriff nutzt inhärente Memorization-Schwäche
- 📊 **Impact**: Mögliche Extraktion von proprietären und sensiblen Daten
- 🏢 **Entdecker**: Amy Chang, Cisco Talos Security Research

## Was ist neu?

Die Decomposition-Technik unterscheidet sich fundamental von herkömmlichen Jailbreaking-Methoden. Während Jailbreaks darauf abzielen, Content-Filter zu umgehen, greift Decomposition die Kern-Memorization an, die in LLMs eingebaut ist.

### Kernfunktionen im Überblick

**Die Decomposition-Methode**
- Zerlegt komplexe Prompts in einfachere, iterative Anfragen
- Nutzt systematische Abfragen, um gespeicherte Trainingsdaten zu extrahieren
- Funktioniert bei mehreren populären AI-Modellen
- Kann verbatim Textfragmente aus dem Training-Korpus rekonstruieren

**Memorization-Vulnerability**
- LLMs speichern unbeabsichtigt exakte Inhalte statt nur generalisierte Muster
- Modelle können dazu gebracht werden, diese Inhalte wörtlich wiederzugeben
- Betrifft potentiell alle aktuellen LLM-Architekturen
- Schwer zu patchen ohne fundamentale Architektur-Änderungen

## Technische Details

Die Decomposition-Attacke nutzt eine Art **Inversion Attack**, bei der:

1. **Crafted Inputs**: Speziell konstruierte Eingaben an das LLM gesendet werden
2. **Output-Analyse**: Die Antworten werden systematisch analysiert
3. **Iterative Verfeinerung**: Schrittweise Annäherung an die Trainingsdaten
4. **Data Extraction**: Rekonstruktion der originalen Trainingstexte

```python
# Konzeptionelles Beispiel (vereinfacht)
def decomposition_attack(model, target_phrase):
    # Phase 1: Kontext etablieren
    context = generate_context_prompts(target_phrase)
    # Phase 2: Iterative Zerlegung
    for prompt in decompose_prompts(context):
        response = model.generate(prompt)
        if contains_training_data(response):
            extracted_data.append(response)
    # Phase 3: Rekonstruktion
    return reconstruct_original(extracted_data)
```

### Vergleich mit bestehenden Angriffsmethoden

| Feature | Decomposition | Jailbreaking | Prompt Injection |
|---------|---------------|--------------|------------------|
| Ziel | Training-Daten extrahieren | Content-Filter umgehen | Verhalten manipulieren |
| Methode | Iterative Zerlegung | Clevere Umformulierung | Schädliche Instruktionen |
| Schwierigkeit | Hoch (technisch) | Mittel | Niedrig |
| Impact | Datenschutz-Verletzung | Policy-Verletzung | Funktions-Missbrauch |
| Patch-Aufwand | Sehr hoch | Mittel | Niedrig |

## Was bedeutet das für die Praxis?

### Für Entwickler
- **Immediate Action**: Review der verwendeten LLMs auf Memorization-Risiken
- **Training-Data Audit**: Sensible Daten aus Trainingssets entfernen
- **Differential Privacy**: Implementierung von Privacy-preserving Training-Methoden
- **Output Filtering**: Zusätzliche Schichten zur Erkennung von Training-Data-Leaks

### Für Unternehmen
- **Risiko-Assessment**: Überprüfung welche sensiblen Daten in AI-Systemen verarbeitet werden
- **Compliance-Impact**: DSGVO und andere Datenschutzregeln könnten verletzt werden
- **IP-Schutz**: Proprietäre Informationen könnten durch LLMs exponiert werden
- **Strategische Überlegungen**: Neubewerung des Einsatzes von Third-Party LLMs

## Stimmen aus der Community

> "Diese Entdeckung zeigt, dass wir bei LLM-Sicherheit noch am Anfang stehen. Die Implikationen für Datenschutz und IP-Schutz sind enorm."
> — Security-Experte auf Twitter/X

Die AI-Security-Community diskutiert bereits intensiv über mögliche Gegenmaßnahmen und die langfristigen Auswirkungen dieser Entdeckung.

## Roadmap & Ausblick

**Kurzfristig (Q3 2025)**: 
- Entwicklung von Detection-Tools für Decomposition-Angriffe
- Patches für besonders vulnerable Modelle

**Mittelfristig (Q4 2025)**: 
- Neue Training-Methodologien mit eingebautem Privacy-Schutz
- Industry-Standards für LLM-Memorization-Tests

**Langfristig (2026+)**: 
- Fundamentale Architektur-Änderungen in nächster LLM-Generation
- Regulatorische Anpassungen für AI-Training-Data

## Verfügbarkeit & Tools

- **Research Paper**: Wird nach der Black Hat Präsentation veröffentlicht
- **PoC Code**: Aus Sicherheitsgründen noch unter Verschluss
- **Cisco Talos Advisory**: [Offizielle Security Advisory](https://blog.talosintelligence.com/)
- **Mitigation Guidelines**: In Entwicklung durch Cisco Talos Team

## Quick Links & Ressourcen

- 📚 [Cisco Talos Blog](https://blog.talosintelligence.com/)
- 🎥 [Black Hat 2025 Recordings](https://www.blackhat.com/)
- 💬 [AI Security Community Discussion](https://reddit.com/r/AIsecurity)
- 📰 [Original Announcement](https://www.webpronews.com/cisco-talos-unveils-decomposition-technique-exposing-llm-training-data/)

## Fazit

Die Decomposition-Technik von Amy Chang markiert einen Wendepunkt in der LLM-Sicherheit. Sie zeigt, dass die inhärente Memorization in aktuellen Modellen nicht nur ein theoretisches, sondern ein praktisch ausnutzbares Sicherheitsrisiko darstellt. Unternehmen müssen jetzt handeln, um ihre sensiblen Daten zu schützen.

**Next Steps für AI-Teams:**
1. Audit der aktuell eingesetzten LLMs auf Memorization-Risiken
2. Review aller Trainingsdaten auf sensible Informationen
3. Implementierung von Output-Monitoring für Data-Leak-Detection
4. Entwicklung einer AI-Security-Strategie für 2025/2026

---

*Letzte Aktualisierung: 10. August 2025*
*Quellen: Cisco Talos, Black Hat 2025, TechRepublic, WebProNews*