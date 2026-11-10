# PLAN: Wie die App gebaut wird

Diese Datei füllt /plan aus docs/SPEC.md.

## Stack

Siehe docs/STACK.md. Keine Abweichungen.

## Ordner und Dateien

- `src/index.html` (via `index.html`): Look-Attribut `data-look` auf Candy setzen.
- `src/features/tasks/model.ts`: Typ Task und reine Funktionen (add, toggle, remove), leerer Titel ignorieren, auf 200 Zeichen kürzen.
- `src/features/tasks/model.test.ts`: Tests für die Model-Logik.
- `src/lib/storage.ts`: localStorage lesen, schreiben, migrieren; kaputtes JSON abfangen.
- `src/lib/storage.test.ts`: Tests für den Storage.
- `src/features/tasks/useTasks.ts`: React-Hook, verbindet Modell mit Storage.
- `src/features/tasks/useTasks.test.ts`: Tests für den Hook.
- `src/App.tsx`: App-Rahmen mit Hero, Fortschrittsring, TaskList, TaskInput, Toaster.
- `src/App.test.tsx`: Rauchtest für den Rahmen und die drei Looks.
- `src/features/tasks/components/TaskList.tsx`: Liste mit Listen-Animation.
- `src/features/tasks/components/TaskCard.tsx`: Karte mit Checkbox, Durchstreichen, Konfetti, Löschen.
- `src/features/tasks/components/TaskCard.test.tsx`: Tests für die Karte.
- `src/features/tasks/components/TaskInput.tsx`: Eingabefeld mit Plus-Knopf und Schütteln bei leerer Eingabe.
- `src/features/tasks/components/TaskInput.test.tsx`: Tests für die Eingabe.
- `src/features/tasks/components/EmptyState.tsx`: Leerer Zustand mit Candy-Illustration und Satz.
- `src/components/ProgressRing.tsx`: Fortschrittsring erledigt/gesamt.
- `src/components/ProgressRing.test.tsx`: Tests für den Ring.
- `src/lib/useHotkey.ts`: «N» fokussiert die Eingabe, ausser Fokus in einem Feld.
- `src/lib/celebrate.ts`: Konfetti-Aufruf, im Test ersetzbar.
- `src/lib/theme.ts`: Konfetti-Farben aus den CSS-Variablen lesen.

## Datenmodell

```ts
type Task = {
  id: string
  title: string
  done: boolean
  createdAt: number
}
```

- localStorage-Schlüssel `hwz-todo` = `{ version: 1, tasks: Task[] }`.
- Schema-Version `1`. Migration nur nötig, falls sich das Modell später ändert (Regel 9).

## Komponenten

- `ProgressRing`: SVG-Ring mit Zähler und aria-label (DESIGN.md, Rezept 1).
- `TaskInput`: Eingabefeld mit Plus-Knopf, Schütteln bei leerer Eingabe (Rezept 2).
- `TaskCard`: Checkbox, animierte Durchstreichung, Konfetti, Löschen mit Toast (Rezept 3).
- `TaskList`: Liste mit `AnimatePresence` und Motion-Animationen (Rezept 4).
- `EmptyState`: Leerer Zustand, Candy-Illustration (Rezept 5).

## Risiken

1. Alte Daten im localStorage passen nicht mehr (Regel 9): Schema-Version mit Migration und Test.
2. Konfetti-Nutzung macht Tests fragil: Konfetti-Aufruf in `celebrate.ts` kapseln und im Test ersetzen.
3. Motion-Animationen in jsdom: Tests auf sichtbare Zustände statt auf Animationsdetails abstützen.
