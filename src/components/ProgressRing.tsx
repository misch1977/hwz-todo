import { motion } from 'motion/react'

type ProgressRingProps = {
  done: number
  total: number
}

const RADIUS = 30
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing({ done, total }: ProgressRingProps) {
  const progress = total === 0 ? 0 : done / total
  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <svg width={72} height={72} viewBox="0 0 72 72" role="img" aria-label={`${done} von ${total} erledigt`}>
      <circle cx={36} cy={36} r={RADIUS} strokeWidth={8} fill="none" className="stroke-muted" />
      <motion.circle
        cx={36}
        cy={36}
        r={RADIUS}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
        className="stroke-accent"
        transform="rotate(-90 36 36)"
        strokeDasharray={CIRCUMFERENCE}
        animate={{ strokeDashoffset: offset }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <text
        x={36}
        y={36}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-current font-mono text-sm font-semibold"
      >
        {done}/{total}
      </text>
    </svg>
  )
}
