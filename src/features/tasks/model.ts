export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  done: boolean
  createdAt: number // Date.now()
}

export const MAX_TITLE_LENGTH = 200

export function addTask(tasks: Task[], rawTitle: string): Task[] {
  const title = rawTitle.trim().slice(0, MAX_TITLE_LENGTH)
  if (!title) return tasks
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  }
  return [task, ...tasks]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id)
}
