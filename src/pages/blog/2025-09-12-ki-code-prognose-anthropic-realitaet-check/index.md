---
layout: '../../../layouts/BlogLayout.astro'
title: 'Die 90%-KI-Code-Prophezeiung: Wie Anthropics CEO grandios daneben lag'
description: 'Dario Amodei sagte 90% KI-generierter Code in 6 Monaten voraus. Die Realität? Entwickler sind 19% langsamer und produzieren 10x mehr Sicherheitslücken.'
pubDate: '2025-09-12'
author: 'Robin Böhm'
tags: ['AI', 'Software Development', 'Anthropic', 'Claude', 'Productivity', 'Security', 'Trends']
category: 'Industry Insights'
readTime: '8 min read'
image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
---

**TL;DR:** Anthropic-CEO Dario Amodei prophezeite im März 2025, dass KI binnen 6 Monaten 90% allen Codes schreiben würde. Die Realität sechs Monate später: Entwickler mit KI-Assistenten sind 19% langsamer und produzieren 10x mehr Sicherheitslücken. Welcome to the Reality Check Era.

Erinnert ihr euch noch an März 2025? Als Dario Amodei, CEO von Anthropic, mit einer Aussage um die Ecke kam, die die Tech-Welt aufhorchen ließ: "In drei bis sechs Monaten wird KI bis zu 90% von allem Code schreiben." Entwickler weltweit fragten sich: Sollte ich schon mal meinen LinkedIn-Status auf "offen für neue Herausforderungen" setzen?

Spoiler Alert: Nein, mussten sie nicht. 

## Die Prophezeiung: 90% KI-Code in 6 Monaten

Im März 2025 war Dario Amodei in Plauderlaune. Der Anthropic-Boss, bekannt für seinen Chatbot Claude (ja, genau der, den ihr wahrscheinlich gerade für eure Code-Reviews nutzt), verkündete selbstbewusst:

- ⚡ **In 3-6 Monaten**: KI schreibt 90% allen Codes
- 🎯 **In 12 Monaten**: KI übernimmt das Coden komplett
- 🤖 **Die Konsequenz**: Massive Arbeitslosigkeit unter Software-Entwicklern

Das klang nach Science Fiction. Oder nach einem sehr ambitionierten OKR für Q3/Q4 2025. 

## September 2025: Der Reality Check

Jetzt ist September 2025. Die sechs Monate sind um. Zeit für eine Bestandsaufnahme. Und Freunde, die Zahlen sprechen eine andere Sprache als Amodeis Kristallkugel:

### Die METR-Studie: Wenn KI zum Bremsklotz wird

Die gemeinnützige Organisation **Model Evaluation and Threat Research (METR)** hat sich die Mühe gemacht, die Produktivität von Entwicklern mit und ohne KI-Assistenten zu messen. Das Ergebnis? *Naja, sagen wir mal so: Es ist kompliziert.*

**Die schockierenden Fakten:**
- 📉 Entwickler mit KI-Tools brauchen **19% länger** für ihre Aufgaben
- 🤔 Subjektiv dachten sie, sie wären 20% schneller
- 🔄 Der Grund: Mehr Zeit für Prompts schreiben und KI-Output korrigieren

Was hier wirklich passiert: Entwickler *fühlen* sich produktiver, weil die KI schnell Code ausspuckt. Aber dann kommt Phase 2 - das Debugging des KI-Codes. Und plötzlich wird aus dem vermeintlichen Turbo-Boost ein Marathon mit Extraschleifen.

### Die Apiiro-Studie: Wenn KI Sicherheitslücken züchtet

Aber wartet, es wird noch besser (oder schlechter, je nach Perspektive). Das Cybersecurity-Unternehmen **Apiiro** hat sich angeschaut, was mit der Code-Qualität passiert, wenn KI mitschreibt:

**Die Zahlen sprechen für sich:**
- 🚨 **10x mehr Sicherheitsprobleme** mit KI-generierten Code
- 📈 **322% Anstieg** bei Privilege-Escalation-Schwachstellen
- 🏗️ **153% mehr** Architektur-Designfehler
- 🎭 KI-Halluzinationen führen zu nicht-existierenden Package-Namen

Das Frustrierende daran: KI ist super im Typos fixen (76% weniger Syntaxfehler!), aber gleichzeitig baut sie tickende Zeitbomben in euren Code ein. Das ist wie ein Mechaniker, der dein Auto perfekt poliert, aber dabei versehentlich die Bremsleitungen durchschneidet.

## Das Phänomen "Slopsquatting": Wenn KI Pakete erfindet

Hier kommt mein persönlicher Favorit unter den KI-Fails: **Slopsquatting**. 

KI-Assistenten haben die charmante Angewohnheit, Paketnamen zu halluzinieren. Sie denken sich einfach plausible klingende NPM-Packages oder Python-Libraries aus, die es gar nicht gibt. Das Problem? Diese Halluzinationen sind konsistent - die KI erfindet immer wieder die gleichen nicht-existierenden Pakete.

**Was dann passiert:**
1. KI generiert Code mit `import superhelpfulpackage`
2. Package existiert nicht (noch nicht)
3. Hacker registriert `superhelpfulpackage` mit Malware
4. Nächster Entwickler verwendet KI-generierten Code
5. Boom! Supply-Chain-Angriff erfolgreich

Das ist wie wenn dein GPS dir sagt "Biegen Sie rechts ab in die Einhornstraße" - und jemand baut schnell eine Einbahnstraße dorthin, die direkt in eine Sackgasse führt.

## Warum lag Amodei so daneben?

### Die Überschätzung der KI-Fähigkeiten

Amodei ist nicht der erste Tech-CEO, der die Zukunft zu optimistisch sieht. Aber seine Prognose zeigt ein fundamentales Missverständnis davon, was Programmieren wirklich bedeutet:

**Code schreiben ist nur ein Teil des Jobs:**
- 📋 Requirements verstehen und hinterfragen
- 🏗️ Architektur-Entscheidungen treffen
- 🔍 Legacy-Code verstehen und refactoren
- 🤝 Mit dem Team abstimmen
- 🐛 Bugs in Produktionsumgebungen debuggen
- 📚 Dokumentation schreiben (okay, das macht eh keiner)

KI kann momentan Code generieren. Aber sie versteht nicht den Kontext, die Business-Logik oder warum dieser eine Hack von 2018 immer noch drin ist, weil sonst die Buchhaltung nicht mehr funktioniert.

### Die unterschätzte Komplexität realer Codebases

Die METR-Studie testete mit echten, großen Open-Source-Projekten. Nicht mit Todo-Listen-Apps oder Hello-World-Beispielen. Und hier zeigt sich: Je komplexer die Codebase, desto mehr struggelt die KI.

**Die Realität in Enterprise-Umgebungen:**
- Millionen Zeilen Legacy-Code
- Undokumentierte Dependencies
- "Das war schon immer so"-Konstrukte
- Technische Schulden aus drei Dekaden

In dieser Umgebung ist KI wie ein Praktikant am ersten Tag - enthusiastisch, aber ahnungslos über die ganzen ungeschriebenen Regeln und Workarounds.

## Was bedeutet das für die Praxis?

### Für Entwickler: Keine Panik!

Liebe Entwickler-Kollegen, ihr könnt aufatmen. Eure Jobs sind sicher. Zumindest für die nächsten... *checkt Kalender*... Jahre. Aber das heißt nicht, dass sich nichts ändert:

**Die neue Realität:**
- KI ist ein Werkzeug, kein Ersatz
- Lernt, effektiv mit KI zu prompten
- Entwickelt ein Gespür für KI-generierten Bullshit
- Code-Review-Skills werden wichtiger denn je

### Für Unternehmen: Vorsicht vor dem Hype

Executives bei Coinbase, Shopify und Duolingo haben bereits KI-Coding-Tools zur Pflicht gemacht. Das ist wie Schwimmflügel zur Pflicht machen und dann alle ins tiefe Wasser werfen.

**Was Unternehmen wirklich brauchen:**
- ✅ KI-Coding-Guidelines und Best Practices
- ✅ Verstärkte Security-Reviews für KI-generierten Code
- ✅ Training für Entwickler im Umgang mit KI-Tools
- ✅ Realistische Erwartungen an Produktivitätssteigerungen

## Der Blick nach vorne: Die nächsten 6 Monate

Amodei hatte noch eine zweite Prognose: In 12 Monaten (also März 2026) übernimmt KI das Coding komplett. Based auf den aktuellen Daten würde ich sagen: *Press X to doubt.*

### Was wir realistisch erwarten können:

**Kurzfristig (6 Monate):**
- Bessere KI-Tools mit weniger Halluzinationen
- Spezialisierte KI für bestimmte Coding-Tasks
- Mehr Integration in IDEs und DevOps-Pipelines
- Erste ernsthafte Security-Frameworks für KI-Code

**Mittelfristig (12-24 Monate):**
- KI als Standard-Pair-Programming-Partner
- Automatisierte Code-Reviews mit KI
- KI-gestützte Refactoring-Tools
- Neue Berufsbilder: KI-Code-Auditoren

**Langfristig (2-5 Jahre):**
- KI schreibt tatsächlich größere Code-Teile autonom
- Aber: Menschen definieren Architektur und Requirements
- Neue Programmierparadigmen entstehen
- Der Job des "Prompt Engineers" wird zum Running Gag

## Fazit: Welcome to the Reality Era

Die letzten sechs Monate haben uns eine wichtige Lektion gelehrt: **KI-Prophezeiungen sind wie Wettervorhersagen - je weiter in die Zukunft, desto unzuverlässiger.**

Dario Amodei lag nicht nur daneben - er lag spektakulär daneben. Statt 90% KI-Code haben wir 19% langsamere Entwickler und 10x mehr Sicherheitslücken. Das ist nicht gerade die Zukunft, die uns versprochen wurde.

Aber wisst ihr was? Das ist okay. Denn es zeigt, dass Softwareentwicklung mehr ist als nur Code generieren. Es ist Problemlösung, Kreativität, Kontext-Verständnis und ja, manchmal auch die Fähigkeit, um 3 Uhr morgens einen Production-Bug zu fixen, während der CEO im Slack Channel Panik schiebt.

**Die wichtigsten Erkenntnisse:**
1. **KI ist ein Tool, keine Wunderwaffe** - Nutzt es weise
2. **Produktivität ≠ Geschwindigkeit** - Qualität zählt
3. **Security first** - Besonders bei KI-generiertem Code
4. **Skeptisch bleiben** - Nicht jeder Hype ist berechtigt
5. **Weiter lernen** - Die Zukunft gehört denen, die KI verstehen UND programmieren können

### Action Time! 🚀

1. **Testet selbst**: Messt eure eigene Produktivität mit und ohne KI
2. **Security-Check**: Reviewed euren KI-generierten Code extra gründlich
3. **Bleibt informiert**: Die Entwicklung geht weiter, aber realistisch
4. **Teilt eure Erfahrungen**: Wie sind eure Erfahrungen mit KI-Coding-Tools?

Die Zukunft der Softwareentwicklung wird definitiv von KI geprägt sein. Aber sie wird nicht so aussehen, wie Dario Amodei sie sich vorgestellt hat. Und ehrlich gesagt: Das ist wahrscheinlich besser so.

Denn mal ehrlich - in einer Welt, in der KI 90% des Codes schreibt, wer debuggt dann die anderen 90% der Bugs? 😉

---

*PS: Dieser Artikel wurde zu 0% von KI geschrieben. Okay, ich hab Claude mal gefragt, ob "Slopsquatting" wirklich so heißt. Aber das war's auch schon. Trust me.*