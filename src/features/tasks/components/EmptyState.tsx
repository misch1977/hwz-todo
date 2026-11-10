export function EmptyState() {
  return (
    <div className="glass flex flex-col items-center gap-4 rounded-2xl border border-dashed p-10 text-center">
      {/* Aurora: Mond mit drei Sternen */}
      <svg
        aria-hidden
        className="hidden h-30 w-30 [[data-look=aurora]_&]:block"
        viewBox="0 0 120 120"
      >
        <circle cx="60" cy="60" r="28" className="fill-accent" />
        <path d="M74 34a26 26 0 1 0 12 48 26 26 0 0 1-12-48Z" className="fill-primary" />
        <circle cx="22" cy="26" r="3" className="fill-accent animate-pulse" />
        <circle cx="98" cy="20" r="3" className="fill-accent animate-pulse" />
        <circle cx="104" cy="92" r="3" className="fill-accent animate-pulse" />
      </svg>

      {/* Candy: lächelnde Wolke */}
      <svg aria-hidden className="hidden h-30 w-30 [[data-look=candy]_&]:block" viewBox="0 0 120 120">
        <path
          className="fill-accent"
          d="M36 78a22 22 0 0 1 2-43.8A28 28 0 0 1 86 38a20 20 0 0 1-2 40Z"
        />
        <circle cx="48" cy="62" r="4" className="fill-card" />
        <circle cx="72" cy="62" r="4" className="fill-card" />
        <path d="M52 72q8 8 16 0" className="fill-none stroke-primary stroke-[5] stroke-linecap-round" />
      </svg>

      {/* Neon: Blitz in Kreis */}
      <svg aria-hidden className="hidden h-30 w-30 [[data-look=neon]_&]:block glow rounded-full" viewBox="0 0 120 120">
        <polygon className="fill-accent" points="64,18 40,64 58,64 52,102 84,50 62,50" />
      </svg>

      <p className="font-heading text-xl">Alles erledigt. Zeit für Kaffee.</p>
      <p className="text-muted-foreground">Tippe oben eine neue Aufgabe ein oder drücke N.</p>
    </div>
  )
}
