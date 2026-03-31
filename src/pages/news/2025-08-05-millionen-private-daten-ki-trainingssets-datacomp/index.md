---
layout: '../../../layouts/BlogLayout.astro'
title: 'Millionen private Daten in KI-Trainingssets entdeckt: Der DataComp-Skandal erschüttert die AI-Community'
description: 'Forscher finden Millionen sensibler Dokumente in KI-Trainingssets - von Reisepässen bis Kreditkarten. Was bedeutet das für uns alle?'
pubDate: '2025-08-05'
author: 'Robin Böhm'
tags: ['AI', 'Ethics & AI', 'Datenschutz', 'Machine Learning', 'DSGVO']
category: 'Ethics & AI'
readTime: '12 min read'
image: 'https://images.pexels.com/photos/1181452/pexels-photo-1181452.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---

**TL;DR:** Forscher der Carnegie Mellon University haben im DataComp CommonPool - einem der größten Open-Source-Datensätze für KI-Bildgeneratoren - Millionen von sensiblen persönlichen Dokumenten entdeckt. Darunter: Reisepässe, Kreditkarten, Geburtsurkunden und über 800 validierte Lebensläufe mit hochpersönlichen Informationen. Das Brisante: Die Daten wurden bereits millionenfach heruntergeladen und könnten in zahlreichen KI-Modellen stecken.

Stell dir vor, du findest deinen Reisepass, deine Kreditkarte oder sogar die Geburtsurkunde deiner Kinder in einem öffentlich zugänglichen KI-Trainingsdatensatz. Science Fiction? Leider nein - das ist die erschreckende Realität, die Forscher jetzt aufgedeckt haben.

## Die wichtigsten Fakten

- 📅 **Zeitraum der Datensammlung**: 2014-2022 (vor der ChatGPT-Ära!)
- 💾 **Datensatz-Größe**: 12,8 Milliarden Bild-Text-Paare
- 🔍 **Untersuchter Anteil**: Nur 0,1% des gesamten Datensatzes
- 😱 **Geschätzte Betroffene**: Hunderte Millionen sensible Dokumente
- 📥 **Downloads**: Über 2 Millionen Mal in 2 Jahren
- 🤖 **Potenziell betroffene Modelle**: Stable Diffusion, Midjourney und viele mehr

## Was ist neu?

Die Forscher um Rachel Hong und William Agnew von der Carnegie Mellon University haben ihre Ergebnisse in einer [Studie auf arXiv](https://arxiv.org/pdf/2506.17185) veröffentlicht. Die Entdeckung ist ein Weckruf für die gesamte KI-Industrie.

### Kernfunde im Überblick

**Persönliche Dokumente en masse**
- Tausende validierte Kreditkarten, Führerscheine und Reisepässe
- Über 800 bestätigte Lebensläufe mit vollständigen Kontaktdaten
- Geburtsurkunden von Kindern mit Gesundheitsinformationen
- Bewerbungsunterlagen inklusive Hintergrundüberprüfungen

**Versagende Schutzmaßnahmen**
- Automatische Gesichtserkennung übersah geschätzte 102 Millionen Gesichter
- Keine Filter für bekannte PII-Muster (E-Mail-Adressen, Sozialversicherungsnummern)
- Unkenntlichmachung funktionierte nur teilweise

## Technische Details

Der DataComp CommonPool basiert auf Web-Scraping-Daten der gemeinnützigen Organisation Common Crawl. Die Ironie: Die Kuratoren wussten um die Problematik und versuchten, Gegenmaßnahmen zu ergreifen.

```python
# So könnte ein PII-Filter aussehen - der aber NICHT implementiert wurde
def filter_pii(text):
    # E-Mail-Adressen
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    # Sozialversicherungsnummern (US-Format)
    ssn_pattern = r'\b\d{3}-\d{2}-\d{4}\b'
    # Kreditkartennummern
    cc_pattern = r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b'
    # Aber: Diese Filter wurden offenbar nicht oder nur unzureichend eingesetzt
```

### Vergleich mit bestehenden Datensätzen

| Feature | DataComp CommonPool | LAION-5B | Proprietäre Datensätze |
|---------|-------------------|----------|------------------------|
| Größe | 12,8 Milliarden | 5,85 Milliarden | Unbekannt |
| PII-Filter | ❌ Unzureichend | ❌ Minimal | ❓ Intransparent |
| Gesichtserkennung | ✅ Teilweise | ❌ | ❓ |
| Lizenz | Akademisch (aber kommerziell nutzbar) | Open Source | Proprietär |
| Downloads | 2+ Millionen | Millionen | N/A |

## Was bedeutet das für die Praxis?

### Für Entwickler
- **Sofortige Überprüfung**: Checke deine verwendeten Datensätze auf PII
- **Neue Filter implementieren**: Robuste PII-Erkennung ist ein Muss
- **Dokumentation**: Transparenz über Datenquellen wird kritisch

### Für Unternehmen
- **Compliance-Risiko**: DSGVO-Verstöße können teuer werden (bis zu 4% des Jahresumsatzes)
- **Reputationsschaden**: "Wir haben aus Versehen Ihre Kreditkarte trainiert" ist kein guter PR-Slogan
- **Technische Schulden**: Modelle müssen möglicherweise neu trainiert werden

## Das Problem mit der Zustimmung

Das Perfide: Die meisten Daten stammen aus der Zeit vor 2020 - bevor ChatGPT die Welt veränderte. 

> "Ich lade vielleicht etwas einmal ins Internet hoch und möchte es dann ein Jahr später wieder löschen, aber dann hat diese Löschung keine Wirkung mehr"
> — William Agnew, Carnegie Mellon University

Die Menschen konnten schlicht nicht zustimmen, dass ihre Daten für KI-Training verwendet werden - diese Technologie war den meisten damals völlig unbekannt.

## Human-in-the-Loop als Sicherheitsnetz

**Kritische Regel: Automatisierung ist gut, menschliche Kontrolle ist besser.**

Was hier wirklich fehlt:
- Manuelle Stichprobenkontrollen der Datensätze
- Ethik-Reviews vor Veröffentlichung
- Klare Verantwortlichkeiten für Datenschutz
- Opt-out-Mechanismen, die wirklich funktionieren

## Stimmen aus der Community

> "Das zeigt wirklich die Ursünde von KI-Systemen, die auf öffentlichen Daten basieren"
> — Ben Winters, Consumer Federation of America

> "Es ist einfach so, dass alle großangelegten Web-Scraping-Datensätze immer Inhalte enthalten, die da nicht drin sein sollten"
> — Abeba Birhane, Trinity College Dublin

## Roadmap & Ausblick

**Q3 2025**: Erwartete verschärfte EU-Regulierungen für KI-Trainingssets
**Q4 2025**: Mögliche technische Standards für PII-Filterung
**2026**: Neue Generation "privacy-first" Trainingssets?

## Verfügbarkeit & Tools

- **Hugging Face PII-Tool**: [Opt-out für zukünftige Downloads](https://huggingface.co/) (hilft aber nicht rückwirkend)
- **DataComp CommonPool**: Weiterhin öffentlich verfügbar
- **Forschungspapier**: [arXiv:2506.17185](https://arxiv.org/pdf/2506.17185)

## Quick Links & Ressourcen

- 📚 [Original-Studie der Carnegie Mellon University](https://arxiv.org/pdf/2506.17185)
- 🐙 [DataComp GitHub Repository](https://github.com/mlfoundations/datacomp)
- 💬 [Diskussion auf HackerNews](https://news.ycombinator.com/)
- 📰 [MIT Technology Review Artikel](https://www.technologyreview.com/)

## Fazit

Die Entdeckung von Millionen sensibler Dokumente im DataComp CommonPool ist ein Weckruf für die gesamte KI-Industrie. Es zeigt deutlich: Die aktuelle Praxis des wahllosen Web-Scrapings ist nicht nur ethisch fragwürdig, sondern verstößt höchstwahrscheinlich gegen geltende Datenschutzgesetze.

Die Herausforderung ist gewaltig: Wie entfernt man Daten aus Modellen, die bereits trainiert wurden? Wie verhindert man zukünftige Datenschutzverletzungen? Und wie schaffen wir ein Gleichgewicht zwischen Innovation und Privatsphäre?

**Next Steps für Entwickler und Unternehmen:**
1. Überprüfe sofort deine verwendeten Trainingssets auf PII
2. Implementiere robuste Filterungsmechanismen
3. Erstelle klare Datenschutz-Richtlinien für KI-Projekte
4. Plane für mögliche Neu-Trainings deiner Modelle

Die Zukunft der KI hängt davon ab, ob wir diese Herausforderungen meistern. Es ist Zeit, Verantwortung zu übernehmen - bevor die nächste Datenschutzkatastrophe passiert. 🛡️

---

*Letzte Aktualisierung: 05. August 2025*
*Quellen: arXiv.org, MIT Technology Review, Carnegie Mellon University*