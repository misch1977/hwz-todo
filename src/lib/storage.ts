import type { Task } from '@/features/tasks/model'

export const STORAGE_KEY = 'hwz-todo'

export const CURRENT_VERSION = 1

export type AppState = {
  version: number
  tasks: Task[]
}

const EMPTY_STATE: AppState = { version: CURRENT_VERSION, tasks: [] }

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.done === 'boolean' &&
    typeof t.createdAt === 'number'
  )
}

export function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return EMPTY_STATE

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return EMPTY_STATE
  }

  if (typeof parsed !== 'object' || parsed === null) return EMPTY_STATE
  const state = parsed as { version?: unknown; tasks?: unknown }
  if (!Array.isArray(state.tasks) || !state.tasks.every(isTask)) return EMPTY_STATE

  return { version: CURRENT_VERSION, tasks: state.tasks }
}

export function saveState(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: CURRENT_VERSION, tasks }))
}
