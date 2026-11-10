# SPEC: Was die App können muss

Diese Datei füllt /spec. Ein ausgefülltes Beispiel steht in docs/PROMPTS.md unter «Beispiel einer SPEC».

## Ziel

Eine persönliche ToDo-App, mit der ich Aufgaben schnell erfassen, abhaken und löschen kann – freundlich und verspielt.

## Muss

- Aufgabe mit Titel anlegen (Enter oder Plus-Knopf).
- Aufgabe abhaken und wieder öffnen.
- Aufgabe löschen, mit «Rückgängig».
- Zähler «erledigt/gesamt» als Fortschrittsring.
- Leerer Zustand mit Illustration und freundlichem Satz.

## Look

Candy

## Nicht

- Kein Login, kein Server. Die Daten bleiben im Browser.
- Keine Termine, keine Erinnerungen, keine Prioritäten.
- Kein Umsortieren per Ziehen in dieser Stufe.

## Fertig, wenn

1. Leere Eingabe
   - Gegeben: Das Eingabefeld ist leer oder enthält nur Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: Es kommt keine Aufgabe dazu und das Feld schüttelt sich kurz.
2. 200 Zeichen
   - Gegeben: Ich tippe einen Titel mit mehr als 200 Zeichen ohne Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: Die Aufgabe hat höchstens 200 Zeichen und der Text bricht in der Karte um.
3. Neu laden
   - Gegeben: Ich habe Aufgaben angelegt und einige abgehakt.
   - Wenn: Ich die Seite neu lade.
   - Dann: Alle Aufgaben und ihr Zustand sind noch da.
4. Abhaken
   - Gegeben: Ich habe eine offene Aufgabe.
   - Wenn: Ich sie abhake.
   - Dann: Der Text wird animiert durchgestrichen, es gibt Konfetti und der Ring-Zähler steigt; nochmal klicken macht es rückgängig.
5. Schmales Fenster
   - Gegeben: Das Fenster ist 360 px breit.
   - Wenn: Ich eine Aufgabe mit langem Titel ansehe.
   - Dann: Alles ist lesbar und bedienbar, ohne seitliches Scrollen.
6. Leerer Zustand
   - Gegeben: Es gibt keine Aufgaben.
   - Wenn: Ich die Seite öffne.
   - Dann: Sehe ich die Candy-Illustration und einen freundlichen Satz mit Hinweis auf die Eingabe.
7. Löschen mit Rückgängig
   - Gegeben: Ich habe eine Aufgabe gelöscht.
   - Wenn: Ich im Hinweis «Rückgängig» anklicke.
   - Dann: Die Aufgabe erscheint wieder an derselben Stelle.

## Features

(leer)
